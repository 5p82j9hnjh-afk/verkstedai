export const diagnosticProcedures = {
  P0401: [
    {

  id: 1,
  title: "Kontroller EGR-ventil",
  description:
    "Aktiver EGR-ventilen med diagnoseverktøy og kontroller at den beveger seg normalt.",

  ok:
    "EGR-ventilen fungerer. Gå videre til kontroll av EGR-kanaler.",

  failed:
    "EGR-ventilen reagerer ikke. Kontroller strømforsyning, jord, styresignal og mekanisk funksjon.",
},
    {
  id: 2,
  title: "Kontroller EGR-kanaler",
  description:
    "Kontroller kanalene for sot og blokkering.",

  ok:
    "EGR-kanaler er åpne. Fortsett til neste kontroll.",

  failed:
    "Blokkering funnet. Rengjør EGR-kanaler og utfør ny funksjonstest.",
},
    {
      id: 3,
      title: "Kontroller differansetrykksensor",
      description:
        "Kontroller sensorverdier og slanger.",
    },
    {
      id: 4,
      title: "Kontroller MAF-sensor",
      description:
        "Sammenlign målt luftmasse med spesifikasjon.",
    },
    {
      id: 5,
      title: "Utfør funksjonstest",
      description:
        "Kontroller at feilkoden ikke kommer tilbake etter reparasjon.",
    },
  ],

  P0299: [
    {
      id: 1,
      title: "Kontroller ladeluftslanger",
      description:
        "Se etter lekkasjer, sprekker eller løse slangeklemmer.",
    },
    {
      id: 2,
      title: "Kontroller turboaktuator",
      description:
        "Test at aktuatoren beveger seg fritt og reagerer på styring.",
    },
    {
      id: 3,
      title: "Kontroller MAP-sensor",
      description:
        "Sammenlign målt ladetrykk med spesifikasjon.",
    },
    {
      id: 4,
      title: "Kontroller turbolader",
      description:
        "Sjekk slakk i aksling og eventuelle skader på turbinen.",
    },
  ],
    P2453: [
    {
      id: 1,
      title: "Kontroller differansetrykksensor",
      description:
        "Kontroller sensorverdier, slanger og ledningsnett.",
    },
    {
      id: 2,
      title: "Kontroller DPF trykkverdier",
      description:
        "Sammenlign differansetrykk før og etter filter.",
    },
    {
      id: 3,
      title: "Kontroller ledningsnett",
      description:
        "Kontroller strømforsyning, jord og signal fra sensor.",
    },
  ],


  P2121: [
    {
      id: 1,
      title: "Kontroller gasspjeldsensor",
      description:
        "Kontroller signal, strømforsyning og jord til sensor.",
    },
    {
      id: 2,
      title: "Sammenlign sensorsignaler",
      description:
        "Kontroller at sensorverdiene følger hverandre korrekt.",
    },
    {
      id: 3,
      title: "Kontroller ledningsnett",
      description:
        "Kontroller kontakt, ledninger og eventuelle brudd.",
    },
  ],
};