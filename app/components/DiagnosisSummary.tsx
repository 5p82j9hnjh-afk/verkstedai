type DiagnosisSummaryProps = {
  history: string[];
  faultCode: string;
};

export default function DiagnosisSummary({
  history,
  faultCode,
}: DiagnosisSummaryProps) {
  return (
    <div className="rounded-lg border border-green-700 bg-green-950/30 p-4">
      <h4 className="font-semibold text-green-300">
        ✅ Diagnose fullført
      </h4>

      <p className="mt-2 text-slate-300">
        Feilkode: {faultCode}
      </p>

      <h5 className="mt-4 font-medium text-slate-200">
        📋 Utførte tester
      </h5>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
        {history.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-slate-300">
        AI-konklusjon: Testløpet er fullført.
      </p>
    </div>
  );
}