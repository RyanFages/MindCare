/**
 * Top Navigation Bar
 * Header with back button, title, and right action slot
 */

import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";

interface TopBarProps {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

export const TopBar = ({
    title,
    showBack,
    onBack,
    rightAction,
}: TopBarProps) => (
    <div
        className={cn(
            "h-[60px] flex items-center justify-between px-4 sticky top-0 z-40 shrink-0",
            `bg-[${COLORS.bg}]`,
        )}
    >
        <div className="w-10 flex justify-start">
            {showBack && (
                <button
                    onClick={onBack}
                    className={cn(
                        "p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors",
                        `text-[${COLORS.textPrimary}]`,
                    )}
                >
                    <ChevronLeft size={24} />
                </button>
            )}
        </div>

        <div
            className={cn(
                "font-['Manrope'] font-medium text-[16px]",
                `text-[${COLORS.textPrimary}]`,
            )}
        >
            {title}
        </div>

        <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
);
