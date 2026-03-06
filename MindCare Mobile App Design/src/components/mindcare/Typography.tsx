import React from 'react';
import { cn } from '@/lib/utils';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={cn("font-display font-normal text-[36px] leading-tight text-foreground", className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("font-display font-medium text-[24px] leading-snug text-foreground", className)}>
    {children}
  </h2>
);

export const TextBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("font-body font-normal text-[14px] leading-relaxed text-foreground", className)}>
    {children}
  </p>
);
