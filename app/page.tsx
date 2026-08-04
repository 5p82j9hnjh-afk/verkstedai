"use client";

import { useState } from "react";

import { demoDiagnosis } from "../lib/demoDiagnosis";
import type { DiagnosisResult } from "../types/diagnosis";

import GuidedDiagnostic from "./components/GuidedDiagnostic";
import DiagnosisPanel from "./components/DiagnosisPanel";
import Tab from "./components/Tab";
import AIChatBox from "./components/AIChatBox";


const menuItems = [
  ["✓", "Avslutt sak"],
  ["▤", "Rapporter"],
];

export default function Home() {


  const [activeFaultCode, setActiveFaultCode] =
    useState("");
    
const [expandedFaultCode, setExpandedFaultCode] =
  useState("");
  const [registration, setRegistration] =
    useState("");

  const [testStepByFault, setTestStepByFault] =
  useState<Record<string, number>>({});
  

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);


  const [activeCase, setActiveCase] =
    useState<any>(null);


  const [analysis, setAnalysis] =
    useState("");


  const [diagnosis, setDiagnosis] =
    useState<DiagnosisResult | null>(null);


  const [isAnalyzing, setIsAnalyzing] =
    useState(false);
const [isListening, setIsListening] =
  useState(false);

const [recognitionInstance, setRecognitionInstance] =
  useState<any>(null);


  const currentFault =
  diagnosis?.faultLibraryData?.find(
    (fault) =>
      fault.code === activeFaultCode
  )
  ||
  diagnosis?.faultCodes?.find(
    (fault) =>
      fault.code === activeFaultCode
  );



async function analyzeImage(file: File) {


  setIsAnalyzing(true);

  setAnalysis("");



  try {


    const formData = new FormData();


    formData.append(
      "image",
      file
    );



    const response = await fetch(
      "/api/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await response.json();
      console.log("HELE AI SVARET:", data);
      
      
    if (!response.ok) {

      throw new Error(
        data.error ||
        "Analysen mislyktes."
      );

    }



  const fixedDiagnosis = {
  ...data.diagnosis,

  symptoms: data.diagnosis.symptoms || [],

  faultCodes: data.diagnosis.faultCodes.map(
    (fault:any) => {

      const libraryFault =
        data.diagnosis.faultLibraryData?.find(
          (item:any) =>
            item.code === fault.code
        );


      if (
        libraryFault &&
        (
          fault.description === "Usikker" ||
          fault.description === "uklar" ||
          fault.description === ""
        )
      ) {

        return {
          ...fault,
          description:
            libraryFault.title
        };

      }


      return fault;

    }
  )
};


setDiagnosis(
  fixedDiagnosis
);


    setActiveCase({

      created: new Date(),

      
        vehicle: {
  model:
    `${fixedDiagnosis.vehicle?.make || ""} ${fixedDiagnosis.vehicle?.model || ""}`,

  engine:
    fixedDiagnosis.vehicle?.engine || "",

  registration:
    registration,
},

      faultCodes:
  fixedDiagnosis.faultCodes,

      status:
        "Pågående",

    });



    setAnalysis(
  JSON.stringify(
    fixedDiagnosis,
    null,
    2
  )
);



  } catch(error) {


    setAnalysis(

      error instanceof Error
        ? error.message
        : "Ukjent feil."

    );


  } finally {


    setIsAnalyzing(false);


  }

}




return (

<main className="min-h-screen bg-[#06111b] text-slate-100">


<div className="mx-auto flex min-h-screen max-w-[1600px]">



<aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-slate-700/70 bg-[#071a29] p-4">

<div className="mb-2">

  <h1 className="text-2xl font-bold text-blue-400">
    VerkstedAI
  </h1>
<button

type="button"

onClick={() => {

setDiagnosis(
  demoDiagnosis
);

setActiveFaultCode(
  demoDiagnosis.faultCodes[0].code
);

setAnalysis(
  JSON.stringify(
    demoDiagnosis,
    null,
    2
  )
);

}}

className="mb-4 text-left text-xs text-slate-400 hover:text-blue-400"

>

▶ Demo

</button>


<label

htmlFor="image-upload"

className={`mt-2 block cursor-pointer rounded-lg px-3 py-3 text-center text-sm font-semibold ${
activeCase
?
"bg-emerald-600"
:
"bg-blue-600"
}`}

>

{activeCase
?
"🟢 Aktiv sak"
:
"📷 Ny sak"}

</label>

</div>



<input

id="image-upload"

type="file"

accept="image/*"

capture="environment"

className="hidden"


onChange={(e)=>{


const file =
e.target.files?.[0];


if(file){


setSelectedImage(file);

analyzeImage(file);

}

}}

/>



<nav className="mt-0 space-y-1">


{menuItems.map(

([icon,label]) => (


<button

key={label}

className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-800"

>


<span>
{icon}
</span>


{label}


</button>


)

)}


</nav>

<div className="mt-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-3">

<h3 className="mb-2 text-sm font-semibold text-slate-200">
📝 Notater
</h3>


<div className="relative">


<textarea

placeholder="Skriv kundens opplysninger eller egne notater..."

className="h-32 w-full rounded-lg bg-slate-900 p-2 pr-12 text-sm text-slate-200 outline-none"

/>


<button

type="button"

onClick={() => {

const SpeechRecognition =
(window as any).SpeechRecognition ||
(window as any).webkitSpeechRecognition;


if (!SpeechRecognition) {

alert("Taleopptak støttes ikke i denne nettleseren");

return;

}


const recognition =
new SpeechRecognition();


recognition.lang = "nb-NO";

recognition.continuous = false;


recognition.onresult = (event:any)=>{

const text =
event.results[0][0].transcript;


const textarea =
document.querySelector(
"textarea"
) as HTMLTextAreaElement;


if(textarea){

textarea.value +=
(textarea.value ? "\n" : "")
+ text;

}

};

setRecognitionInstance(recognition);
recognition.start();
setIsListening(true);

}}

className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-white ${
  isListening
    ? "bg-red-600 hover:bg-red-500"
    : "bg-green-600 hover:bg-green-500"
}`}

>

🎤

</button>


</div>


</div>
{activeFaultCode && (

  <div className="mt-4">

    <AIChatBox
      faultCode={activeFaultCode}
    />

  </div>

)}

</aside>
      <section className="min-w-0 flex-1 p-4">


<div className="mb-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-4 flex justify-between">


<div>

<h3 className="text-lg font-semibold">
{diagnosis?.vehicle?.make || "Ukjent merke"}{" "}
{diagnosis?.vehicle?.model || ""}
</h3>


<p className="text-sm text-slate-300">
{diagnosis?.vehicle?.engine || "Motor ikke funnet"}
</p>


<p className="mt-1 text-sm text-slate-400">
Km: 142 300 km
</p>


</div>


<div className="rounded-xl border border-slate-700 bg-[#071a29] p-3">


<p className="mb-2 text-sm font-semibold text-slate-300">
Reg.nr
</p>



<input

value={registration}

onChange={(e)=>
setRegistration(e.target.value)
}

placeholder="AB12345"

className="w-36 rounded-lg bg-white px-3 py-2 text-lg font-bold text-black"

/>


</div>


</div>





{diagnosis && (

<div className="mb-4">

<h3 className="mb-3 text-lg font-semibold">
Feilkoder
</h3>


<div className="grid grid-cols-2 gap-3">

{diagnosis.faultCodes.map(

(fault,index)=>{

const expanded =
expandedFaultCode === fault.code;


return (

<div

key={`${fault.code}-${index}`}

onClick={() => {

  setExpandedFaultCode(
    expanded ? "" : fault.code
  );

  setActiveFaultCode(
    fault.code
  );

setTestStepByFault((prev) => ({
  ...prev,
   [fault.code]: 0,
}));
}}

className={`
rounded-lg 
border 
border-slate-700 
bg-slate-900 
p-3 
cursor-pointer
${expanded ? "col-span-1" : ""}
`}

>


<div className="text-lg font-bold text-blue-400">
{fault.code}
</div>


<div className="text-sm text-slate-200">
{fault.description}
</div>


<div className="text-xs text-slate-400">
{fault.module}
</div>



{expanded && (

<div className="mt-2 max-h-32 overflow-y-auto border-t border-slate-700 pt-2 text-xs">


<p className="font-semibold text-xs">
Symptomer
</p>


<ul className="list-disc pl-4 text-xs text-slate-300">

{diagnosis.faultLibraryData
?.find(
(fault) => fault.code === activeFaultCode
)
?.symptoms
?.map(
(item)=>(
<li key={item}>
{item}
</li>
)
)}
</ul>



</div>

)}


</div>

);

}

)}

</div>

</div>

)}


<div className="grid grid-cols-[minmax(260px,1fr)_220px] gap-3">



<div className="space-y-4">


{diagnosis && (

<DiagnosisPanel

diagnosis={diagnosis}

activeFaultCode={activeFaultCode}

/>

)}


</div>





<div className="space-y-4">


{activeFaultCode && (

diagnosis?.faultLibraryData?.some(
  (fault) => fault.code === activeFaultCode
)
?

<GuidedDiagnostic

activeFaultCode={activeFaultCode}

currentTestStep={
  testStepByFault[activeFaultCode] ?? 0
}

setCurrentTestStep={(step) =>
  setTestStepByFault((prev) => ({
    ...prev,
    [activeFaultCode]: step,
  }))
}

onTestResult={(result) => {
  console.log(result);
}}

/>

:

<div className="rounded-xl border border-amber-700 bg-amber-950/40 p-4 text-amber-300">

  <p className="font-semibold">
    AI-analyse – {activeFaultCode}
  </p>


  <p className="mt-2 text-sm">
    Ingen fast diagnoseprosedyre finnes i databasen.
  </p>


  {currentFault && (
    <>

      <p className="mt-4 font-semibold">
        System:
      </p>

      <ul className="list-disc pl-5 text-sm">
        {"systems" in currentFault &&
          currentFault.systems?.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
      </ul>


      <p className="mt-4 font-semibold">
        Mulige årsaker:
      </p>

      <ul className="list-disc pl-5 text-sm">
        {"commonCauses" in currentFault &&
          currentFault.commonCauses?.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
      </ul>


      <p className="mt-4 font-semibold">
        Anbefalte kontroller:
      </p>

      <ul className="list-disc pl-5 text-sm">
        {"recommendedTests" in currentFault &&
          currentFault.recommendedTests?.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
      </ul>

    </>
  )}


  <p className="mt-4 text-xs text-amber-200">
    ⚠ AI-generert forslag – bekreft med måling.
  </p>


</div>

)}




</div>



</div>



</section>


</div>


</main>


);


}





function Info(

{label,value}:{

label:string;

value:string;

}

){


return (


<div>


<p className="text-xs text-slate-500">

{label}

</p>


<p className="text-sm text-slate-200">

{value}

</p>


</div>


);


}






function DataRow(

{label,value}:{

label:string;

value:string;

}

){


return (


<div className="flex justify-between border-b border-slate-800 py-1.5 text-sm">


<span className="text-slate-400">

{label}

</span>


<span>

{value}

</span>


</div>


);


}






function Photo(

{label}:{

label:string;

}

){


return (


<div>


<div className="flex h-20 items-center justify-center rounded-lg bg-slate-800 text-2xl">

📟

</div>



<p className="mt-1 text-center text-xs text-slate-400">

{label}

</p>



</div>


);


}