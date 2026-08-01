"use client";

import { useState } from "react";

export default function AIChatBox() {

  const [message, setMessage] = useState("");

  return (
    <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">

      <h3 className="mb-3 font-semibold text-cyan-300">
        💬 Spør AI
      </h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Skriv spørsmål til AI..."
        className="h-24 w-full rounded-lg bg-slate-800 p-3 text-sm text-white"
      />

      <div className="mt-3 flex gap-2">

  <button
    className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white"
  >
    Send
  </button>

  <button
    className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white"
  >
    🎤 Snakk
  </button>

</div>

    </div>
  );
}