/**
 * Article Item Component
 * Reusable component for displaying articles in lists
 */

import React from "react";
import { BookOpen, Volume2, Clock, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import type { ContentItem } from "../../types";

interface ArticleItemProps {
    item: ContentItem;
    onClick?: () => void;
}

export const ArticleItem = ({ item, onClick }: ArticleItemProps) => {
    const isAudio = item.type === "Audio";
    const Icon = isAudio ? Volume2 : BookOpen;

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white rounded-[12px] p-4 gap-4 mb-3 flex items-start transition-all",
                onClick &&
                    "cursor-pointer active:scale-[0.99] hover:bg-gray-50",
            )}
        >
            <div
                className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    isAudio
                        ? "bg-[#B9A7BB]/20 text-[#B9A7BB]"
                        : "bg-[#9EB7C4]/20 text-[#6B9BB8]",
                )}
            >
                <Icon size={20} />
            </div>

            <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#9AA0A6] tracking-wide">
                        {item.type}
                    </span>
                    {item.isRead && (
                        <span className="text-[10px] text-[#7EA38B] bg-[#7EA38B]/10 px-2 py-0.5 rounded-full">
                            Lu
                        </span>
                    )}
                </div>
                <h3 className="font-['Manrope'] font-medium text-[#1F1F1F] text-[15px] leading-tight mb-1">
                    {item.title}
                </h3>
                <span className="text-[12px] text-[#5F6368] flex items-center gap-1">
                    <Clock size={12} /> {item.duration}
                </span>
            </div>

            {onClick && <ChevronRight size={20} className="text-[#9AA0A6]" />}
        </div>
    );
};
