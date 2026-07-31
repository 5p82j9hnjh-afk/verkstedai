export const testSteps = {
  P0401: [
    {
      step: 1,
      title: "Kontroller EGR-ventil",
      instructions: [
        "Kontroller funksjon",
      ],
      ok: "Gå videre til neste test",
      failed: "EGR-ventil mistenkes defekt",
    },
  ],

  P2453: [
    {
      step: 1,
      title: "Kontroller differansetrykksensor",
      instructions: [
        "Mål sensorverdier",
      ],
      ok: "Kontroller DPF",
      failed: "Sensor mistenkes defekt",
    },
  ],

  P2121: [
    {
      step: 1,
      title: "Kontroller gasspedal sensor 1 og 2",
      instructions: [
        "Les av verdier fra begge gasspedalsensorene",
        "Sammenlign signalene",
        "Kontroller at verdiene følger hverandre",
      ],
      ok: "Gasspedalsensorene fungerer normalt",
      failed: "Avvik mellom sensorer. Kontroller pedalmodul og ledningsnett",
    },

    {
      step: 2,
      title: "Kontroller gasspjeld posisjon",
      instructions: [
        "Sammenlign ønsket og faktisk gasspjeldposisjon",
        "Kontroller at gasspjeldet beveger seg korrekt",
      ],
      ok: "Gasspjeldet responderer korrekt",
      failed: "Avvik mellom ønsket og faktisk posisjon",
    },
  ],
};