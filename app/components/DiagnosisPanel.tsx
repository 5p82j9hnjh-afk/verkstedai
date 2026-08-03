"use client";

import { useEffect, useState } from "react";
import { getNextRecommendation } from "@/lib/diagnosticEngine";
import type { DiagnosisResult } from "@/types/diagnosis";
import LiveDataInput from "@/app/components/LiveDataInput";

type DiagnosisPanelProps = {
  diagnosis: DiagnosisResult;
  activeFaultCode: string;
};

type HistoryItem = {
  type: "liveData";
  text: string;
};

export default function DiagnosisPanel({
  diagnosis,
  activeFaultCode,
}: DiagnosisPanelProps) {

  const [history, setHistory] = useState<HistoryItem[]>([]);


  const fault =
    diagnosis.faultLibraryData?.find(
      (item) => item.code === activeFaultCode
    );


  useEffect(() => {
    setHistory([]);
  }, [activeFaultCode]);



  if (!fault) {

    const aiFault =
      diagnosis.faultCodes.find(
        (item) => item.code === activeFaultCode
      );


    return (
      <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">

        <h3 className="text-xl font-semibold">
          {aiFault?.code} – {aiFault?.description}
        </h3>


        <Section
          title="🚨 Symptomer"
          items={diagnosis.symptoms || []}
        />


        <Section
          title="🔍 Mest sannsynlige årsaker"
          items={diagnosis.likelyCauses || []}
        />


        <Section
          title="🧪 Anbefalte tester"
          items={diagnosis.nextTests || []}
        />

      </div>
    );
  }



  const recommendation =
    getNextRecommendation(
      activeFaultCode,
      null
    );



  return (

    <div className="space-y-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">


      <h3 className="text-xl font-semibold">
        {fault.code} – {fault.title}
      </h3>



      <Section
        title="🧩 Berørte systemer"
        items={fault.systems}
      />



      <Section
        title="🔍 Vanlige årsaker"
        items={fault.commonCauses}
      />



      <LiveDataInput
        faultCode={fault.code}
        liveData={fault.liveData}

        onAnalysisComplete={(result) =>
          setHistory((prev) => {

            const text =
              `📊 Live-data analyse → ${result}`;


            if (
              prev.some(
                (item) => item.text === text
              )
            ) {
              return prev;
            }


            return [
              ...prev,
              {
                type: "liveData",
                text,
              },
            ];
          })
        }
      />

      {history.length > 0 && (

        <div className="rounded-lg border border-slate-700 p-4">

          <h4 className="mb-2 font-semibold">
            📋 Feilsøkingshistorikk
          </h4>


          <ul className="list-disc space-y-1 pl-5 text-slate-300">

            {history.map((item, index) => (

              <li key={index}>
                {item.text}
              </li>

            ))}

          </ul>

        </div>

      )}


    </div>

  );
}



function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {

  return (

    <div>

      <h4 className="mb-2 font-medium">
        {title}
      </h4>


      <ul className="list-disc space-y-1 pl-5 text-slate-300">

        {items.map((item) => (

          <li key={item}>
            {item}
          </li>

        ))}

      </ul>


    </div>

  );

}