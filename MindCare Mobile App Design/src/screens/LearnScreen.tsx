/**
 * Learn Screen
 * Educational content with filtering by tags
 */

import React, { useState } from "react";
import { PlayCircle, Heart } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { BottomBar } from "../components/layout/BottomBar";
import { H1, H2, TextBody, Chip, Card } from "../components/primitives";
import { ArticleItem } from "../components/common/ArticleItem";
import { CONTENT_DATA } from "../constants/content";
import type { ScreenType, ContentItem } from "../types";

interface LearnScreenProps {
    onNavigate: (screen: ScreenType) => void;
    onOpenContent: (content: ContentItem) => void;
}

const FILTERS = ["Tout", "Stress", "Fatigue", "Anxiété", "Isolement"];

export const LearnScreen = ({
    onNavigate,
    onOpenContent,
}: LearnScreenProps) => {
    const [filter, setFilter] = useState("Tout");

    // Filter content based on selected filter
    const filteredContent = CONTENT_DATA.filter((item) => {
        if (filter === "Tout") return true;
        return item.tags.some((tag) =>
            tag.toLowerCase().includes(filter.toLowerCase()),
        );
    });

    // Group by sections
    const sections = {
        understand: filteredContent.filter((i) => i.section === "understand"),
        testimonials: filteredContent.filter(
            (i) => i.section === "testimonials",
        ),
        practice: filteredContent.filter((i) => i.section === "practice"),
    };

    return (
        <Screen
            bottomBar={<BottomBar activeTab="learn" onNavigate={onNavigate} />}
        >
            <div className="pt-2 pb-8">
                {/* Header */}
                <div className="px-4 mb-4 mt-4">
                    <H1 className="mb-2">Comprendre</H1>
                    <TextBody className="text-[#5F6368]">
                        Des ressources pour mieux te comprendre, à ton rythme.
                    </TextBody>
                </div>

                {/* Contextual State Block */}
                {filter === "Tout" && (
                    <div className="px-4 mb-6">
                        <div className="bg-[#A5C8B2]/20 border border-[#A5C8B2]/30 p-4 rounded-[16px]">
                            <p className="text-[14px] text-[#1F1F1F] leading-relaxed">
                                <span className="font-semibold">
                                    État du moment :
                                </span>{" "}
                                Explore nos contenus à ton rythme pour mieux
                                comprendre ce que tu ressens.
                            </p>
                        </div>
                    </div>
                )}

                {/* Sticky Filters */}
                <div className="sticky top-0 bg-[#F8F9F7] z-30 py-3 px-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#E6E7E3]/50 mb-4">
                    {FILTERS.map((f) => (
                        <Chip
                            key={f}
                            label={f}
                            active={filter === f}
                            onClick={() => setFilter(f)}
                        />
                    ))}
                </div>

                <div className="px-4 pb-4 space-y-8">
                    {/* Section 1: Understand */}
                    {sections.understand.length > 0 && (
                        <section>
                            <H2 className="text-[18px] mb-3">
                                Comprendre ce que tu ressens
                            </H2>
                            {sections.understand.map((item) => (
                                <ArticleItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => onOpenContent(item)}
                                />
                            ))}

                            <Card className="bg-white p-4 rounded-[16px] border border-[#E6E7E3] mt-2">
                                <p className="text-[14px] text-[#5F6368] italic">
                                    "Mettre des mots sur ce que tu ressens est
                                    souvent la première étape pour aller mieux."
                                </p>
                            </Card>
                        </section>
                    )}

                    {/* Section 2: Testimonials */}
                    {sections.testimonials.length > 0 && (
                        <section>
                            <H2 className="text-[18px] mb-3">
                                D'autres vivent la même chose
                            </H2>
                            {sections.testimonials.map((item) => (
                                <ArticleItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => onOpenContent(item)}
                                />
                            ))}

                            <div className="mt-2 flex items-center gap-3 p-3 bg-[#6B9BB8]/10 rounded-[12px]">
                                <Heart size={20} className="text-[#6B9BB8]" />
                                <p className="text-[13px] text-[#1F1F1F]">
                                    Tu n'es pas seul·e. Beaucoup traversent des
                                    moments similaires.
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Section 3: Practice */}
                    {sections.practice.length > 0 && (
                        <section>
                            <H2 className="text-[18px] mb-3">
                                Prendre un temps pour soi
                            </H2>
                            {sections.practice.map((item) => (
                                <ArticleItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => onOpenContent(item)}
                                />
                            ))}

                            {/* Mini Breathing Card */}
                            {["Tout", "Stress", "Anxiété"].includes(filter) && (
                                <div className="bg-[#1F1F1F] rounded-[20px] p-5 text-white mt-3 relative overflow-hidden">
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-[16px] mb-1">
                                                Respiration rapide
                                            </h3>
                                            <p className="text-white/70 text-[13px]">
                                                3 étapes pour calmer le jeu
                                            </p>
                                        </div>
                                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1F1F1F]">
                                            <PlayCircle size={20} />
                                        </button>
                                    </div>
                                    <div className="flex gap-2 mt-4 text-[12px] font-medium text-white/60">
                                        <span className="px-3 py-1 bg-white/10 rounded-full">
                                            Inspirer
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full">
                                            Bloquer
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full">
                                            Expirer
                                        </span>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Footer Note */}
                    <div className="pt-4 pb-8 text-center px-4">
                        <p className="text-[11px] text-[#9AA0A6]">
                            Ces contenus sont conçus avec des professionnels de
                            la santé mentale. Ils ne remplacent pas un suivi
                            médical.
                        </p>
                    </div>
                </div>
            </div>
        </Screen>
    );
};
