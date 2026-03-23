import { useState } from "react";
import { BookOpen, Clock, Shield, Quote, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McButton from "@/components/mindcare/McButton";
import { H1 } from "@/components/mindcare/Typography";
import type { ContentItem } from "@/lib/constants";
import { useEffect } from "react";
import { markContentRead } from "@/lib/readTracker";
import { isFavorite, toggleFavorite } from "@/lib/favoritesTracker";
import { useLanguage } from "@/lib/LanguageContext";

interface ContentReaderScreenProps {
    content: ContentItem | null;
    onBack: () => void;
}

const ContentReaderScreen = ({ content, onBack }: ContentReaderScreenProps) => {
    const { t } = useLanguage();
    const [fav, setFav] = useState(false);

    useEffect(() => {
        if (content) {
            markContentRead(content.id);
            setFav(isFavorite(content.id));
        }
    }, [content]);

    if (!content) return null;

    const handleToggleFav = () => {
        const nowFav = toggleFavorite(content.id);
        setFav(nowFav);
    };

    return (
        <Screen className="bg-card">
            <TopBar
                showBack
                onBack={onBack}
                rightAction={
                    <button
                        onClick={handleToggleFav}
                        className="p-1"
                        aria-label={
                            fav
                                ? t("content.button.remove")
                                : t("content.button.save")
                        }
                    >
                        <Bookmark
                            size={24}
                            className={cn(
                                fav
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground",
                            )}
                        />
                    </button>
                }
            />
            <div className="px-6 py-4">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-background text-muted-foreground text-[12px] font-bold uppercase tracking-wider">
                            {content.type}
                        </span>
                        <span className="text-[13px] text-mc-text-muted flex items-center gap-1">
                            <Clock size={14} /> {content.duration}
                        </span>
                    </div>
                    <H1 className="text-[28px]">{content.title}</H1>

                    {content.type === "Témoignage" &&
                        (content as any).author && (
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-mc-peach/20 flex items-center justify-center font-display font-bold text-foreground text-[15px]">
                                    {(content as any).author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-display font-semibold text-foreground text-[15px]">
                                        {(content as any).author},{" "}
                                        {(content as any).age} ans
                                    </p>
                                    {(content as any).theme && (
                                        <span className="text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                            {(content as any).theme}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                </div>

                <div className="prose prose-lg text-foreground font-body leading-loose whitespace-pre-wrap">
                    {content.content}
                </div>

                {content.type === "Témoignage" && (
                    <div className="mt-6 flex items-center gap-3 p-3 bg-muted/50 rounded-[12px] border border-border">
                        <Shield
                            size={14}
                            className="text-muted-foreground shrink-0"
                        />
                        <p className="text-[11px] text-muted-foreground leading-snug">
                            {t("content.testimonial.consent")}
                        </p>
                    </div>
                )}

                <div className="mt-12 mb-8 space-y-4">
                    <McButton
                        fullWidth
                        onClick={handleToggleFav}
                        variant={fav ? "secondary" : "primary"}
                    >
                        <Bookmark
                            size={18}
                            className={cn("mr-2", fav && "fill-current")}
                        />
                        {fav
                            ? t("content.button.remove")
                            : t("content.button.save")}
                    </McButton>
                    <McButton fullWidth onClick={onBack} variant="secondary">
                        {t("content.button.done")}
                    </McButton>
                </div>
            </div>
        </Screen>
    );
};

export default ContentReaderScreen;
