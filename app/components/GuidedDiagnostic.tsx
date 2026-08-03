import { useState } from "react";
import { diagnosticProcedures } from "../data/diagnosticProcedures";
import { testParameters } from "../data/testParameters";

type GuidedDiagnosticProps = {
  activeFaultCode: string;
  currentTestStep: number;
  setCurrentTestStep: (step: number) => void;
  onTestResult: (result: {
    status: "ok" | "failed";
    title: string;
    message: string;
  }) => void;
};

export default function GuidedDiagnostic({
  activeFaultCode,
  currentTestStep,
  setCurrentTestStep,
  onTestResult,
}: GuidedDiagnosticProps) {

  const [testResult, setTestResult] = useState<
    "ok" | "failed" | null
  >(null);


  const currentProcedure =
    diagnosticProcedures[
      activeFaultCode as keyof typeof diagnosticProcedures
    ]?.[currentTestStep];


  const currentParameters =
    testParameters[
      activeFaultCode as keyof typeof testParameters
    ]?.[currentTestStep + 1];


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


            <div className="flex-1">


              <h4 className="font-medium">
                {currentProcedure.title}
              </h4>


              <p className="mt-2 text-sm leading-6 text-slate-300">
                {currentProcedure.description}
              </p>



              {currentParameters && (
                <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-3">


                  <p className="mb-2 font-medium text-cyan-300">
                    🔧 Målepunkter
                  </p>


                  {currentParameters.map((item, index) => (

                    <div
                      key={index}
                      className="py-2"
                    >

                      <p className="font-medium text-slate-200">
                        • {item.name}
                      </p>


                      <p className="text-sm text-slate-400">
                        Forventet: {item.expected}
                      </p>

                    </div>

                  ))}


                </div>
              )}


            </div>

          </div>



          <div className="mb-5 grid grid-cols-2 gap-2">


            <button
              type="button"
              onClick={() => {

                setTestResult("ok");

                onTestResult({
                  status: "ok",
                  title: currentProcedure.title,
                  message:
                    "ok" in currentProcedure
                      ? currentProcedure.ok ?? "Test OK"
                      : "Test OK",
                });

              }}
              className="rounded-lg bg-emerald-700 py-3 text-sm"
            >
              ✓ OK
            </button>



            <button
              type="button"
              onClick={() => {

                setTestResult("failed");

                onTestResult({
                  status: "failed",
                  title: currentProcedure.title,
                  message:
                    "failed" in currentProcedure
                      ? currentProcedure.failed ?? "Test ikke OK"
                      : "Test ikke OK",
                });

              }}
              className="rounded-lg bg-amber-700 py-3 text-sm"
            >
              ⚠ Feil funnet
            </button>


          </div>



          {testResult === "ok" && (
            <div className="mb-4 rounded-lg bg-green-900/30 p-3 text-green-300">

              ✓ {
                "ok" in currentProcedure
                  ? currentProcedure.ok ?? "Test OK. Gå videre."
                  : "Test OK. Gå videre."
              }

            </div>
          )}



          {testResult === "failed" && (
            <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-red-300">

              ⚠ {
                "failed" in currentProcedure
                  ? currentProcedure.failed ?? "Test ikke OK. Kontroller videre."
                  : "Test ikke OK. Kontroller videre."
              }

            </div>
          )}



          {testResult && (
            <button
              type="button"
              onClick={() => {
                setTestResult(null);
                setCurrentTestStep(currentTestStep + 1);
              }}
              className="mb-4 w-full rounded-lg bg-blue-700 py-3 text-sm"
            >
              Neste steg →
            </button>
          )}


        </>
      ) : (

        <div className="rounded-lg bg-emerald-950/40 p-4 text-emerald-300">
          Alle teststeg er fullført.
        </div>

      )}


    </div>
  );
}