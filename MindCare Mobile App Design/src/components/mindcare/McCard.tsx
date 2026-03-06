import React from 'react';
import { cn } from '@/lib/utils';

interface McCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const McCard = ({ children, className, onClick }: McCardProps) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-card rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden border border-transparent dark:border-border/50",
      onClick && "cursor-pointer active:scale-[0.98] transition-transform",
      className
    )}
  >
    {children}
  </div>
);

export default McCard;
