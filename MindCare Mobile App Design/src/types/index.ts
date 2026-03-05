/**
 * Type Definitions for MindCare App
 */

export type ScreenType =
    | "home"
    | "checkin"
    | "result"
    | "learn"
    | "content"
    | "help"
    | "help-detail"
    | "settings";
export type ResultType = "good" | "support";
export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface CheckinResult {
    energy: number;
    concerns: string[];
    mood: string | null;
    isSupport: boolean;
}

export interface NavigationProps {
    onNavigate: (screen: ScreenType) => void;
    onBack?: () => void;
}

export interface ContentItem {
    id: string;
    section: "understand" | "testimonials" | "practice";
    type: "Article" | "Témoignage" | "Audio";
    title: string;
    duration: string;
    tags: string[];
    isRead: boolean;
    content: string;
}

export interface HelpResource {
    id: string;
    category: "immediate" | "student";
    name: string;
    shortDesc: string;
    fullDesc: string;
    hours: string;
    fullHours: string;
    badges: string[];
    whenToContact: string;
    phone: string | null;
    website: string;
}
