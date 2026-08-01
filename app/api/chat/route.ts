import OpenAI from "openai";
import { NextResponse } from "next/server";
import { faultLibrary } from "@/app/data/faultLibrary";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const question = body.question;

    const faultCode =
      body.faultCode ?? "Ingen feilkode oppgitt";


    const fault =
      faultLibrary[faultCode];


    console.log(
      "FEILKODE FRA APP:",
      faultCode
    );

    console.log(
      "FAULT DATA:",
      fault
    );


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

            content: `
Du er VerkstedAI, en erfaren bildiagnostiker på verksted.

Du skal hjelpe en mekaniker med en konkret feilsak.

Aktiv feilkode:
${faultCode}

Feilbeskrivelse:
${fault?.title ?? "Ukjent"}

Berørte systemer:
${fault?.systems?.join(", ") ?? "Ingen data"}

Symptomer:
${fault?.symptoms?.join(", ") ?? "Ingen data"}

Vanlige årsaker:
${fault?.commonCauses?.join(", ") ?? "Ingen data"}

Anbefalte tester:
${fault?.recommendedTests?.join(", ") ?? "Ingen data"}

Tilgjengelig live-data:
${fault?.liveData?.join(", ") ?? "Ingen data"}


Regler for svar:
- Svar som en erfaren mekaniker
- Start med mest sannsynlige årsak
- Gi konkrete tester i riktig rekkefølge
- Forklar kort hvorfor testen gjøres
- Ikke gi generelle OBD-råd
- Bruk informasjonen over aktivt
`
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

    console.error(
      "CHAT ERROR:",
      error
    );


    return NextResponse.json(
      {
        error: "AI-kall feilet"
      },
      {
        status: 500
      }
    );

  }

}