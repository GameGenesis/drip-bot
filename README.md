# Drip Bot — AI Fashion Fit Rater & Stylist

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC) ![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-ai%205-000) ![GROQ](https://img.shields.io/badge/GROQ-Llama--4--Maverick--17B-FF4A4A) ![Zod](https://img.shields.io/badge/Zod-4-3E67B1)

Upload a full-body outfit photo and get a 1–10 rating with category breakdowns, suggestions, and shopping recs.

Try out Drip Bot: https://drip-bot.vercel.app/

---

## ✨ Features

- **One-shot AI fit rating (1–10)** with an emoji scale and animated progress bar
- **Category breakdowns**: coordination, color harmony, fit quality, style appropriateness
- **Concrete style suggestions** (plain-English, actionable)
- **Shopping recommendations** (name, price, store, image) presented as responsive cards
- **Drag & Drop image upload** with graceful fallbacks and delete/replace
- **Event-aware analysis**: include context like *“wedding guest”*, *“tech conference”*, *“streetwear”*
- **Clean, fast UI** built with Tailwind v4 + Radix primitives + lucide icons + Geist font
- **Type-safe structured outputs** using Zod + Vercel AI SDK `generateObject`

---

## 🧱 Tech Stack

- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** with CSS variables, custom light/dark palettes (see `app/globals.css`)
- **Radix UI** primitives (`@radix-ui/react-progress`, `@radix-ui/react-label`)
- **lucide-react** icons
- **Vercel AI SDK (ai v5)** + **@ai-sdk/groq** provider → model: **`meta-llama/llama-4-maverick-17b-128e-instruct`**
- **Zod** schemas to validate and parse model outputs
- **cva + tailwind-merge** for ergonomic, composable component styles

## 🧪 Skills & Techniques Demonstrated

- **Frontend**
  - React 19 hooks, client components, Suspense
  - **Drag & drop** image handling with `FileReader` → Base64 Data URL
  - **Animated progress meters** with score→color interpolation
  - Radix primitives & accessible HTML semantics
  - Tailwind v4 + CSS variables for **dark/light themes** (see `globals.css`)

- **Full‑Stack**
  - Next.js App Router with **serverless API routes**
  - **Vercel AI SDK `generateObject`** for **type-safe structured outputs** (Zod schema)
  - Provider abstraction via **@ai-sdk/groq** (easily swappable to OpenAI/Cohere)
  - Clear **error handling** & loading states

- **Type Safety & DX**
  - End‑to‑end **TypeScript** typings for the analysis object
  - **Zod** schema mirrors the UI types → confident parsing & rendering
  - `class-variance-authority` + `tailwind-merge` patterns for clean component APIs

---

## 🔧 Configuration Notes

- **Theme**: Orange‑accent palette with matching dark mode in `app/globals.css`
- **Components**: shadcn‑style `ui/` primitives (button, card, badge, label, progress)
- **Model**: default `meta-llama/llama-4-maverick-17b-128e-instruct` from GROQ.
- **Image size**: For best results, upload a clear, full‑body image. Consider adding client‑side resize/compression if needed.

---

🔮 Next Steps

We see Drip Bot as more than a hackathon project, and we plan to keep building on it:

- **Integrate Shopping APIs**: Connect to APIs from retailers (e.g., Uniqlo, H&M, Shopify) to fetch real product data with images, prices, and direct links for recommendations.
- **Enhance User Experience**: Improve the UI with more interactive visuals, shareable result cards, and smoother onboarding.
- **Bridge Businesses & Customers**: Allow brands to showcase their products directly within Drip Bot, creating a channel that helps users discover clothing while giving businesses a way to reach style-conscious audiences.
- **Refine AI Analysis**: Experiment with multimodal, vision-capable models for more accurate outfit analysis.
- **Personalization**: Add user profiles, saved outfits, and context-aware recommendations based on wardrobe history or event types.

Our goal is to move from a prototype into a tool that helps people make confident style choices while also giving businesses a way to connect with their customers in meaningful, AI-powered ways.
