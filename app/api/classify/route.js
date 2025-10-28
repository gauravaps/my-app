import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { emails } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:"llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that categorizes emails into categories such as Promotions, Social, Work, Updates, Security, etc.",
          },
          {
            role: "user",
            content: `Categorize these emails: ${JSON.stringify(emails)}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const categories = data.choices[0]?.message?.content || "No categories found";

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Classification error:", error);
    return NextResponse.json({ error: "Failed to classify emails" }, { status: 500 });
  }
}
