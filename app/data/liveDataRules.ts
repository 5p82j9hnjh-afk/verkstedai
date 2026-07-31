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
};