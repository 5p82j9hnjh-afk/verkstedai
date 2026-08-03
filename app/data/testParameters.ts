export const testParameters: Record<
  string,
  Record<
    number,
    {
      name: string;
      expected: string;
      tool: string;
      measure: string;
      faultIfWrong: string;
    }[]
  >
> = {


  P2453: {

    1: [
      {
        name: "Differansetrykksensor signal",
        expected: "Kontroller signalspenning fra sensor",
        tool: "Multimeter / diagnoseverktøy",
        measure: "Les signalverdi og sammenlign med spesifikasjon",
        faultIfWrong:
          "Feil signal kan skyldes sensor, ledningsnett eller ECU-styring",
      },

      {
        name: "5V referanse",
        expected: "Ca. 5V",
        tool: "Multimeter",
        measure:
          "Mål mellom 5V referanse og jord",
        faultIfWrong:
          "Manglende 5V kan skyldes strømforsyning eller kabelbrudd",
      },

      {
        name: "Jord",
        expected: "0V spenningsfall",
        tool: "Multimeter",
        measure:
          "Kontroller jordledning under belastning",
        faultIfWrong:
          "Dårlig jord kan gi feil sensorsignal",
      },
    ],



    2: [
      {
        name: "Differansetrykk før DPF",
        expected: "Sammenlign verdi med spesifikasjon",
        tool: "Diagnoseverktøy",
        measure:
          "Les trykkverdi før DPF under drift",
        faultIfWrong:
          "Feil verdi kan tyde på sensorfeil eller tett filter",
      },

      {
        name: "Differansetrykk etter DPF",
        expected: "Kontroller trykkforskjell",
        tool: "Diagnoseverktøy",
        measure:
          "Sammenlign før og etter DPF",
        faultIfWrong:
          "Unormal forskjell kan tyde på blokkering",
      },

      {
        name: "RPM",
        expected: "Kontroller motorhastighet",
        tool: "Diagnoseverktøy",
        measure:
          "Les turtall under test",
        faultIfWrong:
          "Feil RPM-verdi kan påvirke beregning av DPF-data",
      },

      {
        name: "Eksostemperatur",
        expected: "Kontroller temperaturverdi",
        tool: "Diagnoseverktøy",
        measure:
          "Les temperatur før/etter DPF",
        faultIfWrong:
          "Feil temperatur kan påvirke regenerering",
      },

      {
        name: "Sotmengde",
        expected: "Kontroller beregnet sotmengde",
        tool: "Diagnoseverktøy",
        measure:
          "Les sotbelastning i styreenhet",
        faultIfWrong:
          "Høy sotmengde kan kreve regenerering eller kontroll av DPF",
      },
    ],



    3: [
      {
        name: "Signalspenning",
        expected: "Kontroller sensorsignal",
        tool: "Multimeter",
        measure:
          "Mål signalspenning fra sensor",
        faultIfWrong:
          "Feil signal kan skyldes sensor eller ledningsnett",
      },

      {
        name: "Jord",
        expected: "God jordforbindelse",
        tool: "Multimeter",
        measure:
          "Utfør spenningsfalltest på jord",
        faultIfWrong:
          "Dårlig jord kan gi ustabile signaler",
      },

      {
        name: "Ledningskontroll",
        expected: "Ingen brudd eller kortslutning",
        tool: "Multimeter",
        measure:
          "Kontroller kontinuitet i ledningsnett",
        faultIfWrong:
          "Skadet kabel eller kontaktfeil må utbedres",
      },
    ],

  },


};