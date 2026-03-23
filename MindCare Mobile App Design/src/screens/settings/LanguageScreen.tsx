import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/lib/LanguageContext";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";

const LanguageScreen = ({ onBack }: { onBack: () => void }) => {
    const { language, setLanguage, t } = useLanguage();

    const RadioOption = ({
        id,
        label,
        flag,
    }: {
        id: Language;
        label: string;
        flag: string;
    }) => (
        <button
            onClick={() => setLanguage(id)}
            className="w-full flex items-center justify-between p-4 bg-card border-b border-border last:border-0 first:rounded-t-[16px] last:rounded-b-[16px]"
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{flag}</span>
                <span className="font-medium text-foreground">{label}</span>
            </div>
            <div
                className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    language === id ? "border-primary" : "border-border",
                )}
            >
                {language === id && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                )}
            </div>
        </button>
    );

    return (
        <Screen>
            <TopBar title={t("language.title")} showBack onBack={onBack} />
            <div className="px-6 pt-6">
                <div className="border border-border rounded-[16px] bg-card shadow-sm">
                    <RadioOption
                        id="fr"
                        label={t("language.french")}
                        flag="🇫🇷"
                    />
                    <RadioOption
                        id="en"
                        label={t("language.english")}
                        flag="🇬🇧"
                    />
                    <RadioOption
                        id="es"
                        label={t("language.spanish")}
                        flag="🇪🇸"
                    />
                    <RadioOption
                        id="de"
                        label={t("language.german")}
                        flag="🇩🇪"
                    />
                    <RadioOption
                        id="it"
                        label={t("language.italian")}
                        flag="🇮🇹"
                    />
                    <RadioOption
                        id="pt"
                        label={t("language.portuguese")}
                        flag="🇵🇹"
                    />
                    <RadioOption
                        id="ja"
                        label={t("language.japanese")}
                        flag="🇯🇵"
                    />
                    <RadioOption
                        id="zh"
                        label={t("language.chinese")}
                        flag="🇨🇳"
                    />
                </div>
                <p className="text-center text-[13px] text-mc-text-muted mt-4">
                    {t("language.subtitle")}
                </p>
            </div>
        </Screen>
    );
};

export default LanguageScreen;
