import { diagnosticProcedures } from "../data/diagnosticProcedures";

type GuidedDiagnosticProps = {
  activeFaultCode: string;
  currentTestStep: number;
  setCurrentTestStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function GuidedDiagnostic({
  activeFaultCode,
  currentTestStep,
  setCurrentTestStep,
}: GuidedDiagnosticProps) {
  const currentProcedure =
    diagnosticProcedures[
      activeFaultCode as keyof typeof diagnosticProcedures
    ]?.[currentTestStep];

  return (
    <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">
      <h3 className="mb-4 font-semibold">
        Pågående teststeg – {activeFaultCode}
      </h3>

      {currentProcedure ? (
        <>
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 text-blue-300">
              {currentTestStep + 1}
            </span>

            <div>
              <h4 className="font-medium">
                {currentProcedure.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {currentProcedure.description}
              </p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentTestStep((step) => step + 1)
              }
              className="rounded-lg bg-emerald-700 py-3 text-sm"
            >
              ✓ OK
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentTestStep((step) => step + 1)
              }
              className="rounded-lg bg-amber-700 py-3 text-sm"
            >
              ⚠ Feil funnet
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentTestStep((step) => step + 1)
              }
              className="rounded-lg bg-slate-700 py-3 text-sm"
            >
              Hopp over
            </button>
          </div>

          <label className="text-sm text-slate-400">
            Kommentar
          </label>

          <textarea
  className="mt-2 min-h-24 w-full rounded-lg border border-slate-700 bg-[#071522] p-3 text-sm outline-none"
  placeholder="Skriv kommentar her..."
/>

<div className="mt-4 rounded-lg border border-blue-700 bg-blue-950/30 p-3">
  <p className="text-sm text-slate-300">
    <strong>Neste steg:</strong> Utfør testen over og velg resultat.
  </p>
</div>
        </>
      ) : (
        <div className="rounded-lg bg-emerald-950/40 p-4 text-emerald-300">
          Alle teststeg er fullført.
        </div>
      )}
    </div>
  );
}