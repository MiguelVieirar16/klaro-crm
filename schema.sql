-- ============================================================
-- Klaro CRM — Schema completo
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

-- 1. TENANTS (empresas/cuentas)
create table if not exists public.tenants (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  subscription_plan text not null default 'trial',
  created_at       timestamptz not null default now()
);

-- 2. USERS (perfiles de usuario, ligados a auth.users)
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  tenant_id   uuid references public.tenants(id) on delete cascade,
  name        text not null,
  email       text not null,
  role        text not null default 'sales_rep', -- 'tenant_admin' | 'sales_rep'
  created_at  timestamptz not null default now()
);

-- 3. CLIENTS (directorio de clientes)
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid references public.tenants(id) on delete cascade,
  name        text not null,
  email       text,
  phone       text,
  doc_type    text,
  doc_number  text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- 4. DEALS (proyectos / pipeline)
create table if not exists public.deals (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid references public.tenants(id) on delete cascade,
  client_id   uuid references public.clients(id) on delete set null,
  title       text not null,
  amount_usd  numeric(12,2) not null default 0,
  stage       text not null default 'prospecto', -- prospecto | negociacion | ganado | entregado | perdido
  deadline    date,
  created_at  timestamptz not null default now()
);

-- 5. PAYMENTS (cobros parciales)
create table if not exists public.payments (
  id               uuid primary key default gen_random_uuid(),
  tenant_id        uuid references public.tenants(id) on delete cascade,
  deal_id          uuid references public.deals(id) on delete cascade,
  method           text not null, -- cash_usd | zelle | pago_movil
  amount_paid_usd  numeric(12,2) not null default 0,
  created_at       timestamptz not null default now()
);

-- 6. ACTIVITY_LOGS (feed de actividad)
create table if not exists public.activity_logs (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid references public.tenants(id) on delete cascade,
  user_name   text not null,
  action      text not null,
  entity_name text not null,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- RLS (Row Level Security) — cada tenant solo ve sus datos
-- ============================================================

alter table public.tenants       enable row level security;
alter table public.users         enable row level security;
alter table public.clients       enable row level security;
alter table public.deals         enable row level security;
alter table public.payments      enable row level security;
alter table public.activity_logs enable row level security;

-- Helper: obtener el tenant_id del usuario autenticado
create or replace function public.get_my_tenant_id()
returns uuid language sql stable
as $$
  select tenant_id from public.users where id = auth.uid()
$$;

-- Políticas: cada tabla solo permite acceso al mismo tenant
create policy "users_own_tenant" on public.users
  using (tenant_id = public.get_my_tenant_id());

create policy "clients_own_tenant" on public.clients
  using (tenant_id = public.get_my_tenant_id());

create policy "deals_own_tenant" on public.deals
  using (tenant_id = public.get_my_tenant_id());

create policy "payments_own_tenant" on public.payments
  using (tenant_id = public.get_my_tenant_id());

create policy "activity_own_tenant" on public.activity_logs
  using (tenant_id = public.get_my_tenant_id());

-- ============================================================
-- TRIGGER: crear tenant + perfil de usuario al registrarse
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
as $$
declare
  new_tenant_id uuid;
begin
  -- Crear un tenant nuevo para este usuario
  insert into public.tenants (name)
  values (new.email)
  returning id into new_tenant_id;

  -- Crear el perfil en public.users
  insert into public.users (id, tenant_id, name, email, role)
  values (
    new.id,
    new_tenant_id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    'tenant_admin'
  );

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
