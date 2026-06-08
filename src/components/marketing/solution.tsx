import { RefreshCw, Receipt, CheckCircle } from "lucide-react";

export default function Solution() {
  return (
    <section
      id="solucion"
      className="overflow-hidden bg-slate-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-400">
                Control Multimoneda
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Cobra exactamente lo que es, en la moneda que sea
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Klaro fue construido entendiendo que un pago rara vez ocurre en
                una sola vía. Registra pagos parciales y combinados con
                precisión contable.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-300 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <RefreshCw
                      className="absolute left-1 top-1 h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                    Tasa BCV integrada.
                  </dt>{" "}
                  <dd className="inline">
                    Registra el abono en bolívares indicando la tasa del día. El
                    sistema calcula automáticamente el equivalente exacto a
                    descontar de la deuda en dólares.
                  </dd>
                </div>

                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <Receipt
                      className="absolute left-1 top-1 h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                    Cálculo de IGTF automático.
                  </dt>{" "}
                  <dd className="inline">
                    Si tu cliente decide pagar una parte en divisas en efectivo,
                    el sistema puede sumar automáticamente el 3% correspondiente
                    a esa fracción.
                  </dd>
                </div>

                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <CheckCircle
                      className="absolute left-1 top-1 h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                    Saldos claros por WhatsApp.
                  </dt>{" "}
                  <dd className="inline">
                    Genera un estado de cuenta en un clic y envíaselo a tu
                    cliente con el saldo exacto pendiente para liquidar la
                    cotización.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Mockup del modal de cobro */}
          <div className="relative">
            <div className="w-[48rem] max-w-none rounded-xl bg-slate-800 shadow-2xl ring-1 ring-white/10 sm:w-[57rem] p-6 border border-slate-700">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Registrar Pago — Diseño de Logo Corporativo</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Método de Pago</p>
                  <div className="flex gap-2">
                    {["Zelle", "Pago Móvil", "Efectivo $"].map((m, i) => (
                      <div key={m} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border ${i === 0 ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-700 border-slate-600 text-slate-300"}`}>{m}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Monto USD</p>
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-white font-black text-sm border border-slate-600">$ 150.00</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Tasa BCV del día</p>
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-black text-sm border border-slate-600">Bs. 46.85 / $</div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Equivalente en Bs.</p>
                  <div className="bg-slate-700 rounded-lg px-3 py-2 text-white font-black text-sm border border-slate-600">Bs. 7,027.50</div>
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-600 mb-4">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Total del proyecto</span>
                  <span className="text-white font-bold">$450.00</span>
                </div>
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-slate-400">Pagado anteriormente</span>
                  <span className="text-emerald-400 font-bold">$200.00</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{ width: "44%" }} />
                </div>
                <div className="flex justify-between text-[11px] mt-2">
                  <span className="text-amber-400 font-bold">Saldo pendiente: $250.00</span>
                  <span className="text-slate-500">44% cobrado</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white text-sm font-bold py-2.5 rounded-lg">Confirmar Pago</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
