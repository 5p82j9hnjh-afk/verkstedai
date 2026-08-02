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
  ["⬡", "Teknisk info"],
  ["▤", "Rapporter"],
];


export default function Home() {


  const [activeFaultCode, setActiveFaultCode] =
    useState("");

  const [registration, setRegistration] =
    useState("");

  const [currentTestStep, setCurrentTestStep] =
    useState(0);


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



  const currentFault =
    diagnosis?.faultLibraryData?.find(
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



    if (!response.ok) {

      throw new Error(
        data.error ||
        "Analysen mislyktes."
      );

    }



    setDiagnosis(
      data.diagnosis
    );



    setActiveCase({

      created: new Date(),

      vehicle: {
        model:
          "Volkswagen Golf",

        registration:
          registration,
      },

      faultCodes:
        data.diagnosis,

      status:
        "Pågående",

    });



    setAnalysis(
      JSON.stringify(
        data.diagnosis,
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

className="mb-3 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-500"

>

▶ Vis demo

</button>




<label

htmlFor="image-upload"

className={`cursor-pointer rounded-lg px-3 py-3 text-center text-sm font-semibold ${
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



<nav className="mt-5 space-y-1">


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



</aside>
      <section className="min-w-0 flex-1 p-4">


<div className="mb-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-4 flex justify-between">


<div>

<h3 className="text-lg font-semibold">
Volkswagen Golf
</h3>


<p className="text-sm text-slate-300">
2018 · 2.0 TDI · 110 kW
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



{diagnosis.faultCodes.map(

(fault,index)=>(


<div

key={`${fault.code}-${index}`}

className="mb-3 rounded-lg border border-slate-700 bg-slate-900 p-3"

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


</div>


)

)}


</div>

)}






{currentFault && (

<div className="mb-4 rounded-xl border border-blue-700 bg-blue-950/30 p-3">


<h3 className="text-lg font-bold text-blue-300">

{currentFault.code}

{" – "}

{currentFault.title}

</h3>



<div className="mt-3">


<p className="font-semibold">
Alvorlighetsgrad
</p>


<p className="text-slate-300">

{currentFault.severity}

</p>


</div>




<div className="mt-4">


<p className="font-semibold">
Berørte systemer
</p>



<div className="mt-2 flex flex-wrap gap-2">


{currentFault.systems.map(

(system)=>(


<span

key={system}

className="rounded bg-slate-800 px-3 py-1 text-sm"

>

{system}

</span>


)

)}


</div>

</div>





<div className="mt-4">


<p className="font-semibold">
Vanlige årsaker
</p>



<ul className="mt-2 list-disc pl-5 text-sm text-slate-300">


{currentFault.commonCauses.map(

(item)=>(

<li key={item}>
{item}
</li>

)

)}


</ul>


</div>





<div className="mt-4">


<p className="font-semibold">
Anbefalte tester
</p>



<ol className="mt-2 list-decimal pl-5 text-sm text-slate-300">


{currentFault.recommendedTests.map(

(item)=>(


<li key={item}>
{item}
</li>


)

)}


</ol>


</div>



</div>

)}






<div className="mb-4 flex gap-3 overflow-x-auto">


<Tab label="Oversikt" />



{diagnosis?.faultCodes.map(

(fault)=>(


<Tab

key={fault.code}

label={`${fault.code} · ${fault.description}`}

active={
activeFaultCode === fault.code
}


onClick={()=>{


setActiveFaultCode(
fault.code
);


setCurrentTestStep(0);


}}


/>


)

)}



</div>


<div className="grid grid-cols-[150px_minmax(280px,1fr)_260px] gap-3">


<div className="space-y-4">


{activeFaultCode && (

<AIChatBox

faultCode={activeFaultCode}

/>

)}


</div>




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


<GuidedDiagnostic

activeFaultCode={activeFaultCode}

currentTestStep={currentTestStep}

setCurrentTestStep={setCurrentTestStep}

/>


)}



</div>



</div>






<div className="mt-4 rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">


<h3 className="mb-2 text-lg font-semibold">

Notater

</h3>


<textarea

placeholder="Skriv kundens opplysninger eller egne notater..."

className="h-32 w-full rounded-lg bg-slate-900 p-3 text-sm text-slate-200 outline-none"

/>


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