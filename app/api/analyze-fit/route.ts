import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { type NextRequest, NextResponse } from "next/server"
import { groq } from '@ai-sdk/groq';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { image, eventText } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
      schema: z.object({
        rating: z.int(),
        categories: z.object({
          coordination: z.int(),
          color: z.int(),
          fit: z.int(),
          style: z.int(),
        }),
        suggestions: z.array(z.string()),
        recommendations: z.array(z.object({
          name: z.string(),
          price: z.string(),
          store: z.string(),
          image: z.string()
        }))
      }),
       messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: `Analyze this outfit image for a ${eventText}.
Rate it 1-10 overall and provide category ratings for:
- Outfit coordination (1-10)
- Color harmony (1-10)
- Fit quality (1-10)
- Style appropriateness (1-10)

Also provide specific improvement suggestions and recommend 3 clothing items.

Return only valid JSON in the following format:
{
  "rating": number,
  "categories": {
    "coordination": number,
    "color": number,
    "fit": number,
    "style": number
  },
  "suggestions": string[],
  "recommendations": [
    { "name": string, "price": string, "store": string, "image": string }
  ]` },
        {
          type: 'image',
          image: image,
        },
      ],
    },
  ],
  });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Error analyzing outfit:", error);
    return NextResponse.json(
      { error: "Failed to analyze outfit" },
      { status: 500 }
    );
  }
}


/* 
To integrate with Cohere in production, you would:

1. Install the Cohere SDK: npm install cohere-ai
2. Add your COHERE_API_KEY to environment variables
3. Replace the mock analysis with actual Cohere API calls:

import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

const response = await cohere.chat({
  model: 'command-r-plus',
  message: `Analyze this outfit image for a ${eventText}. 
           Rate it 1-10 overall and provide category ratings for:
           - Outfit coordination (1-10)
           - Color harmony (1-10) 
           - Fit quality (1-10)
           - Style appropriateness (1-10)
           
           Also provide specific improvement suggestions and recommend 3 clothing items.
           
           Return JSON format:
           {
             "rating": number,
             "categories": {
               "coordination": number,
               "color": number,
               "fit": number,
               "style": number
             },
             "suggestions": string[],
             "recommendations": [{"name": string, "price": string, "store": string}]
           }`,
  // Note: Image analysis would require additional setup for image processing
})
*/
