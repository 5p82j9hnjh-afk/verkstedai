export const liveDataRules = {
  P0401: {
    checks: [
      {
        parameter: "EGR faktisk verdi",
        message:
          "EGR faktisk verdi er lav i forhold til ønsket verdi. Kontroller EGR-ventil og EGR-kanaler.",
      },
    ],
  },
};