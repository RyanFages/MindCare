/**
 * Theme Colors and Design System
 * Centralized color palette for the MindCare app
 */

export const COLORS = {
    bg: "#F8F9F7",
    surface: "#FFFFFF",
    textPrimary: "#1F1F1F", // Dark Gray (No pure black)
    textSecondary: "#5F6368",
    textMuted: "#9AA0A6",
    border: "#E6E7E3",
    brand: {
        greenPrimary: "#7EA38B",
        greenSecondary: "#A5C8B2",
        blueMain: "#6B9BB8",
        blueLight: "#9EB7C4",
        purpleSoft: "#B9A7BB",
        peachCTA: "#F2B9A0",
    },
};

/**
 * Logo asset - local image from assets folder
 */
export const logoAsset = "/src/assets/logo.png";

/**
 * Font families used throughout the app
 */
export const FONTS = {
    heading: "Manrope",
    body: "Inter",
};

/**
 * Typography sizes (Tailwind classes)
 */
export const TYPOGRAPHY = {
    h1: "font-normal text-[36px] leading-tight",
    h2: "font-medium text-[24px] leading-snug",
    bodyLarge: "font-normal text-[16px] leading-relaxed",
    body: "font-normal text-[14px] leading-relaxed",
    small: "font-normal text-[12px] leading-snug",
    tiny: "font-normal text-[10px] leading-tight",
};
