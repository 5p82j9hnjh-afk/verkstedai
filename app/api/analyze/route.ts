import OpenAI from "openai";
import { NextResponse } from "next/server";
import { faultLibrary } from "@/app/data/faultLibrary";
import { diagnosisPrompt } from "@/lib/prompts";

export const runtime = "nodejs";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000,
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
          error: "Ingen bilde mottatt"
        },
        {
          status: 400
        }
      );

    }


    const bytes =
      await image.arrayBuffer();


    console.log(
      "ORIGINAL BILDE:",
      bytes.byteLength
    );


    console.log(
      "BILDE TYPE:",
      image.type
    );


    if (bytes.byteLength > 3000000) {

      return NextResponse.json(
        {
          error:
          "Bildet er for stort. Maks 3MB."
        },
        {
          status: 400
        }
      );

    }


    const base64 =
      Buffer.from(bytes)
      .toString("base64");


    console.log(
      "BASE64 LENGDE:",
      base64.length
    );


    const imageUrl =
      `data:${image.type};base64,${base64}`;


    console.log(
      "SENDER BILDE TIL AI"
    );


    let response: any = null;



    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {

      try {

        console.log(
          "AI FORSØK:",
          attempt
        );


        response =
  await openai.chat.completions.create({

    model: "gpt-4o-mini",

    temperature: 0,

    max_tokens: 1200,

    messages: [

      {
        role: "user",

        content: [

          {
            type: "text",

            text: diagnosisPrompt
          },

          {
            type: "image_url",

            image_url: {
              url: imageUrl
            }

          }

        ]

      }

    ]

  });


        break;


      } catch(error) {


        console.log(
          "AI FEIL FORSØK:",
          attempt
        );


        if (attempt === 3) {

          throw error;

        }


        await new Promise(
          resolve =>
          setTimeout(resolve, 2000)
        );

      }

    }



    if (!response) {

      throw new Error(
        "Ingen AI respons"
      );

    }



    const rawResult =
  response.choices[0]
  ?.message
  ?.content || "{}";



    console.log(
      "AI SVAR:"
    );


    console.log(rawResult);



    let diagnosis;


    try {

      diagnosis =
        JSON.parse(rawResult);


    } catch {


      return NextResponse.json(
        {
          error:
          "AI returnerte ugyldig JSON",

          raw:
          rawResult
        },
        {
          status: 500
        }
      );

    }



    const faultCodes =
      Array.isArray(diagnosis.faultCodes)
      ?
      diagnosis.faultCodes
      :
      [];



    const libraryMatches =

      faultCodes

      .map((fault:any)=>{


        const code =

          typeof fault === "string"

          ?

          fault.toUpperCase()

          :

          fault.code?.toUpperCase();



        if (!code) {

          return null;

        }



        const data =
          faultLibrary[code];



        if (!data) {

          return null;

        }



        return {

          code,

          ...data

        };


      })

      .filter(Boolean);



    const combinedCauses = [

      ...new Set([

        ...(diagnosis.likelyCauses || []),

        ...libraryMatches.flatMap(
          (fault:any)=>
          fault.commonCauses || []
        )

      ])

    ];



    const combinedTests = [

      ...new Set([

        ...(diagnosis.nextTests || []),

        ...libraryMatches.flatMap(
          (fault:any)=>
          fault.recommendedTests || []
        )

      ])

    ];



    return NextResponse.json({

      diagnosis: {

        ...diagnosis,

        likelyCauses:
        combinedCauses,


        nextTests:
        combinedTests,


        faultLibraryData:
        libraryMatches

      }

    });



  } catch(error) {


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
        status: 500
      }
    );


  }

}