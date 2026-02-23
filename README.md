# AgentLens

**See every AI agent on your site. In real time.**

AgentLens is a growth analytics platform for the agentic web. It tracks which AI agents (ChatGPT, Perplexity, Claude, Gemini, and others) visit your website, monitors your brand's visibility in AI-generated answers, and provides actionable recommendations to improve your AI search rankings.

## Features

- **Real-Time Agent Dashboard** — Watch AI agents visiting your site as they happen
- **AI Visibility Score** — Instant visibility score across all major AI platforms
- **Agent Directory** — Open database of 200+ known AI agents and bots
- **Content Optimizer** — Score and optimize your content for AI visibility
- **Competitive Benchmarking** — Track how you rank against competitors across AI platforms
- **One-Click Integrations** — Vercel, Cloudflare, AWS, WordPress, Next.js, HTTP API

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** Clerk
- **Payments:** Stripe
- **Database:** Supabase
- **UI:** HeroUI + Tailwind CSS 4 + Framer Motion
- **Fonts:** Poppins (body) + Bebas Neue (headings)
- **Analytics:** Vercel Analytics + Speed Insights
- **Email:** Resend

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account (for auth)
- Supabase account (for database)
- Stripe account (for payments)

### Installation

```bash
# Clone the repo
git clone https://github.com/chisomigwe/agentlens.git
cd agentlens

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

See `.env.example` for all required and optional environment variables.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.js            # Landing page
│   ├── layout.js          # Root layout with fonts & providers
│   ├── dashboard/         # Protected dashboard
│   │   ├── page.js        # Main dashboard with agent traffic
│   │   ├── visibility/    # AI Visibility Score page
│   │   └── optimize/      # Content Optimizer page
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page with comparison table
│   ├── directory/         # AI Agent Directory (public)
│   └── api/               # API routes (Stripe, auth sync)
├── components/            # Reusable components
├── config/                # Site & theme configuration
│   ├── site.config.js     # All branding, content, pricing
│   └── theme.config.js    # Color themes
└── lib/                   # Utilities (Stripe, Supabase, SEO)
```

## Origin

Built from the [Igwe Studios SaaS Template](https://github.com/chisomigwe) — a production-ready Next.js template with auth, payments, database, and SEO built in.

Inspired by research into [Siteline.ai](https://siteline.ai) and the emerging AI agent analytics market, with improvements based on competitive analysis and community feedback.

## License

MIT
