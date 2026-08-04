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


  P0401: {

    1: [
      {
        name: "Strømforsyning EGR-ventil",
        expected: "Batterispenning ved aktivering",
        tool: "Multimeter",
        measure:
          "Kontroller spenning på forsyningsledning",
        faultIfWrong:
          "Kontroller strømtilførsel og ledningsnett",
      },

      {
        name: "Jord EGR-ventil",
        expected: "0V spenningsfall",
        tool: "Multimeter",
        measure:
          "Utfør spenningsfalltest på jord",
        faultIfWrong:
          "Kontroller jordforbindelse",
      },

      {
        name: "Styresignal EGR",
        expected: "Aktivt styresignal ved aktivering",
        tool: "Diagnoseverktøy",
        measure:
          "Aktiver EGR og kontroller respons",
        faultIfWrong:
          "Kontroller styresignal og EGR-funksjon",
      },
    ],


    2: [
      {
        name: "EGR-kanaler",
        expected: "Fri gjennomstrømning",
        tool: "Visuell kontroll",
        measure:
          "Kontroller for sot og blokkering",
        faultIfWrong:
          "Rengjør kanaler ved blokkering",
      },
    ],


    3: [
      {
        name: "Differansetrykksensor",
        expected: "Signal innenfor spesifikasjon",
        tool: "Diagnoseverktøy",
        measure:
          "Kontroller sensorverdier",
        faultIfWrong:
          "Kontroller sensor og ledningsnett",
      },

      {
        name: "MAF-sensor",
        expected: "Luftmasse følger spesifikasjon",
        tool: "Diagnoseverktøy",
        measure:
          "Sammenlign luftmasse med ønsket verdi",
        faultIfWrong:
          "Kontroller MAF-sensor og luftsystem",
      },
    ],

  },

    P0299: {

    1: [
      {
        name: "Ladeluftslanger",
        expected: "Ingen lekkasje eller skade",
        tool: "Visuell kontroll",
        measure:
          "Kontroller slanger, koblinger og klemmer",
        faultIfWrong:
          "Reparer lekkasje i ladeluftsystem",
      },

      {
        name: "Ladetrykk",
        expected: "Følger ønsket ladetrykk",
        tool: "Diagnoseverktøy",
        measure:
          "Sammenlign ønsket og faktisk ladetrykk",
        faultIfWrong:
          "Kontroller turbo, aktuator og lekkasjer",
      },

      {
        name: "MAP-signal",
        expected: "Stabilt sensorsignal",
        tool: "Diagnoseverktøy",
        measure:
          "Kontroller MAP-verdi under belastning",
        faultIfWrong:
          "Kontroller MAP-sensor og ledningsnett",
      },
    ],


    2: [
      {
        name: "Turboaktuator",
        expected: "Beveger seg korrekt ved aktivering",
        tool: "Diagnoseverktøy",
        measure:
          "Utfør aktiveringstest av aktuator",
        faultIfWrong:
          "Kontroller aktuator, strømforsyning og styresignal",
      },

      {
        name: "Styresignal turbo",
        expected: "Aktivt signal fra styreenhet",
        tool: "Diagnoseverktøy",
        measure:
          "Kontroller styring av turboaktuator",
        faultIfWrong:
          "Kontroller ledningsnett og ECU-styring",
      },
    ],


    3: [
      {
        name: "Turbolader mekanisk kontroll",
        expected: "Ingen unormal slakk eller skade",
        tool: "Visuell kontroll",
        measure:
          "Kontroller aksling og turbin",
        faultIfWrong:
          "Mekanisk feil på turbolader mistenkes",
      },
    ],

  },

};