/**
 * Bottom Navigation Bar
 * Tab navigation for main screens (Home, Learn, Help, Settings)
 */

import React from "react";
import { Home, BookOpen, HeartHandshake, Settings } from "lucide-react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";
import type { ScreenType } from "../../types";

type TabId = "home" | "learn" | "help" | "settings";

interface Tab {
    id: TabId;
    label: string;
    icon: React.ComponentType<{ size: number; strokeWidth: number }>;
}

interface BottomBarProps {
    activeTab: TabId;
    onNavigate: (tab: ScreenType) => void;
}

const TABS: Tab[] = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "learn", label: "Comprendre", icon: BookOpen },
    { id: "help", label: "Aide", icon: HeartHandshake },
    { id: "settings", label: "Réglages", icon: Settings },
];

export const BottomBar = ({ activeTab, onNavigate }: BottomBarProps) => (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] px-6 flex justify-between items-center z-50 bg-white border-t border-[#E6E7E3]">
        {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
                <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.id as ScreenType)}
                    className="flex flex-col items-center justify-center gap-0.5 w-16 h-full py-1 transition-colors"
                >
                    <div
                        className={cn(
                            "flex items-center justify-center transition-colors",
                            isActive ? "text-[#7EA38B]" : "text-[#9AA0A6]",
                        )}
                    >
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span
                        className={cn(
                            "text-[11px] font-semibold font-['Inter'] transition-colors whitespace-nowrap",
                            isActive ? "text-[#1F1F1F]" : "text-[#9AA0A6]",
                        )}
                    >
                        {tab.label}
                    </span>
                </button>
            );
        })}
    </div>
);
