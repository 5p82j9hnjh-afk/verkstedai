import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const question = body.question;


    if (!question) {

      return NextResponse.json(
        {
          error: "Mangler spørsmål"
        },
        {
          status: 400
        }
      );

    }


    const response =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {
            role: "system",
            content:
              "Du er VerkstedAI, en ekspert på bildiagnose. Svar kort og praktisk for en mekaniker."
          },

          {
            role: "user",
            content: question
          }

        ],

      });


    return NextResponse.json({

      answer:
        response.choices[0].message.content

    });


  } catch (error) {

    return NextResponse.json(
      {
        error:
          "AI-kall feilet"
      },
      {
        status: 500
      }
    );

  }

}