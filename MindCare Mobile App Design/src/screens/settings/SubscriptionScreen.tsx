import { CheckCircle } from "lucide-react";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McCard from "@/components/mindcare/McCard";
import McButton from "@/components/mindcare/McButton";
import { H1, TextBody } from "@/components/mindcare/Typography";
import { useLanguage } from "@/lib/LanguageContext";

const SubscriptionScreen = ({ onBack }: { onBack: () => void }) => {
    const { t } = useLanguage();

    return (
        <Screen className="bg-card">
            <TopBar title={t("subscription.title")} showBack onBack={onBack} />
            <div className="px-6 pt-4 pb-6 flex flex-col h-full overflow-y-auto">
                <div className="text-center mb-8">
                    <span className="bg-border text-muted-foreground px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
                        {t("subscription.current")}
                    </span>
                    <H1 className="mt-4 mb-2">{t("subscription.plan.free")}</H1>
                    <TextBody className="text-muted-foreground">
                        {t("subscription.plan.free.subtitle")}
                    </TextBody>
                </div>

                <McCard className="p-0 mb-8 overflow-hidden border border-border">
                    <div className="p-4 bg-background border-b border-border flex justify-between items-center">
                        <span className="font-bold text-foreground">
                            {t("subscription.table.features")}
                        </span>
                        <div className="flex gap-8 text-[13px] font-bold">
                            <span className="text-muted-foreground">
                                {t("subscription.table.free")}
                            </span>
                            <span className="text-primary">
                                {t("subscription.table.premium")}
                            </span>
                        </div>
                    </div>
                    {[
                        {
                            labelKey: "subscription.feature.daily-checkin",
                            free: true,
                            prem: true,
                        },
                        {
                            labelKey: "subscription.feature.content",
                            free: true,
                            prem: true,
                        },
                        {
                            labelKey: "subscription.feature.stats",
                            free: false,
                            prem: true,
                        },
                        {
                            labelKey: "subscription.feature.guided",
                            free: false,
                            prem: true,
                        },
                        {
                            labelKey: "subscription.feature.journal",
                            free: false,
                            prem: true,
                        },
                    ].map((row, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-4 border-b border-border last:border-0 text-[14px]"
                        >
                            <span className="text-foreground font-medium">
                                {t(row.labelKey)}
                            </span>
                            <div className="flex gap-12 pr-2">
                                {row.free ? (
                                    <CheckCircle
                                        size={16}
                                        className="text-foreground"
                                    />
                                ) : (
                                    <span className="w-4" />
                                )}
                                {row.prem ? (
                                    <CheckCircle
                                        size={16}
                                        className="text-primary"
                                    />
                                ) : (
                                    <span className="w-4" />
                                )}
                            </div>
                        </div>
                    ))}
                </McCard>

                <div className="mt-auto pb-6">
                    <div className="bg-primary/10 p-4 rounded-[16px] text-center mb-4">
                        <p className="text-primary font-bold text-[18px]">
                            {t("subscription.price")}
                        </p>
                        <p className="text-[12px] text-muted-foreground mt-1">
                            {t("subscription.price-note")}
                        </p>
                    </div>
                    <McButton
                        fullWidth
                        variant="primary"
                        className="bg-primary text-primary-foreground"
                    >
                        {t("subscription.button.upgrade")}
                    </McButton>
                </div>
            </div>
        </Screen>
    );
};

export default SubscriptionScreen;
