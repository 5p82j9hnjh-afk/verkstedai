export interface FaultCode {
  code: string;
  description: string;
  module: string;
}
export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  engine: string;
  fuel: string;
  transmission: string;
  registration: string;
  mileage: string;
}
export interface FaultLibraryData {
  code: string;
  title: string;
  severity: string;
  systems: string[];
  symptoms: string[];
  commonCauses: string[];
  recommendedTests: string[];
  liveData: string[];
  estimatedRepairTime: string;
}
export interface DiagnosisResult {
    vehicle: VehicleInfo;
  faultCodes: FaultCode[];
  freezeFrame: Record<string, string | number | null>;
  liveData: Record<string, string | number | null>;
  symptoms: string[];
  likelyCauses: string[];
  nextTests: string[];
  notes: string;
  faultLibraryData?: FaultLibraryData[];
}