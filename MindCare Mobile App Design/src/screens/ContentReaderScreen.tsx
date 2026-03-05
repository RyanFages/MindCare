/**
 * Content Reader Screen
 * Display full content of an article
 */

import React from "react";
import { BookOpen, Clock } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { TopBar } from "../components/layout/TopBar";
import { H1, Button } from "../components/primitives";
import type { ContentItem } from "../types";

interface ContentReaderScreenProps {
    content: ContentItem | null;
    onBack: () => void;
}

export const ContentReaderScreen = ({
    content,
    onBack,
}: ContentReaderScreenProps) => {
    if (!content) return null;

    return (
        <Screen className="bg-white">
            <TopBar
                showBack
                onBack={onBack}
                rightAction={
                    <button className="text-[#9AA0A6]">
                        <BookOpen size={24} />
                    </button>
                }
            />

            <div className="px-6 py-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#F8F9F7] text-[#5F6368] text-[12px] font-bold uppercase tracking-wider">
                            {content.type}
                        </span>
                        <span className="text-[13px] text-[#9AA0A6] flex items-center gap-1">
                            <Clock size={14} /> {content.duration}
                        </span>
                    </div>
                    <H1 className="text-[28px]">{content.title}</H1>
                </div>

                {/* Content */}
                <div className="prose prose-lg text-[#1F1F1F] font-['Inter'] leading-loose whitespace-pre-wrap">
                    {content.content}
                </div>

                {/* Actions */}
                <div className="mt-12 mb-8 space-y-4">
                    <Button
                        fullWidth
                        variant="primary"
                        onClick={onBack}
                        className="bg-[#F2B9A0]"
                    >
                        J'ai terminé
                    </Button>
                    <Button fullWidth variant="secondary" onClick={onBack}>
                        Enregistrer pour plus tard
                    </Button>
                </div>
            </div>
        </Screen>
    );
};
