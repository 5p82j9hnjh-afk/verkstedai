"use client";

import { useState } from "react";
import { liveDataLibrary } from "@/app/data/liveDataLibrary";
import { analyzeLiveData as runLiveDataAnalysis } from "@/lib/liveDataEngine";
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
  const result = runLiveDataAnalysis(
    faultCode,
    data
  );

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