"use client";

import { useEffect, useState } from "react";
import { testSteps } from "@/app/data/testSteps";
import { getNextRecommendation } from "@/lib/diagnosticEngine";
import type { DiagnosisResult } from "@/types/diagnosis";
import DiagnosisSummary from "@/app/components/DiagnosisSummary";
type DiagnosisPanelProps = {
  diagnosis: DiagnosisResult;
   activeFaultCode: "P0401" | "P2453";
};

export default function DiagnosisPanel({
  diagnosis,
  activeFaultCode,
}: DiagnosisPanelProps) {
  const [testResult, setTestResult] = useState<
    "ok" | "failed" | null
  >(null);

  const [history, setHistory] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fault =
    diagnosis.faultLibraryData?.find(
      (item) => item.code === activeFaultCode
    );
   const steps =
  testSteps[
    activeFaultCode as keyof typeof testSteps
  ] ?? [];

const currentTest = steps[currentStep];
const isFinished =
  currentStep >= steps.length - 1;
const resultMessage =
  testResult === "ok"
    ? currentTest?.ok
    : testResult === "failed"
    ? currentTest?.failed
    : null;
  useEffect(() => {
    setTestResult(null);
    setHistory([]);
    setCurrentStep(0);
    setShowSummary(false);
  }, [activeFaultCode]);

  if (!fault) {
    return (
      <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">
        <h3 className="font-semibold">
          ✦ AI-analyse
        </h3>

        <p className="mt-3 text-slate-300">
          Ingen analysedata tilgjengelig.
        </p>
      </div>
    );
  }

  const currentTests =
    testSteps[
  activeFaultCode as keyof typeof testSteps
]

 const activeTest =
  activeFaultCode in testSteps
    ? testSteps[
        activeFaultCode as keyof typeof testSteps
      ][currentStep]
    : undefined;

  const recommendation = getNextRecommendation(
    activeFaultCode,
    testResult
  );

  const stepNumber = currentStep + 1;
  const totalSteps = currentTests.length;

  const activeTitle =
    activeTest?.title ??
    "Ingen flere tester tilgjengelig.";
  function handleTestOk() {
    setTestResult("ok");

   setHistory((prev) => [
  ...prev,
  `${activeTitle} → OK: ${currentTest?.ok ?? ""}`,
]);

    setCurrentStep((prev) =>
      Math.min(
        prev + 1,
        totalSteps - 1
      )
    );
  if (currentStep >= totalSteps - 1 && !showSummary) {
  setShowSummary(true);
}
  }

  function handleTestFailed() {
    setTestResult("failed");

    setHistory((prev) => [
  ...prev,
  `${activeTitle} → Ikke OK: ${currentTest?.failed ?? ""}`,
]);
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">

      <h3 className="text-xl font-semibold">
        {fault.code} – {fault.title}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <p className="text-xs text-slate-400">
            Alvorlighetsgrad
          </p>
          <p>{fault.severity}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Estimert reparasjonstid
          </p>
          <p>{fault.estimatedRepairTime}</p>
        </div>

      </div>

      <Section
        title="🧩 Berørte systemer"
        items={fault.systems}
      />

      <Section
        title="🚨 Symptomer"
        items={fault.symptoms}
      />

      <Section
        title="🔍 Vanlige årsaker"
        items={fault.commonCauses}
      />


      <div className="rounded-lg border border-slate-700 p-4">

        <h4 className="font-semibold">
          🧪 Pågående test
        </h4>

        <p className="text-slate-300">
  {currentTest?.title ?? "Ingen test tilgjengelig"}
</p>
{currentTest?.instructions && (
  <ul className="mt-3 list-disc pl-5 text-sm text-slate-300">
    {currentTest.instructions.map((instruction) => (
      <li key={instruction}>
        {instruction}
      </li>
    ))}
  </ul>
)}
        <p className="mt-3 text-slate-200">
          {activeTitle}
        </p>

        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
          {activeTest?.instructions.map((item: string) => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>

      </div>


      <div className="rounded-lg border border-cyan-700 bg-cyan-950/30 p-4">

        <h4 className="font-semibold text-cyan-300">
          🤖 AI anbefaler neste steg
        </h4>

        <p className="mt-2 text-slate-200">
          {recommendation}
        </p>

      </div>
            <div className="rounded-lg border border-slate-700 p-4">

        <h4 className="mb-3 font-medium text-slate-200">
          {isFinished && testResult === "ok" && (
  <div className="mb-3 rounded-lg bg-green-900/30 p-3">
    <p className="font-medium text-green-300">
      ✅ Feilsøking fullført
    </p>

    <p className="mt-2 text-slate-300">
      Alle anbefalte tester er gjennomført.
    </p>
  </div>
)}
          Hvordan gikk testen?
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <button
  type="button"
  onClick={handleTestOk}
  disabled={isFinished && testResult === "ok"}
  className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  ✔ Test OK
</button>

          <button
  type="button"
  onClick={handleTestFailed}
  disabled={isFinished && testResult === "ok"}
  className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  ✖ Test ikke OK
</button>

        </div>


        {resultMessage && (
  <div className="mt-4 rounded-lg bg-blue-900/30 p-3">
    <p className="font-medium text-blue-300">
      🤖 Diagnoseforslag
    </p>

    <p className="mt-2 text-slate-300">
      {resultMessage}
    </p>
  </div>
)}


        {testResult === "failed" && (
          <div className="mt-4 rounded-lg bg-red-900/30 p-3">

            <p className="font-medium text-red-300">
              ❌ Testen var ikke OK
            </p>

            <p className="mt-2 text-slate-300">
              Følg anbefalingen fra diagnosemotoren før du går videre.
            </p>

          </div>
        )}

      </div>


      {history.length > 0 && (
        <div className="rounded-lg border border-slate-700 p-4">

          <h4 className="mb-2 font-semibold">
            📋 Feilsøkingshistorikk
          </h4>

          <ul className="list-disc space-y-1 pl-5 text-slate-300">

            {history.map((item, index) => (
              <li key={`${item}-${index}`}>
                {item}
              </li>
            ))}

          </ul>

        </div>
      )}

{showSummary && (
  <DiagnosisSummary
    history={history}
    faultCode={fault.code}
  />
)}
      <Section
        title="📊 Live-data som bør kontrolleres"
        items={fault.liveData}
      />

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