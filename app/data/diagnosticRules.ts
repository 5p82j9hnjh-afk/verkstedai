export const diagnosticRules = {
  P0401: {
    start: "Start med å kontrollere EGR-ventilen.",
    ok: "Neste test: Kontroller EGR-kanalene.",
    failed: "Sannsynlig feil: EGR-ventilen er defekt eller tilstoppet.",
  },

  P2453: {
    start: "Start med å kontrollere differansetrykksensoren.",
    ok: "Neste test: Kontroller dieselpartikkelfilteret (DPF).",
    failed: "Sannsynlig feil: Differansetrykksensoren er defekt.",
  },

P2121: {
  start: "Start med å kontrollere gasspjeldsensoren.",
  ok: "Kontroller signalverdier og ledningsnett.",
  failed: "Sjekk sensor og kabling.",
 },
};