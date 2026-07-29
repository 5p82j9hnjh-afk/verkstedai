import OpenAI from "openai";
import { NextResponse } from "next/server";

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
              text: `
Analyser bildet som en profesjonell bilteknisk assistent.

Les bare informasjon som faktisk er synlig i bildet.

Finn:
- feilkoder
- beskrivelser
- styreenhet
- freeze frame-data
- live-data
- måleenheter
- annen relevant diagnosetekst

Svar på norsk og marker usikker tekst tydelig.
              `.trim(),
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

    return NextResponse.json({
      analysis: response.output_text,
    });
  } catch (error) {
    console.error("Bildeanalyse feilet:", error);

    return NextResponse.json(
      { error: "Bildet kunne ikke analyseres." },
      { status: 500 }
    );
  }
}