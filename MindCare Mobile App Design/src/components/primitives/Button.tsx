/**
 * Button Component
 * Primary, secondary, and ghost variants
 */

import React from "react";
import { cn } from "../../lib/cn";
import { COLORS } from "../../constants/theme";
import type { ButtonVariant } from "../../types";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    icon?: React.ComponentType<{ size: number }>;
    fullWidth?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    className,
    icon: Icon,
    fullWidth,
    onClick,
    ...props
}: ButtonProps) => {
    const baseStyles =
        "h-12 px-6 rounded-full font-semibold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-95 font-['Inter']";

    const variants: Record<ButtonVariant, string> = {
        primary: `bg-[${COLORS.brand.peachCTA}] text-[${COLORS.textPrimary}] shadow-sm hover:opacity-90`,
        secondary: `bg-white border border-[${COLORS.border}] text-[${COLORS.textPrimary}] hover:bg-gray-50`,
        ghost: `bg-transparent text-[${COLORS.textSecondary}] hover:bg-gray-100`,
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                baseStyles,
                variants[variant],
                fullWidth && "w-full",
                className,
            )}
            {...props}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};
