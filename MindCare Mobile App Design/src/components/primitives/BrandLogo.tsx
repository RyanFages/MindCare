/**
 * Brand Logo Component
 * Displays the MindCare logo in different sizes
 */

import React from "react";
import { cn } from "../../lib/cn";
import { logoAsset } from "../../constants/theme";

type LogoSize = "small" | "medium" | "large";

interface BrandLogoProps {
    size?: LogoSize;
    className?: string;
}

const SIZE_MAP: Record<LogoSize, string> = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-[72px] h-[72px]",
};

export const BrandLogo = ({ size = "medium", className }: BrandLogoProps) => (
    <img
        src={logoAsset}
        alt="MindCare Logo"
        className={cn(SIZE_MAP[size], "object-contain", className)}
    />
);
