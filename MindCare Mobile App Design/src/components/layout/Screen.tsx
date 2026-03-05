/**
 * Screen Wrapper
 * Base layout component for all screens
 * Handles scrollable content area and bottom bar positioning
 */

import React from "react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";

interface ScreenProps {
    children: React.ReactNode;
    bottomBar?: React.ReactNode;
    className?: string;
}

export const Screen = ({ children, bottomBar, className }: ScreenProps) => (
    <div
        className={cn(
            "w-full h-full relative flex flex-col overflow-hidden bg-[#F8F9F7]",
            className,
        )}
    >
        <div
            className={cn(
                "flex-1 w-full overflow-y-auto no-scrollbar",
                bottomBar ? "pb-[80px]" : "pb-6",
            )}
        >
            {children}
        </div>
        {bottomBar}
    </div>
);
