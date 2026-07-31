export const liveDataRules = {
  P0401: {
    checks: [
      {
        type: "difference",
        first: "EGR ønsket verdi",
        second: "EGR faktisk verdi",
        limit: 20,
        message:
          "Stor forskjell mellom EGR ønsket og faktisk verdi. Kontroller EGR-ventil og EGR-kanaler.",
      },
    ],
  },

  P2453: {
    checks: [
      {
        type: "exists",
        parameter: "DPF differansetrykk",
        message:
          "DPF differansetrykk må vurderes mot forventet verdi.",
      },
    ],
  },

  P2121: {
    checks: [
      {
        type: "difference",
        first: "Gasspedal sensor 1",
        second: "Gasspedal sensor 2",
        limit: 10,
        message:
          "Avvik mellom gasspedal sensor 1 og sensor 2. Kontroller pedalmodul og ledningsnett.",
      },
    ],
  },
};