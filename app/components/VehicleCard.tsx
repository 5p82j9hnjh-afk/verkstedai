type Props = {
  diagnosis: any;
};

export default function VehicleCard({ diagnosis }: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#0b1c2b] p-4">
      <div className="grid grid-cols-[120px_1.4fr_1fr_1fr_1fr] gap-4">
        <div className="flex h-24 items-center justify-center rounded-lg bg-slate-800 text-5xl">
          🚙
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            {diagnosis
              ? `${diagnosis.vehicle.make} ${diagnosis.vehicle.model}`.trim()
              : "Volkswagen Golf"}
          </h3>

          <p className="text-sm text-slate-300">
            {diagnosis
              ? `${diagnosis.vehicle.year} · ${diagnosis.vehicle.engine}`
              : "2018 · 2.0 TDI · 110 kW"}
          </p>

          <p className="text-sm text-slate-400">
            Reg.nr:{" "}
            {diagnosis
              ? diagnosis.vehicle.registration || "Ikke funnet"
              : "AB 12345"}
          </p>

          <p className="text-sm text-slate-400">
            Km:{" "}
            {diagnosis
              ? diagnosis.vehicle.mileage || "Ikke funnet"
              : "142 300 km"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Drivstoff</p>
          <p className="mt-1 text-sm text-slate-200">Diesel</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Girkasse</p>
          <p className="mt-1 text-sm text-slate-200">Manuell</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Dato opprettet</p>
          <p className="mt-1 text-sm text-slate-200">
            24. mai 2024, 09:15
          </p>
        </div>
      </div>
    </div>
  );
}