"use client";
import { diagnosticProcedures } from "../app/data/diagnosticProcedures";
import { useState } from "react";
import { demoDiagnosis } from "../lib/demoDiagnosis";
import type { DiagnosisResult } from "../types/diagnosis";
import GuidedDiagnostic from "./components/GuidedDiagnostic";
import DiagnosisPanel from "./components/DiagnosisPanel";
import Panel from "./components/Panel";
import Tab from "./components/Tab";

const menuItems: [string, string, boolean][] = [
  ["⌂", "Oversikt", true],
  ["＋", "Ny sak", false],
  ["⌕", "Feilsøking", false],
  ["◷", "Tidligere saker", false],
  ["⬡", "Teknisk info", false],
  ["▦", "Deler & katalog", false],
  ["▤", "Rapporter", false],
  ["▥", "Statistikk", false],
  ["⚙", "Innstillinger", false],
];

const causes = [
  ["Tilstoppet EGR-ventil eller EGR-kanal", "86 %", "HØY"],
  ["Defekt differansetrykksensor", "72 %", "MIDDELS"],
  ["Feil på luftmassemåler (MAF)", "48 %", "MIDDELS"],
  ["Strømming/trykktap i ladesystem", "28 %", "LAV"],
  ["Elektrisk feil i EGR-krets", "18 %", "LAV"],
];

export default function Home() {
  const [activeFaultCode, setActiveFaultCode] = useState("P0401");
const [currentTestStep, setCurrentTestStep] = useState(0);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
const [analysis, setAnalysis] = useState("");
const [diagnosis, setDiagnosis] =
  useState<DiagnosisResult | null>(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const currentFault = diagnosis?.faultLibraryData?.find(
  (fault) => fault.code === activeFaultCode

);
  async function analyzeImage() {
  if (!selectedImage) {
    setAnalysis("Velg et bilde først.");
    return;
  }

  setIsAnalyzing(true);
  setAnalysis("");

  try {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysen mislyktes.");
    }

    setDiagnosis(data.diagnosis);
setAnalysis(JSON.stringify(data.diagnosis, null, 2));
  } catch (error) {
    setAnalysis(
      error instanceof Error
        ? error.message
        : "En ukjent feil oppstod."
    );
  } finally {
    setIsAnalyzing(false);
  }
}
  return (
    <main className="min-h-screen bg-[#06111b] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="flex w-56 shrink-0 flex-col border-r border-slate-700/70 bg-[#071a29] p-4">
          <div className="mb-7 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🔧
            </div>
            <div>
              <h1 className="text-xl font-semibold">VerkstedAI</h1>
              <p className="text-xs text-slate-400">Versjon 1.3</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map(([icon, label, active]) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="w-6 text-lg">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-slate-700 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                M
              </div>
              <div>
                <p className="text-sm font-medium">Mekanikeren</p>
                <p className="text-xs text-slate-400">Verksted AS</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-emerald-400">● Synkronisert</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-4">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-2xl text-slate-300">←</button>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    Feilsøkingssak #2024-0512
                  </h2>
                  <span className="rounded bg-emerald-900 px-2 py-1 text-xs text-emerald-300">
                    ÅPEN
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Volkswagen Golf · 24. mai 2024
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
                Spør AI
              </button>
              <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
                Del sak
              </button>
              <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
                Lag rapport
              </button>
            </div>
          </header>

          <label
  htmlFor="image-upload"
  className="mb-4 block w-full cursor-pointer rounded-xl bg-blue-600 px-6 py-5 text-left shadow-lg transition hover:bg-blue-500"
>
  <div className="text-xl font-semibold">
    📷 Legg til feilkoder / Ta bilde
  </div>

  <div className="mt-1 text-sm text-blue-100">
    Ta bilde av diagnoseskjermen – AI analyserer og legger inn data automatisk
  </div>
</label>
<input
  type="file"
  accept="image/*"
  className="hidden"
  id="image-upload"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  }}
/>{selectedImage && (
  <div className="mb-4 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200">
    Valgt bilde: {selectedImage.name}
  </div>
  )}
  <button
  type="button"
  onClick={analyzeImage}
  disabled={!selectedImage || isAnalyzing}
  className="mb-4 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {isAnalyzing ? "Analyserer bilde..." : "Analyser bilde"}
</button>
<button
  type="button"
  onClick={() => {
  setDiagnosis(demoDiagnosis);
  setAnalysis(JSON.stringify(demoDiagnosis, null, 2));
}}
>
  Vis demo
</button>
{diagnosis && (
  <div className="mb-4 space-y-3">
    <h3 className="text-lg font-semibold text-white">Feilkoder</h3>

    {diagnosis.faultCodes.map(
      (
        fault: {
          code: string;
          description: string;
          module: string;
        },
        index: number
      ) => (
        <div
          key={`${fault.code}-${index}`}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4"
        >
          <div className="text-lg font-bold text-blue-400">
            {fault.code}
          </div>

          <div className="mt-1 text-sm text-slate-200">
            {fault.description}
          </div>

          <div className="mt-2 text-xs text-slate-400">
            {fault.module}
          </div>
        </div>
      )
    )}
  </div>
)}
{diagnosis?.faultLibraryData?.map((fault) => (
  <div
    key={fault.code}
    className="mb-4 rounded-xl border border-blue-700 bg-blue-950/30 p-4"
  >
    <h3 className="text-lg font-bold text-blue-300">
      {fault.code} – {fault.title}
    </h3>

    <div className="mt-3 grid gap-4 md:grid-cols-2">
      <div>
        <p className="font-semibold text-slate-200">
          Alvorlighetsgrad
        </p>
        <p className="text-slate-300">{fault.severity}</p>
      </div>

      <div>
        <p className="font-semibold text-slate-200">
          Estimert reparasjonstid
        </p>
        <p className="text-slate-300">
          {fault.estimatedRepairTime}
        </p>
      </div>
    </div>

    <div className="mt-4">
      <p className="font-semibold text-slate-200">
        Berørte systemer
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {fault.systems.map((system: string) => (
          <span
            key={system}
            className="rounded bg-slate-800 px-3 py-1 text-sm"
          >
            {system}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-4">
      <p className="font-semibold text-slate-200">
        Live-data som bør kontrolleres
      </p>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
        {fault.liveData.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="mt-4">
  <p className="font-semibold text-slate-200">
    Symptomer
  </p>

  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
    {fault.symptoms.map((item: string) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-4">
  <p className="font-semibold text-slate-200">
    Vanlige årsaker
  </p>

  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
    {fault.commonCauses.map((item: string) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-4">
  <p className="font-semibold text-slate-200">
    Anbefalte tester
  </p>

  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-300">
    {fault.recommendedTests.map((item: string) => (
      <li key={item}>{item}</li>
    ))}
  </ol>
</div>
  </div>
))}
{diagnosis && (
  <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
    <h3 className="mb-3 text-lg font-semibold text-white">
      Freeze Frame
    </h3>

    <div className="space-y-2">
      {Object.entries(diagnosis.freezeFrame).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between border-b border-slate-800 pb-2 text-sm"
        >
          <span className="text-slate-400">{key}</span>
          <span className="font-medium text-white">{String(value)}</span>
        </div>
      ))}
    </div>
  </div>
)}

{diagnosis && (
  <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
    <h3 className="mb-3 text-lg font-semibold text-white">
      Live Data
    </h3>

    <div className="space-y-2">
      {Object.entries(diagnosis.liveData).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between border-b border-slate-800 pb-2 text-sm"
        >
          <span className="text-slate-400">{key}</span>
          <span className="font-medium text-white">{String(value)}</span>
        </div>
      ))}
    </div>
  </div>
)}

{diagnosis && (
  <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
    <h3 className="mb-3 text-lg font-semibold text-white">
      Sannsynlige årsaker
    </h3>

    <ul className="space-y-2">
      {diagnosis.likelyCauses.map(
        (cause: string, index: number) => (
          <li
            key={index}
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200"
          >
            {index + 1}. {cause}
          </li>
        )
      )}
    </ul>
  </div>
)}

{diagnosis && (
  <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
    <h3 className="mb-3 text-lg font-semibold text-white">
      Neste tester
    </h3>

    <ol className="space-y-2">
      {diagnosis.nextTests.map(
        (test: string, index: number) => (
          <li
            key={index}
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200"
          >
            {index + 1}. {test}
          </li>
        )
      )}
    </ol>
  </div>
)}

{/*

{analysis && (
  <div className="mb-4 whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200">
    {analysis}
  </div>

)}
  */}
          <div className="mb-4 grid grid-cols-[1fr_320px] gap-4">
            <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">
              <div className="grid grid-cols-[120px_1.4fr_1fr_1fr_1fr] gap-4">
                <div className="flex h-24 items-center justify-center rounded-lg bg-slate-800 text-5xl">
                  🚙
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
  {diagnosis
    ? `${diagnosis.vehicle.make} ${diagnosis.vehicle.model}`.trim()
    : "Volkswagen Golf"}
</h3>

<p className="text-sm text-slate-300">
  {diagnosis
    ? `${diagnosis.vehicle.year} · ${diagnosis.vehicle.engine}`
    : "2018 · 2.0 TDI · 110 kW"}
</p>

<p className="text-sm text-slate-400">
  Reg.nr:{" "}
  {diagnosis
    ? diagnosis.vehicle.registration || "Ikke funnet"
    : "AB 12345"}
</p>

<p className="text-sm text-slate-400">
  Km:{" "}
  {diagnosis
    ? diagnosis.vehicle.mileage || "Ikke funnet"
    : "142 300 km"}
</p>
                </div>

                <Info label="Drivstoff" value="Diesel" />
                <Info label="Girkasse" value="Manuell" />
                <Info label="Dato opprettet" value="24. mai 2024, 09:15" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">
              <h3 className="mb-3 font-semibold">Diagnosedata</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✅ 2 feilkoder registrert</li>
                <li>✅ Freeze frame lagt til</li>
                <li>✅ Live-data lagt til</li>
                <li>✅ 3 bilder lagt til</li>
              </ul>
              <button className="mt-4 w-full rounded-lg border border-slate-600 py-2 text-sm">
                Se alle data
              </button>
            </div>
          </div>

          <div className="mb-4 flex gap-3 overflow-x-auto">
  <Tab label="Oversikt (alle koder)" />

  {diagnosis?.faultCodes.map((fault) => (
  <Tab
    key={fault.code}
    label={`${fault.code} · ${fault.description}`}
    active={activeFaultCode === fault.code}
    onClick={() => {
      setActiveFaultCode(fault.code);
      setCurrentTestStep(0);
    }}
  />
))}

  <button className="rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-300">
    ＋ Legg til feilkode
  </button>
</div>

          <div className="grid grid-cols-[260px_1fr_1fr] gap-4">
            <div className="space-y-4">
              <Panel title="Symptomer">
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Motorlampen lyser</li>
                  <li>• Redusert motoreffekt</li>
                  <li>• Ujevn gange ved akselerasjon</li>
                  <li>• Sort røyk ved hard belastning</li>
                  <li>• Metallisk lyd ved høyt turtall</li>
                </ul>
              

              {diagnosis ? (
  Object.entries(diagnosis.freezeFrame).map(([key, value]) => (
    <DataRow
      key={key}
      label={key}
      value={String(value)}
    />
  ))
) : (
  <>
    <DataRow label="Motorhastighet" value="2450 rpm" />
    <DataRow label="Kjøretøyhastighet" value="78 km/t" />
    <DataRow label="Kjølevæsketemperatur" value="88 °C" />
    <DataRow label="Luftmasse" value="420 mg/slag" />
    <DataRow label="EGR ønsket" value="35 %" />
    <DataRow label="EGR faktisk" value="5 %" />
  </>
)}
              </Panel>

              <Panel title="Bilder og data">
                <div className="grid grid-cols-3 gap-2">
                  <Photo label="Feilkoder" />
                  <Photo label="Freeze frame" />
                  <Photo label="Live-data" />
                </div>
              </Panel>
            </div>

            <div className="space-y-4">
              {diagnosis && (
  <DiagnosisPanel
    diagnosis={diagnosis}
    activeFaultCode={activeFaultCode}
  />
)}
              
              <div className="rounded-xl border border-emerald-700 bg-emerald-950/30 p-4">
                <h3 className="font-semibold text-emerald-300">
                  ✦ AI: Felles rotårsak oppdaget
                </h3>
                <p className="mt-2 text-sm text-slate-300">
  Analyse for {activeFaultCode}.
      </p>
                <p className="mt-3 text-sm text-slate-200">
                  <strong>Sannsynlig rotårsak:</strong> Tilstopping i EGR-systemet
                  gir lav EGR-strømning og påvirker ladetrykket.
                </p>
              </div>
            </div>
<div className="space-y-4">
              <GuidedDiagnostic
  activeFaultCode={activeFaultCode}
  currentTestStep={currentTestStep}
  setCurrentTestStep={setCurrentTestStep}
/>
             
              <div className="grid grid-cols-2 gap-4">
                <Panel title="Historikk – P0401">
                  <div className="space-y-2 text-xs text-slate-300">
                    <p>09:15 · Sak opprettet</p>
                    <p>09:16 · Feilkoder lagt til</p>
                    <p>09:17 · Freeze frame lagt til</p>
                    <p>09:20 · Veiledet feilsøking startet</p>
                  </div>
                </Panel>

                <Panel title="Notater – P0401">
                  <p className="text-sm leading-6 text-slate-300">
                    Kunden opplyser at problemet startet gradvis. Drivstoffilter
                    ble byttet for 12 000 km siden.
                  </p>
                </Panel>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-200">{value}</p>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-800 py-1.5 text-sm">
      <span className="text-slate-400">{label}</span>
      <span>{value}</span>
    </div>
      );
}

function Photo({ label }: { label: string }) {
  return (
    <div>
      <div className="flex h-20 items-center justify-center rounded-lg bg-slate-800 text-2xl">
        📟
      </div>
      <p className="mt-1 text-center text-xs text-slate-400">{label}</p>
    </div>
  );
}