/**
 * CrawlWatch - Site Configuration
 *
 * Central configuration for the CrawlWatch application.
 * See every AI agent on your site. In real time.
 */

export const siteConfig = {
  // ============================================
  // LANDING PAGE MODE
  // ============================================
  landingMode: "default",

  // ============================================
  // CORE BRANDING
  // ============================================
  name: "CrawlWatch",
  tagline: "See every AI agent on your site. In real time.",
  description: "CrawlWatch is a growth analytics platform for the agentic web. Track which AI agents visit your site, monitor your visibility across AI search platforms, and get actionable insights to drive organic growth. Trusted by growth teams, marketers, and SEO agencies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // ============================================
  // VISUAL IDENTITY
  // ============================================
  logo: {
    path: "/logo.png",
    emoji: null,
    width: 40,
    height: 40,
  },

  // ============================================
  // CONTACT EMAILS
  // ============================================
  emails: {
    support: "support@crawlwatch.ai",
    legal: "legal@crawlwatch.ai",
    contact: "hello@crawlwatch.ai",
    privacy: "privacy@crawlwatch.ai",
  },

  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    twitter: "https://twitter.com/CrawlWatchAI",
    instagram: null,
    youtube: null,
    linkedin: "https://linkedin.com/company/crawlwatch",
    github: "https://github.com/chisomigwe/crawlwatch",
  },

  // ============================================
  // LEGAL INFORMATION
  // ============================================
  legal: {
    companyName: "CrawlWatch Inc.",
    jurisdiction: "Delaware, USA",
    effectiveDate: "February 23, 2026",
    maxLiability: "$100",
  },

  // ============================================
  // NAVIGATION LINKS
  // ============================================
  nav: {
    main: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Directory", href: "/directory" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },

  // ============================================
  // SEO KEYWORDS
  // ============================================
  keywords: [
    "AI agent analytics",
    "AI bot traffic",
    "AI visibility tracking",
    "agentic web analytics",
    "AI search optimization",
    "GEO analytics",
    "AI citation monitoring",
    "ChatGPT analytics",
    "AI crawler tracking",
    "generative engine optimization",
    "AI SEO tools",
    "bot traffic analytics",
  ],

  // ============================================
  // PRICING CONFIGURATION
  // ============================================
  pricing: {
    currency: "USD",
    proPrice: parseInt(process.env.NEXT_PUBLIC_PRO_PRICE) || 7900,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    plans: [
      {
        name: "Free",
        price: 0,
        period: "forever",
        description: "Get started with basic agent analytics",
        features: [
          "1 website",
          "50 monthly prompt runs",
          "3 AI platforms tracked",
          "Basic agent traffic dashboard",
          "AI Visibility Score",
          "Community support",
        ],
        cta: "Get Started Free",
        highlighted: false,
      },
      {
        name: "Starter",
        price: 29,
        period: "/month",
        description: "For growing teams optimizing AI visibility",
        features: [
          "3 websites",
          "500 monthly prompt runs",
          "All AI platforms tracked",
          "Real-time agent dashboard",
          "Content optimization suggestions",
          "Competitive benchmarking (10 competitors)",
          "Data exports (CSV, JSON)",
          "Email support",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Growth",
        price: 79,
        period: "/month",
        description: "For teams serious about AI-driven growth",
        features: [
          "10 websites",
          "2,000 monthly prompt runs",
          "All AI platforms tracked",
          "Real-time agent dashboard",
          "AI content optimizer with editor",
          "Competitive benchmarking (50 competitors)",
          "Citation monitoring",
          "Custom agent access rules",
          "Slack + email support",
          "API access",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: null,
        period: "",
        description: "For agencies and large organizations",
        features: [
          "Unlimited websites",
          "Unlimited prompt runs",
          "All AI platforms tracked",
          "White-label dashboards",
          "Multi-client management",
          "Custom integrations",
          "Dedicated account manager",
          "SLA guarantee",
          "SSO & advanced security",
        ],
        cta: "Contact Sales",
        highlighted: false,
      },
    ],
  },

  // ============================================
  // UPGRADE MODAL FEATURES
  // ============================================
  upgradeFeatures: [
    {
      title: "Real-Time Agent Dashboard",
      description: "See AI agents visiting your site as they happen",
    },
    {
      title: "AI Content Optimizer",
      description: "Score and optimize your content for AI search visibility",
    },
    {
      title: "Competitive Benchmarking",
      description: "Track how you rank against competitors across AI platforms",
    },
    {
      title: "Citation Monitoring",
      description: "Know when AI chatbots reference your content",
    },
  ],

  // ============================================
  // LANDING PAGE CONTENT
  // ============================================
  landing: {
    hero: {
      title: "See Every AI Agent On Your Site",
      subtitle: "30% of web traffic now comes from AI agents. CrawlWatch turns that invisible traffic into actionable growth insights with real-time analytics, visibility tracking, and content optimization.",
      cta: "Get Started Free",
      secondaryCta: "See Features",
    },
    features: [
      {
        title: "Real-Time Agent Dashboard",
        description: "Watch AI agents from ChatGPT, Perplexity, Claude, and Gemini visiting your site in real time. See what pages they crawl, how often they return, and what content they prioritize.",
        icon: "Activity",
      },
      {
        title: "AI Visibility Score",
        description: "Get an instant score showing how visible your brand is across all major AI platforms. Free for everyone, no signup required. Like PageSpeed Insights for AI search.",
        icon: "BarChart3",
      },
      {
        title: "Agent Directory",
        description: "Browse our open database of 200+ known AI agents and bots. Understand their crawl behavior, purpose, and how to optimize for each one.",
        icon: "Database",
      },
      {
        title: "Content Optimizer",
        description: "Go beyond recommendations. Our built-in editor scores your content for AI visibility and suggests real-time improvements to boost citations and rankings.",
        icon: "PenTool",
      },
      {
        title: "Competitive Benchmarking",
        description: "See how your AI visibility stacks up against competitors. Track rankings, citations, and share of voice across ChatGPT, Perplexity, Gemini, and more.",
        icon: "Trophy",
      },
      {
        title: "One-Click Integrations",
        description: "Set up in minutes with guided wizards for Vercel, Cloudflare, AWS, WordPress, Next.js, and any backend via our HTTP API. Zero impact on page speed.",
        icon: "Plug",
      },
    ],
  },

  // ============================================
  // GEO (GENERATIVE ENGINE OPTIMIZATION)
  // ============================================
  geo: {
    enabled: true,

    organization: {
      type: "Organization",
      foundingDate: "2026",
      founders: [
        {
          name: "CrawlWatch Team",
          title: "Founding Team",
          url: null,
        },
      ],
      sameAs: [],
    },

    product: {
      type: "SoftwareApplication",
      applicationCategory: "AnalyticsApplication",
      operatingSystem: "Web",
      aggregateRating: null,
      offers: {
        priceCurrency: "USD",
        price: "0",
        priceValidUntil: null,
      },
      downloadUrl: null,
      screenshot: null,
    },

    faq: {
      enabled: true,
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about AI agent analytics.",
      items: [
        {
          question: "What is CrawlWatch?",
          answer: "CrawlWatch is a growth analytics platform for the agentic web. It tracks which AI agents (ChatGPT, Perplexity, Claude, Gemini, and others) visit your website, monitors your brand's visibility in AI-generated answers, and provides actionable recommendations to improve your AI search rankings.",
        },
        {
          question: "What are AI agents and why should I care about them?",
          answer: "AI agents are automated systems from companies like OpenAI, Google, Anthropic, and others that crawl websites to gather information. They power AI chatbots like ChatGPT and Perplexity. About 30% of web traffic now comes from these agents, and they increasingly influence how products are discovered and recommended online.",
        },
        {
          question: "How does CrawlWatch track AI agents?",
          answer: "CrawlWatch integrates with your existing infrastructure (Vercel, Cloudflare, AWS, WordPress, or any backend) to analyze server logs asynchronously. It identifies AI agent traffic, classifies bots by type and purpose, and provides real-time analytics without impacting your page load speed.",
        },
        {
          question: "Is there a free plan?",
          answer: "Yes. Our free plan includes 1 website, 50 monthly prompt runs, 3 AI platforms tracked, and access to our AI Visibility Score and Agent Directory. No credit card required.",
        },
        {
          question: "How is CrawlWatch different from traditional analytics tools?",
          answer: "Traditional analytics tools like Google Analytics focus on human visitors. CrawlWatch specifically tracks AI agent and bot traffic, which represents a growing share of web traffic that traditional tools ignore. We also monitor your visibility in AI-generated answers, not just on your own site.",
        },
        {
          question: "Does CrawlWatch slow down my website?",
          answer: "No. All integrations are asynchronous and process data from server logs. CrawlWatch never injects scripts into your pages or intercepts requests. There is zero impact on your page load speed or user experience.",
        },
        {
          question: "What AI platforms does CrawlWatch track?",
          answer: "CrawlWatch tracks all major AI platforms including ChatGPT (OpenAI), Perplexity, Claude (Anthropic), Gemini (Google), Copilot (Microsoft), and more. We continuously add support for new AI agents as they emerge.",
        },
      ],
    },

    about: {
      enabled: true,
      blurb: "CrawlWatch is an AI agent analytics platform that helps growth teams, marketers, and SEO agencies understand and optimize for the 30% of web traffic that comes from AI agents and bots. Built for teams who recognize AI search as a critical growth channel, CrawlWatch provides real-time agent tracking, visibility scoring, content optimization, and competitive benchmarking across all major AI platforms.",
      lastUpdated: new Date().toISOString().split("T")[0],
    },

    testimonials: {
      enabled: true,
      items: [
        {
          name: "Sarah Chen",
          title: "Head of Growth at TechFlow",
          quote: "We had no idea that 35% of our traffic was from AI agents until CrawlWatch showed us. Within 3 weeks of optimizing based on their recommendations, our AI citations increased by 120%.",
        },
        {
          name: "Marcus Rivera",
          title: "SEO Director at GrowthLab Agency",
          quote: "CrawlWatch is the missing piece in our SEO stack. We can now show clients exactly how they rank in AI search results, not just Google. The competitive benchmarking alone is worth the price.",
        },
        {
          name: "Priya Patel",
          title: "VP Marketing at CloudBase",
          quote: "The real-time agent dashboard is addictive. Watching AI bots crawl our site and knowing exactly what they're looking at has completely changed how we think about content strategy.",
        },
      ],
    },

    llmsTxt: {
      enabled: true,
      preamble: "CrawlWatch provides growth analytics for the agentic web, helping teams track AI agent traffic and optimize AI search visibility.",
      extraPages: [],
    },

    robots: {
      enabled: true,
      allowAICrawlers: true,
      additionalDisallow: [],
      additionalAllow: [],
    },

    sitemap: {
      enabled: true,
      changeFrequency: "weekly",
      priority: {
        home: 1.0,
        features: 0.8,
        pricing: 0.8,
        about: 0.7,
        legal: 0.3,
      },
      additionalUrls: [],
    },

    breadcrumbs: {
      enabled: true,
    },

    contentFreshness: {
      showLastUpdated: true,
    },
  },

  // ============================================
  // WAITLIST / EARLY BIRD CONFIGURATION
  // ============================================
  waitlist: {
    hero: {
      title: "The Future of Web Analytics",
      subtitle: "Join the waitlist for CrawlWatch and be first to see every AI agent visiting your site.",
      badge: "Coming Soon",
    },
    earlyBird: {
      enabled: true,
      title: "Early Bird Offer",
      description: "Sign up now and lock in our special founding member rate",
      originalPrice: 79,
      discountedPrice: 29,
      discountLabel: "63% OFF",
      expiresText: "Limited spots available",
    },
    benefits: [
      {
        title: "Founding Member Pricing",
        description: "Lock in the lowest price forever",
        icon: "Tag",
      },
      {
        title: "Early Access",
        description: "Be the first to try new features",
        icon: "Rocket",
      },
      {
        title: "Shape the Product",
        description: "Your feedback directly influences development",
        icon: "MessageSquare",
      },
    ],
    form: {
      placeholder: "Enter your email",
      buttonText: "Join Waitlist",
      successMessage: "You're on the list! We'll be in touch soon.",
    },
    socialProof: {
      enabled: true,
      count: 2847,
      text: "growth teams already on the waitlist",
    },
  },
};

// Helper function to format price
export function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: siteConfig.pricing.currency,
  }).format(cents / 100);
}

// Helper function to get current year (for copyright)
export function getCurrentYear() {
  return new Date().getFullYear();
}
