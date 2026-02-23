/**
 * AgentLens Theme Configuration
 *
 * Emerald/teal primary with indigo secondary — evokes data, growth, and intelligence.
 */

export const themeColors = {
  primary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
    DEFAULT: "#059669",
  },

  secondary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
    DEFAULT: "#4f46e5",
  },

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

  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
};

export function generateCSSVariables() {
  const vars = {};

  Object.entries(themeColors.primary).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") vars[`--color-primary-${shade}`] = value;
  });
  vars["--color-primary"] = themeColors.primary.DEFAULT;

  Object.entries(themeColors.secondary).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") vars[`--color-secondary-${shade}`] = value;
  });
  vars["--color-secondary"] = themeColors.secondary.DEFAULT;

  Object.entries(themeColors.success).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") vars[`--color-success-${shade}`] = value;
  });
  vars["--color-success"] = themeColors.success.DEFAULT;

  Object.entries(themeColors.warning).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") vars[`--color-warning-${shade}`] = value;
  });
  vars["--color-warning"] = themeColors.warning.DEFAULT;

  Object.entries(themeColors.danger).forEach(([shade, value]) => {
    if (shade !== "DEFAULT") vars[`--color-danger-${shade}`] = value;
  });
  vars["--color-danger"] = themeColors.danger.DEFAULT;

  return vars;
}

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
