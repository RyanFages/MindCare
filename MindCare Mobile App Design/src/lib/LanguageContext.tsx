import { createContext, useContext, useState, ReactNode } from "react";
import { translations, type TranslationKey } from "./translations";

export type Language = "fr" | "en" | "es" | "de" | "it" | "pt" | "ja" | "zh";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "fr",
    setLanguage: () => {},
    t: (key: TranslationKey) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Récupérer la langue sauvegardée ou détecter celle du navigateur
        const saved = localStorage.getItem("mindcare_language") as Language;
        if (saved) return saved;

        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "en") return "en";
        if (browserLang === "es") return "es";
        if (browserLang === "de") return "de";
        if (browserLang === "it") return "it";
        if (browserLang === "pt") return "pt";
        if (browserLang === "ja") return "ja";
        if (browserLang === "zh") return "zh";
        return "fr"; // Default
    });

    const setLanguage = (lang: Language) => {
        localStorage.setItem("mindcare_language", lang);
        setLanguageState(lang);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
