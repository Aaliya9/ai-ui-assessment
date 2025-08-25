// app/api/ai-response/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message,model } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini", // keep this if other models fail
        messages: [
          {
            role: "system",
            content:
              "You are Nova, a friendly AI assistant built by the user. Respond accordingly.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { reply: "Error from OpenAI API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { reply: "Error fetching response" },
      { status: 500 }
    );
  }
}
