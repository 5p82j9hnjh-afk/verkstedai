"use client";

import { useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIChatBox() {

  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);


  async function sendQuestion() {

    if (!message.trim()) {
      return;
    }


    try {

      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: message,
          }),

        }
      );


      const data = await response.json();


      setAnswer(
        data.answer ??
        "Ingen svar fra AI"
      );


    } catch (error) {

      setAnswer(
        "Feil ved kontakt med AI"
      );

    }

  }


  function startSpeech() {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Tale støttes ikke i denne nettleseren"
      );

      return;

    }


    const recognition = new SpeechRecognition();

    setRecognitionInstance(recognition);


    recognition.lang = "no-NO";
    recognition.continuous = false;
    recognition.interimResults = false;


    recognition.onresult = (event: any) => {

      const text =
        event.results[0][0].transcript;

      setMessage(text);

    };


    recognition.onend = () => {

      setListening(false);

    };


    recognition.start();

    setListening(true);

  }



  function stopSpeech() {

    if (recognitionInstance) {

      recognitionInstance.stop();

    }

    setListening(false);

  }



  return (

    <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">


      <h3 className="mb-3 font-semibold text-cyan-300">
        💬 Spør AI
      </h3>


      <textarea

        value={message}

        onChange={(e) =>
          setMessage(e.target.value)
        }

        placeholder="Skriv spørsmål til AI..."

        className="h-24 w-full rounded-lg bg-slate-800 p-3 text-sm text-white"

      />


      <div className="mt-3 flex gap-2">


        <button

          type="button"

          onClick={sendQuestion}

          className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white"

        >

          Send

        </button>



        <button

          type="button"

          onClick={
            listening
              ? stopSpeech
              : startSpeech
          }

          className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white"

        >

          {
            listening
              ? "⏹ Stopp"
              : "🎤 Snakk"
          }

        </button>


      </div>



      {answer && (

        <div className="mt-4 rounded-lg border border-cyan-700 bg-cyan-950/30 p-3">

          <p className="font-medium text-cyan-300">
            🤖 AI svar
          </p>


          <p className="mt-2 whitespace-pre-line text-slate-300">
            {answer}
          </p>

        </div>

      )}


    </div>

  );

}