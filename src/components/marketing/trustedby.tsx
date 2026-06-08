export default function TrustedBy() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500 mb-8 uppercase tracking-wide">
          Respaldado por líderes de proyectos y agencias en crecimiento
        </p>
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap opacity-50 grayscale">
          {["Estudio Creativo", "Agencia Digital", "Constructora NS", "Servicios Pro"].map((name) => (
            <div key={name} className="h-8 flex items-center px-4 border border-slate-300 rounded-lg">
              <span className="text-sm font-bold text-slate-500 tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
