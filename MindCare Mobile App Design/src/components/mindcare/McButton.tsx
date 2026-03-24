import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface McButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
    icon?: LucideIcon;
    fullWidth?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

const McButton = ({
    children,
    variant = "primary",
    className,
    icon: Icon,
    fullWidth,
    disabled,
    type = "button",
    onClick,
}: McButtonProps) => {
    const baseStyles =
        "h-12 px-6 rounded-full font-semibold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-95 font-body";
    const variants = {
        primary: "bg-mc-peach text-foreground shadow-sm hover:opacity-90",
        secondary:
            "bg-card border border-border text-foreground hover:bg-muted",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                baseStyles,
                variants[variant],
                fullWidth && "w-full",
                disabled && "opacity-50 pointer-events-none",
                className,
            )}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

export default McButton;
