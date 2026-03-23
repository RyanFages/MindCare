import {
    Smile,
    AlertCircle,
    HeartHandshake,
    BookOpen,
    Wind,
    Phone,
    Sparkles,
    Moon,
    Brain,
    Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Screen from "@/components/mindcare/Screen";
import McButton from "@/components/mindcare/McButton";
import McCard from "@/components/mindcare/McCard";
import { H1, H2, TextBody } from "@/components/mindcare/Typography";
import { useLanguage } from "@/lib/LanguageContext";

type ResultType = "balanced" | "watch" | "support";

interface ResultScreenProps {
    type: ResultType;
    concerns?: string[];
    onNavigate: (screen: string) => void;
}

interface Recommendation {
    icon: typeof Smile;
    title: string;
    subtitle: string;
    color: string;
    iconColor: string;
    target: string;
}

const ResultScreen = ({
    type,
    concerns = [],
    onNavigate,
}: ResultScreenProps) => {
    const { t } = useLanguage();

    const profiles: Record<
        ResultType,
        {
            icon: typeof Smile;
            title: string;
            color: string;
            bgColor: string;
            iconColor: string;
            description: string;
        }
    > = {
        balanced: {
            icon: Smile,
            title: t("result.balanced.title"),
            color: "bg-primary/15",
            bgColor: "border-primary/20",
            iconColor: "text-primary",
            description: t("result.balanced.description"),
        },
        watch: {
            icon: AlertCircle,
            title: t("result.watch.title"),
            color: "bg-mc-peach/20",
            bgColor: "border-mc-peach/30",
            iconColor: "text-foreground",
            description: t("result.watch.description"),
        },
        support: {
            icon: HeartHandshake,
            title: t("result.support.title"),
            color: "bg-accent/15",
            bgColor: "border-accent/20",
            iconColor: "text-accent",
            description: t("result.support.description"),
        },
    };

    const getRecommendations = (): Recommendation[] => {
        const recs: Recommendation[] = [];

        // Always recommend breathing for watch/support
        if (type === "watch" || type === "support") {
            recs.push({
                icon: Wind,
                title: t("result.recommendation.breathing"),
                subtitle: t("result.recommendation.breathing.desc"),
                color: "bg-primary/10",
                iconColor: "text-primary",
                target: "breathing-exercise",
            });
        }

        // Concern-based recommendations
        const hasConcern = (id: string) => concerns.includes(id);

        if (hasConcern("work")) {
            recs.push({
                icon: Brain,
                title: t("result.recommendation.fatigue"),
                subtitle: t("result.recommendation.fatigue.desc"),
                color: "bg-mc-blue-light/30",
                iconColor: "text-foreground",
                target: "learn",
            });
        }

        if (hasConcern("health") || hasConcern("family")) {
            recs.push({
                icon: Heart,
                title: t("result.recommendation.testimonials"),
                subtitle: t("result.recommendation.testimonials.desc"),
                color: "bg-mc-peach/20",
                iconColor: "text-foreground",
                target: "learn",
            });
        }

        if (hasConcern("future")) {
            recs.push({
                icon: Sparkles,
                title: t("result.recommendation.anxiety"),
                subtitle: t("result.recommendation.anxiety.desc"),
                color: "bg-accent/10",
                iconColor: "text-accent",
                target: "learn",
            });
        }

        // Support-level: always suggest talking to someone
        if (type === "support") {
            recs.push({
                icon: Phone,
                title: t("result.recommendation.talk"),
                subtitle: t("result.recommendation.talk.desc"),
                color: "bg-accent/15",
                iconColor: "text-accent",
                target: "help",
            });
        }

        // Balanced: exploration content
        if (type === "balanced") {
            recs.push({
                icon: BookOpen,
                title: t("result.recommendation.explore"),
                subtitle: t("result.recommendation.explore.desc"),
                color: "bg-primary/10",
                iconColor: "text-primary",
                target: "learn",
            });
            recs.push({
                icon: Wind,
                title: t("result.recommendation.relaxation"),
                subtitle: t("result.recommendation.relaxation.desc"),
                color: "bg-secondary/30",
                iconColor: "text-foreground",
                target: "breathing-exercise",
            });
        }

        // Watch: suggest nightline
        if (type === "watch") {
            recs.push({
                icon: Moon,
                title: t("result.recommendation.nightline"),
                subtitle: t("result.recommendation.nightline.desc"),
                color: "bg-mc-purple/20",
                iconColor: "text-foreground",
                target: "help",
            });
        }

        return recs.slice(0, 3);
    };

    const profile = profiles[type];
    const Icon = profile.icon;
    const recommendations = getRecommendations();

    return (
        <Screen className="bg-card">
            <div className="min-h-full flex flex-col p-8">
                {/* Profile result */}
                <div className="flex flex-col items-center text-center pt-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "w-24 h-24 rounded-full flex items-center justify-center mb-6",
                            profile.color,
                        )}
                    >
                        <Icon size={40} className={profile.iconColor} />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <H1 className="mb-3 text-[24px]">{profile.title}</H1>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className={cn(
                            "rounded-2xl border p-4 mb-8 max-w-sm mx-auto",
                            profile.bgColor,
                            "bg-background",
                        )}
                    >
                        <TextBody className="text-muted-foreground leading-relaxed text-[14px]">
                            {profile.description}
                        </TextBody>
                    </motion.div>
                </div>

                {/* Personalized recommendations */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="space-y-3 mb-8"
                >
                    <H2 className="text-[17px] text-muted-foreground mb-2">
                        {t("result.resources")}
                    </H2>
                    {recommendations.map((rec, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                        >
                            <McCard
                                className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                                onClick={() => onNavigate(rec.target)}
                            >
                                <div
                                    className={cn(
                                        "w-11 h-11 rounded-full flex items-center justify-center shrink-0",
                                        rec.color,
                                    )}
                                >
                                    <rec.icon
                                        size={20}
                                        className={rec.iconColor}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-display font-medium text-foreground text-[15px]">
                                        {rec.title}
                                    </p>
                                    <p className="font-body text-[13px] text-muted-foreground mt-0.5">
                                        {rec.subtitle}
                                    </p>
                                </div>
                            </McCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-auto space-y-3"
                >
                    <McButton
                        onClick={() => onNavigate("home")}
                        fullWidth
                        variant="ghost"
                    >
                        Retour à l'accueil
                    </McButton>
                </motion.div>

                <p className="text-[12px] text-muted-foreground/70 mt-6 text-center max-w-xs mx-auto italic">
                    ⚠️ Ce résultat ne constitue pas un diagnostic médical. En
                    cas de détresse, contactez un professionnel de santé.
                </p>
            </div>
        </Screen>
    );
};

export default ResultScreen;
