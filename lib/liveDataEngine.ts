import { liveDataRules } from "@/app/data/liveDataRules";

type DifferenceCheck = {
  type: "difference";
  first: string;
  second: string;
  limit: number;
  message: string;
};

type ExistsCheck = {
  type: "exists";
  parameter: string;
  message: string;
};

type LiveDataCheck =
  | DifferenceCheck
  | ExistsCheck;

export function analyzeLiveData(
  faultCode: string,
  data: Record<string, string>
) {
  const rules =
    liveDataRules[
      faultCode as keyof typeof liveDataRules
    ];

  if (!rules) {
    return "Ingen live-data regler tilgjengelig.";
  }

  for (const check of rules.checks as LiveDataCheck[]) {

    if (check.type === "difference") {
      const first = Number(data[check.first]);
      const second = Number(data[check.second]);

      if (
        first &&
        second &&
        first - second > check.limit
      ) {
        return check.message;
      }
    }

    if (check.type === "exists") {
      if (data[check.parameter]) {
        return check.message;
      }
    }
  }

  return "Ingen tydelige avvik funnet i innlagte verdier.";
}