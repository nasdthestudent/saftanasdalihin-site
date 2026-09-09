import { ApiError, GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { SAFTA_CONTEXT_DATA } from '@/lib/safta-profile-data';
import { chatRateLimit } from "@/lib/rate-limit";

// Google Gemini AI Client Configuration
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --- System Instruction for Chatbot ---
const SYSTEM_INSTRUCTION = `You are Safta AI, a chatbot that represents and mimics the personality of a professional Smart Contract Developer named Safta Nasdalihin. Your job is to answer questions in an informative, technical, and confident manner.
Your style should be:
1. Formal, highly professional, and technical.
2. Always focus on your expertise: Solidity, Web3, Blockchain, Ethereum, and Smart Contracts.
3. Prioritize the user's input language. If the language is ambiguous (e.g., 'Hi'), default STRICTLY to professional English.
4. Never claim to be a general AI model or Google. Always answer "Safta" or "I."`;

// Primary model
const MODEL = 'gemini-3.5-flash-lite';

// Retry configuration
const MAX_ATTEMPTS = 3;
const INITIAL_DELAY = 1000; // 1 second

// Errors that are reasonable to retry
const RETRYABLE_STATUS_CODES = [500, 502, 503, 504];

// Helper function for delay
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Generate response with retry ---
async function generateResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[],
  systemInstruction: string
) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(
        `Gemini ${MODEL} request attempt ${attempt}/${MAX_ATTEMPTS}`
      );

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: messages,
        config: {
          systemInstruction,
        },
      });

      console.log(
        `Gemini ${MODEL} succeeded on attempt ${attempt}`
      );

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `Gemini API error on attempt ${attempt}:`,
          error.status
        );

        // Retry only transient server-side errors
        if (
          RETRYABLE_STATUS_CODES.includes(error.status) &&
          attempt < MAX_ATTEMPTS
        ) {
          const delay = INITIAL_DELAY * 2 ** (attempt - 1);

          console.log(
            `${error.status} received. Retrying in ${delay}ms...`
          );

          await sleep(delay);
          continue;
        }
      }

      // Don't retry non-transient errors
      throw error;
    }
  }

  throw new Error('Failed to generate AI response after all attempts.');
}

// --- POST function to handle chat requests ---
export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

    const { success, limit, remaining, reset } =
      await chatRateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid message history' },
        { status: 400 }
      );
    }

    if (messages.length > 20) {
      return NextResponse.json(
        { error: 'Message history is too long' },
        { status: 400 }
      );
    }

    const isValidMessages = messages.every((message) => {
      return (
        message &&
        (message.role === 'user' || message.role === 'model') &&
        Array.isArray(message.parts) &&
        message.parts.length === 1 &&
        typeof message.parts[0]?.text === 'string' &&
        message.parts[0].text.length <= 4000
      );
    });

    if (!isValidMessages) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Combine system instruction with personal context
    const MODIFIED_SYSTEM_INSTRUCTION = `${SYSTEM_INSTRUCTION}

--- PERSONAL CONTEXT DATA ---
${SAFTA_CONTEXT_DATA}
---
Use this information as your primary knowledge base.`;

    // Generate response
    const response = await generateResponse(
      messages,
      MODIFIED_SYSTEM_INSTRUCTION
    );

    // Send response back to frontend
    return NextResponse.json({
      response: response.text,
    });

  } catch (error) {
    console.error('Error in Gemini API:', error);

    return NextResponse.json(
      {
        error: 'An error occurred while processing the AI request.',
      },
      { status: 500 }
    );
  }
}