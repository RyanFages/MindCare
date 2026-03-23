import { Shield, Lock, X } from "lucide-react";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McButton from "@/components/mindcare/McButton";
import { useLanguage } from "@/lib/LanguageContext";

const PrivacyScreen = ({ onBack }: { onBack: () => void }) => {
    const { t } = useLanguage();

    return (
        <Screen className="bg-card">
            <TopBar title={t("privacy.title")} showBack onBack={onBack} />
            <div className="px-6 pt-4 pb-6 flex flex-col h-full overflow-y-auto">
                <div className="space-y-4 mb-8">
                    <div className="bg-background p-5 rounded-[16px] border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield size={20} className="text-primary" />
                            <h3 className="font-bold text-foreground">
                                {t("privacy.section1.title")}
                            </h3>
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {t("privacy.section1.description")}
                        </p>
                    </div>
                    <div className="bg-background p-5 rounded-[16px] border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <Lock size={20} className="text-accent" />
                            <h3 className="font-bold text-foreground">
                                {t("privacy.section2.title")}
                            </h3>
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {t("privacy.section2.description")}
                        </p>
                    </div>
                    <div className="bg-background p-5 rounded-[16px] border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <X size={20} className="text-mc-purple" />
                            <h3 className="font-bold text-foreground">
                                {t("privacy.section3.title")}
                            </h3>
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {t("privacy.section3.description")}
                        </p>
                    </div>
                </div>
                <div className="mt-auto pb-6 space-y-3">
                    <McButton fullWidth variant="secondary">
                        {t("privacy.button.policy")}
                    </McButton>
                    <McButton
                        fullWidth
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/5"
                    >
                        {t("privacy.button.delete")}
                    </McButton>
                </div>
            </div>
        </Screen>
    );
};

export default PrivacyScreen;
