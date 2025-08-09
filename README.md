# CookPal — Your Cooking Companion

Mobile‑first Next.js app to help you plan meals, manage pantry inventory, browse and create recipes, and get instant cooking help via AI.

## Features

- Inventory management with local storage persistence
- Recipe browsing, creation, and details with cooking steps and nutrition
- Smart dashboard: missing ingredients, shopping list preview, habit tips
- Calendar for meal planning (weekly/monthly scaffolding)
- Profile with nutrition goals and mock health integrations
- AI assistant chat backed by Gemini via Vercel AI SDK
- Polished mobile UI using Radix primitives and shadcn‑style components

### Tech stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Radix UI (`@radix-ui/react-*`), class-variance-authority
- Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- Biome for lint/format

### Getting started

1. Prerequisites

- Bun 1.1+ (recommended) or Node.js 18+

1. Install

```bash
# with Bun (recommended)
bun install

# or with npm/pnpm/yarn
npm install
# pnpm install
# yarn
```

1. Configure environment

Create a `.env.local` in the repo root:

```bash
# Required for AI chat (Gemini via @ai-sdk/google)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_key
```

1. Run

```bash
# dev server (http://localhost:3000)
bun run dev
# or
npm run dev
```

1. Build and start

```bash
bun run build && bun run start
# or
npm run build && npm run start
```

### Scripts

- `dev`: Start Next.js in dev mode (Turbopack)
- `build`: Production build
- `start`: Start production server
- `lint`: Run Next.js lint (Biome is also configured in the project)

### Project structure (high level)

```text
app/               # Next.js App Router pages
  api/chat/        # AI chat streaming endpoint (POST)
  assistant/       # AI chat UI
  dashboard/       # Home/dashboard
  inventory/       # Inventory screen
  recipes/         # Recipes list/manage/details
  profile/         # Profile & health integrations
  calendar/        # Calendar view
components/        # UI and feature components
  ui/              # shadcn-style components (button, dialog, etc.)
hooks/             # React hooks (e.g., use-storage)
lib/               # Core logic, storage, types, utils, planner
public/            # Static assets
```

### Key modules

- `lib/storage.ts`: LocalStorage-backed stores for inventory, recipes, meal plans, and preferences. Includes helpers like `checkAvailability`.
- `lib/smart-meal-planner.ts`: Generates meal plans (mock/AI-assisted) and suggestions; interacts with `/api/chat`.
- `app/api/chat/route.ts`: Streaming AI endpoint using `@ai-sdk/google` (Gemini 2.5 Flash) and Vercel AI SDK tools. Expects the client to send `messages`, `inventory`, and `recipes`.

#### Chat API (brief)

- Method: POST `/api/chat`
- Body:

```json
{
  "messages": [{ "role": "user", "content": "..." }],
  "inventory": [ /* Ingredient[] */ ],
  "recipes": [ /* Recipe[] */ ]
}
```

- Response: Server-sent stream (handled by `@ai-sdk/react` `useChat`). Tools include `getInventory`, `getRecipes`, `getRecipeById`, `checkCanMakeRecipe`, `findRecipesByIngredients`, `createRecipe`, `createIngredient`.

### Styling

- Tailwind CSS v4 via PostCSS plugin (`postcss.config.mjs`). Global styles are in `app/globals.css`. Fonts configured in `app/layout.tsx` using `next/font`.

### Notes

- Prototype status: this is an early prototype. All app state is stored in the browser via `localStorage`. There is no backend, authentication, or multi‑device sync.
- Data is persisted in `localStorage`; there’s no external DB. Clearing browser storage resets to defaults defined in `lib/storage.ts`.
- Images from Unsplash/placeholders are configured in `next.config.ts` `images.domains`.

### Deploy

- Any Next.js compatible host. Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is set in production environment.
