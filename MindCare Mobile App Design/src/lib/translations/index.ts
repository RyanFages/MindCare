import { fr } from "./fr";
import { en } from "./en";
import { es } from "./es";
import { de } from "./de";
import { it } from "./it";
import { pt } from "./pt";
import { ja } from "./ja";
import { zh } from "./zh";

export const translations = {
    fr,
    en,
    es,
    de,
    it,
    pt,
    ja,
    zh,
} as const;

export type TranslationKey = keyof typeof fr;
