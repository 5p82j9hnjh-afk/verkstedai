"use client";

import { useState } from "react";

type LiveDataInputProps = {
  faultCode: string;
};

export default function LiveDataInput({
  faultCode,
}: LiveDataInputProps) {
  const [data, setData] = useState({
    maf: "",
    egrRequested: "",
    egrActual: "",
    dpfPressure: "",
  });

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

  function analyzeLiveData() {
    const egrRequested = Number(data.egrRequested);
    const egrActual = Number(data.egrActual);

    if (
      egrRequested &&
      egrActual &&
      egrRequested - egrActual > 20
    ) {
      setAnalysis(
        "⚠️ Stor forskjell mellom EGR ønsket og faktisk verdi. Kontroller EGR-ventil og EGR-kanaler."
      );
      return;
    }

    if (data.dpfPressure) {
      setAnalysis(
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
        📊 Live-data analyse ({faultCode})
      </h4>

      <div className="mt-4 space-y-3">

        <input
          placeholder="MAF luftmengde"
          value={data.maf}
          onChange={(e) =>
            handleChange("maf", e.target.value)
          }
          className="w-full rounded-lg bg-slate-800 p-2"
        />

        <input
          placeholder="EGR ønsket verdi"
          value={data.egrRequested}
          onChange={(e) =>
            handleChange(
              "egrRequested",
              e.target.value
            )
          }
          className="w-full rounded-lg bg-slate-800 p-2"
        />

        <input
          placeholder="EGR faktisk verdi"
          value={data.egrActual}
          onChange={(e) =>
            handleChange(
              "egrActual",
              e.target.value
            )
          }
          className="w-full rounded-lg bg-slate-800 p-2"
        />

        <input
          placeholder="DPF differansetrykk"
          value={data.dpfPressure}
          onChange={(e) =>
            handleChange(
              "dpfPressure",
              e.target.value
            )
          }
          className="w-full rounded-lg bg-slate-800 p-2"
        />

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