export interface FaultInfo {
  title: string;
  severity: "Low" | "Medium" | "High";

  systems: string[];

  symptoms: string[];

  commonCauses: string[];

  recommendedTests: string[];

  liveData: string[];

  estimatedRepairTime: string;
}

export const faultLibrary: Record<string, FaultInfo> = {
  P0401: {
    title: "Insufficient EGR Flow",

    severity: "Medium",

    systems: [
      "EGR",
      "Motorstyring",
      "Innsug",
    ],

    symptoms: [
      "Motorlampe",
      "Redusert effekt",
      "Sort røyk",
      "Ujevn gange",
    ],

    commonCauses: [
      "Tilstoppet EGR-ventil",
      "Tilstoppede EGR-kanaler",
      "Defekt differansetrykksensor",
      "Defekt MAF-sensor",
      "Vakuumlekkasje",
    ],

    recommendedTests: [
      "Kontroller EGR-ventil",
      "Kontroller EGR-kanaler",
      "Kontroller differansetrykksensor",
      "Kontroller MAF",
      "Utfør funksjonstest",
    ],

    liveData: [
      "MAF",
      "EGR %",
      "Boost pressure",
      "Differansetrykk",
    ],

    estimatedRepairTime: "1–3 timer",
  },


  P0299: {
    title: "Turbo Underboost",

    severity: "High",

    systems: [
      "Turbo",
      "Ladesystem",
      "Motorstyring",
    ],

    symptoms: [
      "Lite motorkraft",
      "Motorlampe",
      "Nødmodus",
    ],

    commonCauses: [
      "Lekkasje i ladeluftsystem",
      "Defekt turbo",
      "Defekt aktuator",
      "Defekt MAP-sensor",
    ],

    recommendedTests: [
      "Trykktest ladeluftsystem",
      "Kontroller turboaktuator",
      "Kontroller MAP-sensor",
      "Mål ladetrykk",
    ],

    liveData: [
      "Boost pressure",
      "MAP",
      "Turbo duty cycle",
    ],

    estimatedRepairTime: "2–5 timer",
  },


  P2121: {
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
      "Motorlampe",
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
      "Kontroller ledningsnett og kontakter",
      "Kontroller batterispenning",
    ],

    liveData: [
      "Gasspedal sensor 1",
      "Gasspedal sensor 2",
      "Gasspjeld ønsket posisjon",
      "Gasspjeld faktisk posisjon",
      "Batterispenning",
      "RPM",
    ],

    estimatedRepairTime: "1–2 timer",
  },
};