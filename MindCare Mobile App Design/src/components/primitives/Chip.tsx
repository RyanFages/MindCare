/**
 * Chip Component
 * Toggle-able button for filters and selections
 */

import React from "react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";

interface ChipProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export const Chip = ({ label, active, onClick }: ChipProps) => (
    <button
        onClick={onClick}
        className={cn(
            "px-4 py-2 rounded-full text-[14px] font-medium transition-colors whitespace-nowrap font-['Inter']",
            active
                ? `bg-[${COLORS.brand.greenPrimary}] text-white`
                : `bg-white border border-[${COLORS.border}] text-[${COLORS.textSecondary}] hover:bg-gray-50`,
        )}
    >
        {label}
    </button>
);
