/**
 * Theme Configuration
 *
 * This is the central place to define your app's colors.
 * Change these values and they will be applied across:
 * - CSS variables (for custom styling)
 * - Tailwind utilities (primary-500, secondary-600, etc.)
 * - HeroUI components (buttons, inputs, etc.)
 *
 * COLOR PALETTE GENERATOR:
 * Use https://uicolors.app/create to generate a full palette from a single color
 */

export const themeColors = {
  // ============================================
  // PRIMARY COLOR - Your main brand color
  // Used for: buttons, links, active states
  // ============================================
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",   // Base color
    600: "#2563eb",   // Default/main
    700: "#1d4ed8",   // Hover states
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
    DEFAULT: "#2563eb", // Maps to "primary" without shade
  },

  // ============================================
  // SECONDARY COLOR - Accent/gradient color
  // Used for: gradients, badges, secondary actions
  // ============================================
  secondary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",   // Base color
    600: "#4f46e5",   // Default/main
    700: "#4338ca",   // Hover states
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
    DEFAULT: "#4f46e5",
  },

  // ============================================
  // SUCCESS COLOR - Positive actions/states
  // ============================================
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    DEFAULT: "#22c55e",
  },

  // ============================================
  // WARNING COLOR - Caution states
  // ============================================
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    DEFAULT: "#f59e0b",
  },

  // ============================================
  // DANGER COLOR - Error/destructive states
  // ============================================
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    DEFAULT: "#ef4444",
  },

  // ============================================
  // NEUTRAL COLORS - Grays for text, borders, etc.
  // ============================================
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
};

// ============================================
// THEME PRESETS - Quick color scheme options
// Uncomment one to use, or create your own
// ============================================

// Blue theme (default)
// Already set above

// Purple theme
// export const themeColors = { primary: { ... purple shades }, secondary: { ... pink shades } }

// Green theme
// export const themeColors = { primary: { ... emerald shades }, secondary: { ... teal shades } }

// Orange theme
// export const themeColors = { primary: { ... orange shades }, secondary: { ... amber shades } }

/**
 * Generate CSS variables object for the theme
 * This is used by the ThemeProvider to inject CSS variables
 */
export function generateCSSVariables() {
  const vars = {};

  // Add primary colors
  Object.entries(themeColors.primary).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") {
      vars[`--color-primary-${shade}`] = value;
    }
  });
  vars["--color-primary"] = themeColors.primary.DEFAULT;

  // Add secondary colors
  Object.entries(themeColors.secondary).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") {
      vars[`--color-secondary-${shade}`] = value;
    }
  });
  vars["--color-secondary"] = themeColors.secondary.DEFAULT;

  // Add success colors
  Object.entries(themeColors.success).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") {
      vars[`--color-success-${shade}`] = value;
    }
  });
  vars["--color-success"] = themeColors.success.DEFAULT;

  // Add warning colors
  Object.entries(themeColors.warning).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") {
      vars[`--color-warning-${shade}`] = value;
    }
  });
  vars["--color-warning"] = themeColors.warning.DEFAULT;

  // Add danger colors
  Object.entries(themeColors.danger).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") {
      vars[`--color-danger-${shade}`] = value;
    }
  });
  vars["--color-danger"] = themeColors.danger.DEFAULT;

  return vars;
}

/**
 * HeroUI theme configuration
 * This maps our theme colors to HeroUI's theme system
 */
export const heroUITheme = {
  themes: {
    light: {
      colors: {
        primary: {
          50: themeColors.primary[50],
          100: themeColors.primary[100],
          200: themeColors.primary[200],
          300: themeColors.primary[300],
          400: themeColors.primary[400],
          500: themeColors.primary[500],
          600: themeColors.primary[600],
          700: themeColors.primary[700],
          800: themeColors.primary[800],
          900: themeColors.primary[900],
          DEFAULT: themeColors.primary.DEFAULT,
          foreground: "#ffffff",
        },
        secondary: {
          50: themeColors.secondary[50],
          100: themeColors.secondary[100],
          200: themeColors.secondary[200],
          300: themeColors.secondary[300],
          400: themeColors.secondary[400],
          500: themeColors.secondary[500],
          600: themeColors.secondary[600],
          700: themeColors.secondary[700],
          800: themeColors.secondary[800],
          900: themeColors.secondary[900],
          DEFAULT: themeColors.secondary.DEFAULT,
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: themeColors.success.DEFAULT,
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: themeColors.warning.DEFAULT,
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: themeColors.danger.DEFAULT,
          foreground: "#ffffff",
        },
      },
    },
  },
};
