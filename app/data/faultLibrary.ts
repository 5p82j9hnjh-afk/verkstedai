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
};