import { fr } from "./fr";
import { en } from "./en";
import { es } from "./es";

export const translations = {
    fr,
    en,
    es,
} as const;

export type TranslationKey = keyof typeof fr;
