import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000,
});


export async function POST(request: Request) {

  try {


    const formData =
      await request.formData();


    const image =
      formData.get("image");


    if (!(image instanceof File)) {

      return NextResponse.json(
        {
          error:"Ingen bilde mottatt"
        },
        {
          status:400
        }
      );

    }


    const bytes =
      await image.arrayBuffer();


    console.log(
      "ORIGINAL BILDE:",
      bytes.byteLength
    );


    const base64 =
      Buffer.from(bytes)
      .toString("base64");


    const imageUrl =
      `data:${image.type};base64,${base64}`;



    const response =
      await openai.chat.completions.create({

        model:"gpt-4.1-mini",

        max_tokens:500,


        messages:[

          {

            role:"user",

            content:[


              {
                type:"text",

                text:
                `
Analyser dette bildet av en bildiagnose.

Finn:
- bilmodell hvis synlig
- feilkoder
- kort beskrivelse

Svar vanlig tekst.
`
              },


              {

                type:"image_url",

                image_url:{

                  url:imageUrl,

                  detail:"low"

                }

              }


            ]

          }


        ]


      });



    const result =
      response.choices[0]
      .message
      .content || "";



    console.log(
      "AI RESULTAT:"
    );

    console.log(result);



    return NextResponse.json({

      result

    });



  }

  catch(error){


    console.error(
      "ANALYSE FEIL:",
      error
    );


    return NextResponse.json(

      {
        error:
        "Bildeanalyse feilet"
      },

      {
        status:500
      }

    );

  }


}