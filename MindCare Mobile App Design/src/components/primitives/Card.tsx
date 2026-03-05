/**
 * Card Component
 * Reusable container with shadow and rounded corners
 */

import React from "react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => (
    <div
        onClick={onClick}
        className={cn(
            "bg-white rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden",
            onClick &&
                "cursor-pointer active:scale-[0.98] transition-transform",
            className,
        )}
    >
        {children}
    </div>
);
