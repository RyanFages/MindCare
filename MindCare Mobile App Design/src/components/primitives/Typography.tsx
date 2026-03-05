/**
 * Typography Components
 * Consistent heading and text styles throughout the app
 */

import React from "react";
import { cn } from "../../lib/cn";
import { COLORS, FONTS, TYPOGRAPHY } from "../../constants/theme";

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
}

export const H1 = ({ children, className }: TypographyProps) => (
    <h1
        className={cn(
            `font-['${FONTS.heading}'] ${TYPOGRAPHY.h1} text-[${COLORS.textPrimary}]`,
            className,
        )}
    >
        {children}
    </h1>
);

export const H2 = ({ children, className }: TypographyProps) => (
    <h2
        className={cn(
            `font-['${FONTS.heading}'] ${TYPOGRAPHY.h2} text-[${COLORS.textPrimary}]`,
            className,
        )}
    >
        {children}
    </h2>
);

export const TextBody = ({ children, className }: TypographyProps) => (
    <p
        className={cn(
            `font-['${FONTS.body}'] ${TYPOGRAPHY.body} text-[${COLORS.textPrimary}]`,
            className,
        )}
    >
        {children}
    </p>
);
