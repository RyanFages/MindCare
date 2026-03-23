import { Home, BookOpen, HeartHandshake, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface BottomBarProps {
    activeTab: string;
    onNavigate: (tab: string) => void;
}

const BottomBar = ({ activeTab, onNavigate }: BottomBarProps) => {
    const { t } = useLanguage();

    const tabs = [
        { id: "home", label: t("nav.home"), icon: Home },
        { id: "learn", label: t("nav.learn"), icon: BookOpen },
        { id: "help", label: t("nav.help"), icon: HeartHandshake },
        { id: "settings", label: t("nav.settings"), icon: Settings },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-card border-t border-border px-6 flex justify-between items-center z-50">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onNavigate(tab.id)}
                        className="flex flex-col items-center justify-center gap-1 w-16 h-full"
                    >
                        <div
                            className={cn(
                                "p-1 rounded-full transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-mc-text-muted",
                            )}
                        >
                            <tab.icon
                                size={24}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        </div>
                        <span
                            className={cn(
                                "text-[10px] font-medium font-body",
                                isActive
                                    ? "text-foreground"
                                    : "text-mc-text-muted",
                            )}
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomBar;
