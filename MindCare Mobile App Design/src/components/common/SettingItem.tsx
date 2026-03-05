/**
 * Setting Item Component
 * Displays a single setting row with icon, label, and value
 */

import React from "react";
import { ChevronRight } from "lucide-react";
import { Card } from "../primitives";
import { cn } from "../../lib/cn";

interface SettingItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    onClick?: () => void;
    className?: string;
}

export const SettingItem = ({
    icon,
    label,
    value,
    onClick,
    className,
}: SettingItemProps) => {
    return (
        <Card
            onClick={onClick}
            className={cn(
                "p-4 mb-3 flex justify-between items-center",
                onClick && "cursor-pointer active:scale-[0.99]",
                className,
            )}
        >
            <div className="flex items-center gap-3 flex-1">
                <div className="text-[#7EA38B] flex-shrink-0">{icon}</div>
                <div>
                    <h3 className="font-semibold text-[16px] text-[#1F1F1F]">
                        {label}
                    </h3>
                    {value && (
                        <p className="text-[13px] text-[#5F6368] mt-1">
                            {value}
                        </p>
                    )}
                </div>
            </div>
            {onClick && <ChevronRight size={20} className="text-[#A0A0A0]" />}
        </Card>
    );
};
