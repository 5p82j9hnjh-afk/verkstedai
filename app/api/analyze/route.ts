import OpenAI from "openai";
import { NextResponse } from "next/server";
import { diagnosisPrompt } from "@/lib/prompts";
import { faultLibrary } from "@/app/data/faultLibrary";
export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Ingen bildefil ble mottatt." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Bruk et JPG-, PNG- eller WebP-bilde." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");
    const imageUrl = `data:${image.type};base64,${base64Image}`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
            type: "input_text",
  text: diagnosisPrompt,

            },
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "high",
            },
          ],
        },
      ],
    });

    const rawResult = response.output_text;

try {
  const diagnosis = JSON.parse(rawResult);

  const faultCodes: string[] = Array.isArray(diagnosis.faultCodes)
    ? diagnosis.faultCodes
        .map((fault: unknown) => {
          if (typeof fault === "string") {
            return fault.toUpperCase();
          }

          if (
            typeof fault === "object" &&
            fault !== null &&
            "code" in fault &&
            typeof fault.code === "string"
          ) {
            return fault.code.toUpperCase();
          }

          return null;
        })
        .filter((code: string | null): code is string => code !== null)
    : [];

  const libraryMatches = faultCodes
    .map((code) => {
      const faultInfo = faultLibrary[code];

      if (!faultInfo) {
        return null;
      }

      return {
        code,
        ...faultInfo,
      };
    })
    .filter((fault) => fault !== null);

  const libraryCauses = libraryMatches.flatMap(
    (fault) => fault.commonCauses
  );

  const libraryTests = libraryMatches.flatMap(
    (fault) => fault.recommendedTests
  );

  const combinedCauses = [
    ...new Set([
      ...libraryCauses,
      ...(Array.isArray(diagnosis.likelyCauses)
        ? diagnosis.likelyCauses
        : []),
    ]),
  ];

  const combinedTests = [
    ...new Set([
      ...libraryTests,
      ...(Array.isArray(diagnosis.nextTests)
        ? diagnosis.nextTests
        : []),
    ]),
  ];

  const enrichedDiagnosis = {
    ...diagnosis,
    likelyCauses: combinedCauses,
    nextTests: combinedTests,
    faultLibraryData: libraryMatches,
  };

  return NextResponse.json({
    diagnosis: enrichedDiagnosis,
  });
} catch {
  console.error("AI returnerte ugyldig JSON:", rawResult);

  return NextResponse.json(
    { error: "AI-svaret kunne ikke leses som JSON." },
    { status: 500 }
  );
}

  } catch (error) {
    console.error("Bildeanalyse feilet:", error);

    return NextResponse.json(
      { error: "Bildet kunne ikke analyseres." },
      { status: 500 }
    );
  }
}