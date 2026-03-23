import { ChevronRight } from "lucide-react";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McButton from "@/components/mindcare/McButton";
import BrandLogo from "@/components/mindcare/BrandLogo";
import { H2, TextBody } from "@/components/mindcare/Typography";
import { useLanguage } from "@/lib/LanguageContext";

const AboutScreen = ({ onBack }: { onBack: () => void }) => {
    const { t } = useLanguage();

    return (
        <Screen className="bg-card">
            <TopBar title={t("about.title")} showBack onBack={onBack} />
            <div className="px-6 pt-10 pb-6 flex flex-col items-center h-full text-center">
                <BrandLogo size="large" className="mb-6" />
                <H2 className="mb-4">MindCare</H2>
                <TextBody className="text-muted-foreground max-w-xs mb-12">
                    {t("about.description")}
                </TextBody>

                <div className="w-full space-y-3">
                    <div className="flex justify-between py-3 border-b border-muted">
                        <span className="text-muted-foreground">
                            {t("about.version.label")}
                        </span>
                        <span className="text-foreground font-medium">
                            {t("about.version.value")}
                        </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-muted">
                        <span className="text-muted-foreground">
                            {t("about.link.terms")}
                        </span>
                        <ChevronRight
                            size={16}
                            className="text-mc-text-muted"
                        />
                    </div>
                    <div className="flex justify-between py-3 border-b border-muted">
                        <span className="text-muted-foreground">
                            {t("about.link.legal")}
                        </span>
                        <ChevronRight
                            size={16}
                            className="text-mc-text-muted"
                        />
                    </div>
                </div>

                <div className="mt-auto w-full">
                    <McButton fullWidth variant="secondary">
                        {t("about.button.contact")}
                    </McButton>
                    <p className="text-[11px] text-mc-text-muted mt-4">
                        {t("about.credit")}
                    </p>
                </div>
            </div>
        </Screen>
    );
};

export default AboutScreen;
