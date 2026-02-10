/**
 * Site Configuration
 *
 * This is the central configuration file for your SaaS application.
 * Update these values to customize your app's branding, colors, and content.
 *
 * After updating this file, your changes will be reflected across:
 * - Navbar and Footer
 * - SEO metadata
 * - Legal pages
 * - Email references
 *
 * For theme colors, see: src/config/theme.config.js
 */

export const siteConfig = {
  // ============================================
  // LANDING PAGE MODE
  // ============================================
  // Options: "default" | "waitlist"
  // Switch to "waitlist" to show the waitlist/early bird landing page
  landingMode: "default",

  // ============================================
  // CORE BRANDING - Update these first!
  // ============================================
  name: "Your App Name",
  tagline: "Your catchy tagline here",
  description: "A comprehensive description of your SaaS app for SEO purposes. Describe what your app does and who it's for.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // ============================================
  // VISUAL IDENTITY
  // ============================================
  logo: {
    path: "/logo.png",      // Path to your logo in /public folder
    emoji: "🚀",            // Emoji displayed next to app name (optional)
    width: 40,
    height: 40,
  },

  // ============================================
  // CONTACT EMAILS
  // ============================================
  emails: {
    support: "support@yourapp.com",
    legal: "legal@yourapp.com",
    contact: "contact@yourapp.com",
    privacy: "privacy@yourapp.com",
  },

  // ============================================
  // SOCIAL LINKS (set to null if not used)
  // ============================================
  social: {
    twitter: "https://twitter.com/yourapp",
    instagram: "https://instagram.com/yourapp",
    youtube: null,
    linkedin: null,
    github: null,
  },

  // ============================================
  // LEGAL INFORMATION
  // ============================================
  legal: {
    companyName: "Your Company LLC",
    jurisdiction: "Delaware, USA",
    effectiveDate: "January 1, 2025",
    maxLiability: "$100",
  },

  // ============================================
  // NAVIGATION LINKS
  // ============================================
  nav: {
    main: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
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
    "saas",
    "app",
    "your-keyword-1",
    "your-keyword-2",
    "your-keyword-3",
  ],

  // ============================================
  // PRICING CONFIGURATION
  // ============================================
  pricing: {
    currency: "USD",
    // Price in cents (1999 = $19.99)
    proPrice: parseInt(process.env.NEXT_PUBLIC_PRO_PRICE) || 1999,
    // Stripe Price ID (set in .env.local)
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    plans: [
      {
        name: "Free",
        price: 0,
        description: "Get started with basic features",
        features: [
          "1 project",
          "Basic features",
          "Community support",
        ],
        cta: "Get Started",
        highlighted: false,
      },
      {
        name: "Pro",
        price: 19.99,
        description: "Everything you need to scale",
        features: [
          "Unlimited projects",
          "All features",
          "Priority support",
          "API access",
        ],
        cta: "Upgrade to Pro",
        highlighted: true,
      },
    ],
  },

  // ============================================
  // UPGRADE MODAL FEATURES
  // ============================================
  upgradeFeatures: [
    {
      title: "Unlimited Access",
      description: "No limits on usage or projects",
    },
    {
      title: "Priority Support",
      description: "Get help when you need it most",
    },
    {
      title: "Advanced Features",
      description: "Access to all premium functionality",
    },
    {
      title: "Export & Download",
      description: "Download your data anytime",
    },
  ],

  // ============================================
  // LANDING PAGE CONTENT
  // ============================================
  landing: {
    hero: {
      title: "Your Powerful Headline Here",
      subtitle: "A compelling subtitle that explains your value proposition in one sentence.",
      cta: "Get Started Free",
      secondaryCta: "Learn More",
    },
    features: [
      {
        title: "Feature One",
        description: "Describe your first key feature and its benefits.",
        icon: "Zap", // Lucide icon name
      },
      {
        title: "Feature Two",
        description: "Describe your second key feature and its benefits.",
        icon: "Shield",
      },
      {
        title: "Feature Three",
        description: "Describe your third key feature and its benefits.",
        icon: "Sparkles",
      },
    ],
  },

  // ============================================
  // WAITLIST / EARLY BIRD CONFIGURATION
  // ============================================
  // Used when landingMode is set to "waitlist"
  waitlist: {
    hero: {
      title: "Be First in Line",
      subtitle: "Join our exclusive early access waitlist and get special founding member pricing.",
      badge: "Coming Soon",
    },
    earlyBird: {
      enabled: true,
      title: "Early Bird Offer",
      description: "Sign up now and lock in our special founding member rate",
      originalPrice: 29.99,
      discountedPrice: 14.99,
      discountLabel: "50% OFF",
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
      count: 1247,
      text: "people already on the waitlist",
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
