export const demoDiagnosis = {
  vehicle: {
    make: "Volkswagen",
    model: "Golf",
    year: "2018",
    engine: "2.0 TDI",
    fuel: "Diesel",
    transmission: "Manuell",
    registration: "AB 12345",
    mileage: "142 300 km",
  },


  faultCodes: [
    {
      code: "P0401",
      description: "Insufficient EGR Flow",
      module: "Motorstyring",
    },

    {
      code: "P2453",
      description: "DPF differansetrykksensor",
      module: "Motorstyring",
    },

    {
      code: "P2121",
      description: "Throttle/Pedal Position Sensor",
      module: "Motorstyring",
    },

    {
      code: "P0299",
      description: "Turbo Underboost",
      module: "Motorstyring",
    },
  ],


  freezeFrame: {
    RPM: 1820,
    CoolantTemp: 87,
    Speed: 62,
  },


  liveData: {
    BoostPressure: "1.3 bar",
    FuelPressure: "320 bar",
  },


  symptoms: [
    "Motoreffekt mangler",
    "Feillampen lyser",
  ],


  likelyCauses: [
    "Lekkasjer i ladeluftsystem",
    "Defekt turboaktuator",
  ],


  nextTests: [
    "Kontroller ladeluftsystem",
    "Kontroller turboaktuator",
    "Kontroller MAP-sensor",
  ],


  notes: "Demo-data for utvikling av VerkstedAI.",


  faultLibraryData: [

    {
      code: "P0401",
      title: "Insufficient EGR Flow",
      severity: "Medium",

      systems: [
        "EGR-system",
        "Motorstyring",
      ],

      symptoms: [
        "Motorlampen lyser",
        "Redusert motoreffekt",
        "Ujevn gange",
      ],

      commonCauses: [
        "Tilstoppet EGR-ventil",
        "Tilstoppede EGR-kanaler",
        "Defekt differansetrykksensor",
      ],

      recommendedTests: [
        "Kontroller EGR-ventilens funksjon",
        "Kontroller EGR-kanaler",
        "Kontroller differansetrykksensor",
      ],

      liveData: [
        "EGR ønsket verdi",
        "EGR faktisk verdi",
        "Luftmasse",
      ],

      estimatedRepairTime: "1–3 timer",
    },


    {
      code: "P2453",
      title: "DPF differansetrykksensor",
      severity: "Medium",

      systems: [
        "DPF-system",
        "Eksosanlegg",
        "Motorstyring",
      ],

      symptoms: [
        "Motorlampen lyser",
        "Redusert motoreffekt",
        "Problemer med regenerering",
      ],

      commonCauses: [
        "Defekt differansetrykksensor",
        "Tette eller skadde trykkslanger",
        "Tilstoppet dieselpartikkelfilter",
      ],

      recommendedTests: [
        "Kontroller trykkslangene",
        "Mål differansetrykk",
        "Sammenlign sensorverdi",
      ],

      liveData: [
        "DPF differansetrykk",
        "Sotbelastning",
        "Eksostemperatur",
      ],

      estimatedRepairTime: "1–2 timer",
    },


    {
      code: "P2121",
      title: "Throttle/Pedal Position Sensor",
      severity: "Medium",

      systems: [
        "Gasspedal",
        "Gasspjeld",
        "Motorstyring",
      ],

      symptoms: [
        "Ustabil gassrespons",
        "Redusert motoreffekt",
        "Motorlampen lyser",
        "Nødmodus",
      ],

      commonCauses: [
        "Defekt gasspedalsensor",
        "Avvik mellom sensorsignaler",
        "Ledningsfeil",
        "Kontaktproblem",
      ],

      recommendedTests: [
        "Sammenlign gasspedal sensor 1 og 2",
        "Kontroller gasspjeld respons",
        "Kontroller ledningsnett",
      ],

      liveData: [
        "Gasspedal sensor 1",
        "Gasspedal sensor 2",
        "Gasspjeld posisjon",
        "RPM",
      ],

      estimatedRepairTime: "1–2 timer",
    },


    {
      code: "P0299",
      title: "Turbo Underboost",
      severity: "High",

      systems: [
        "Turbo",
        "Ladesystem",
        "Motorstyring",
      ],

      symptoms: [
        "Lite motorkraft",
        "Motorlampen lyser",
        "Nødmodus",
      ],

      commonCauses: [
        "Lekkasje i ladeluftsystem",
        "Defekt turboaktuator",
        "Defekt MAP-sensor",
        "Mekanisk feil på turbo",
      ],

      recommendedTests: [
        "Kontroller ladeluftslanger",
        "Kontroller turboaktuator",
        "Kontroller MAP-sensor",
        "Kontroller turbolader",
      ],

      liveData: [
        "Boost pressure",
        "MAP",
        "Turbo duty cycle",
      ],

      estimatedRepairTime: "2–5 timer",
    },

  ],
};