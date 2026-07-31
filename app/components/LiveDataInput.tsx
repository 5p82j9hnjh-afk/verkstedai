"use client";

import { useState } from "react";
import { liveDataLibrary } from "@/app/data/liveDataLibrary";
import { analyzeLiveData } from "@/lib/liveDataEngine";

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

  const [analysis, setAnalysis] = useState("");

  const liveParameters =
    liveDataLibrary[
      faultCode as keyof typeof liveDataLibrary
    ]?.parameters ?? [];


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

    const egrRequested = Number(
      data["EGR ønsket verdi"]
    );

    const egrActual = Number(
      data["EGR faktisk verdi"]
    );


    // P0401 - EGR analyse
    if (
      faultCode === "P0401" &&
      egrRequested &&
      egrActual &&
      egrRequested - egrActual > 20
    ) {

      const result =
`❌ EGR avvik funnet

EGR ønsket verdi: ${egrRequested}
EGR faktisk verdi: ${egrActual}

Anbefaling:
Kontroller EGR-ventil og EGR-kanaler.`;

      setAnalysis(result);
      onAnalysisComplete(result);

      return;
    }


    // P2453 - DPF analyse
    if (
      faultCode === "P2453" &&
      data["DPF differansetrykk"]
    ) {

      const dpfPressure = Number(
        data["DPF differansetrykk"]
      );


      if (dpfPressure > 80) {

        const result =
`❌ DPF avvik funnet

DPF differansetrykk:
${dpfPressure} mbar

Vurdering:
Differansetrykket er høyt.

Anbefaling:
✓ Kontroller DPF-belastning
✓ Kontroller regenerering
✓ Kontroller differansetrykksensor`;

        setAnalysis(result);
        onAnalysisComplete(result);

        return;
      }


      const result =
`ℹ️ DPF differansetrykk:

${dpfPressure} mbar

Verdien må vurderes sammen med sotmengde og kjøreforhold.`;

      setAnalysis(result);
      onAnalysisComplete(result);

      return;
    }


    const result =
"✅ Ingen tydelige avvik funnet i innlagte verdier.";

    setAnalysis(result);
    onAnalysisComplete(result);
  }


  return (
    <div className="rounded-lg border border-slate-700 bg-[#0b1c2b] p-4">

      <h4 className="font-semibold text-cyan-300">
        📊 Live-data analyse ({faultCode})
      </h4>


      <ul className="mt-3 list-disc pl-5 text-slate-300">
        {liveParameters.map((item) => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>


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

          <p className="mt-2 whitespace-pre-line text-slate-300">
            {analysis}
          </p>

        </div>
      )}

    </div>
  );
}