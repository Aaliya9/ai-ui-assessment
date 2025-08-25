# Nova Chat

Nova Chat is a lightweight AI-powered chat assistant built using Next.js 13, Tailwind CSS, and the OpenAI GPT API. It features a sleek UI, conversation history, response copy/download, and customizable model parameters.

---

## 🔍 Research

We reviewed modern AI chat tools like ChatGPT, Poe, and HuggingChat to define the essential feature set:

- Prompt and response UX
- Theme toggle for light/dark mode
- History tracking
- Output copy/download options
- Integration with GPT models

After evaluating libraries and APIs, we chose:

- OpenAI’s chat completions (mocked via route.ts)
- Next.js App Router with Tailwind CSS
- Client-side state management with useState

---

## 🎨 Design

We used Figma for prototyping and mapped design tokens to Tailwind classes.

🔗 Figma Design Link (replace with your link)
https://www.figma.com/make/RmM9fXpFE5SZbJwekXd5iV/Nova-Chat-Application?fullscreen=1

🎨 Tailwind Mapping:

| Design Token     | Tailwind Class      |
| ---------------- | ------------------- |
| Primary Color    | bg-green-600        |
| Background Light | bg-white            |
| Background Dark  | bg-gray-900         |
| Font             | text-gray-900 / 100 |
| Corner Radius    | rounded, rounded-md |

UX includes:

- Left sidebar: new chat, history (on hover), theme toggle
- Prompt textarea + Send button
- Adjustable sliders: temperature & max tokens
- Chat output in a styled card with copy/download options

---

## 🛠️ Development

Built with:

- Next.js 13+ App Router
- Tailwind CSS
- TypeScript
- OpenAI API

📁 Project Structure:

- /app/page.tsx – Main UI component
- /app/api/ai-response/route.ts – API handler for OpenAI
- /styles – Tailwind base
- .env.local – API key (OPENAI_API_KEY)

API Logic (route.ts):

```ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "No response";
  return NextResponse.json({ reply });
}
## ✨ Features
- GPT prompt submission  
- Dark/Light mode toggle  
- Reset chat  
- Copy & Download response  
- Prompt/response history (hover reveal)  
- Configurable temperature & token length  
- Tailwind-based theming with design token mapping  

## ⚡ Using the OpenAI API
Create a `.env.local` file with your key:

bash
OPENAI_API_KEY=your-openai-key

Local Development
# 1. Clone the repo
git clone https://github.com/yourname/nova-chat
cd nova-chat

# 2. Install dependencies
npm install

# 3. Create a .env.local file with your OpenAI API key
echo "OPENAI_API_KEY=your-openai-key" > .env.local

# 4. Start the development server
npm run dev

Visit http://localhost:3000 to see Nova Chat running locally

