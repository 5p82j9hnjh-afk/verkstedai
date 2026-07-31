"use client";

import { useState } from "react";
import { liveDataLibrary } from "@/app/data/liveDataLibrary";
import { liveDataRules } from "@/app/data/liveDataRules";
type LiveDataInputProps = {
  faultCode: string;
  liveData: string[];
  onAnalysisComplete: (result: string) => void;
};

export default function LiveDataInput({
  faultCode,
  liveData,
  onAnalysisComplete,
}: LiveDataInputProps) {
  const [data, setData] = useState<Record<string, string>>({});
  const liveParameters =
  liveDataLibrary[
    faultCode as keyof typeof liveDataLibrary
  ]?.parameters ?? [];

  const [analysis, setAnalysis] = useState("");

  function handleChange(
    field: keyof typeof data,
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));

  }
function handleLiveDataChange(
  field: string,
  value: string
) {
  setData((prev) => ({
    ...prev,
    [field]: value,
  }));
}
  function analyzeLiveData() {
    const rules =
  liveDataRules[
    faultCode as keyof typeof liveDataRules
  ];
    const egrRequested = Number(
  data["EGR ønsket verdi"]
);

const egrActual = Number(
  data["EGR faktisk verdi"]
);

    if (
  faultCode === "P0401" &&
  egrRequested &&
  egrActual &&
  egrRequested - egrActual > 20
) {
      setAnalysis(
        "⚠️ Stor forskjell mellom EGR ønsket og faktisk verdi. Kontroller EGR-ventil og EGR-kanaler."
      );
      onAnalysisComplete(
  "⚠️ Stor forskjell mellom EGR ønsket og faktisk verdi. Kontroller EGR-ventil og EGR-kanaler."
);
      return;
    }

    if (
  faultCode === "P2453" &&
  data["DPF differansetrykk"]
) {
  setAnalysis(
    "ℹ️ DPF differansetrykk registrert. Kontroller sotmengde, sensor og regenerering."
  );
  onAnalysisComplete(
  "ℹ️ DPF differansetrykk registrert. Kontroller sotmengde og regenerering."
);
  return;
}

    setAnalysis(
      "✅ Ingen tydelige avvik funnet i innlagte verdier."
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-[#0b1c2b] p-4">

      <h4 className="font-semibold text-cyan-300">
        📊 Live-data analyse ({faultCode})<ul className="mt-3 list-disc pl-5 text-slate-300">
  {liveParameters.map((item) => (
    <li key={item}>
      {item}
    </li>
  ))}
</ul>
      </h4>

      <div className="mt-4 space-y-3">

  {liveParameters.map((parameter) => (
    <input
      key={parameter}
      placeholder={parameter}
      value={data[parameter] ?? ""}
      onChange={(e) =>
        handleLiveDataChange(
          parameter,
          e.target.value
        )
      }
      className="w-full rounded-lg bg-slate-800 p-2"
    />
  ))}

</div>

      <button
        onClick={analyzeLiveData}
        className="mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-white"
      >
        🔍 Analyser live-data
      </button>

      {analysis && (
        <div className="mt-4 rounded-lg border border-cyan-700 bg-cyan-950/30 p-3">
          <p className="font-medium text-cyan-300">
            🤖 Analyse
          </p>

          <p className="mt-2 text-slate-300">
            {analysis}
          </p>
        </div>
      )}

    </div>
  );
}