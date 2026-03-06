import React from 'react';
import { cn } from '@/lib/utils';

interface ScreenProps {
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
  className?: string;
}

const Screen = ({ children, bottomBar, className }: ScreenProps) => (
  <div className={cn("w-full h-full relative flex flex-col overflow-hidden bg-background", className)}>
    <div className={cn(
      "flex-1 w-full overflow-y-auto no-scrollbar",
      bottomBar ? "pb-[80px]" : "pb-6"
    )}>
      {children}
    </div>
    {bottomBar}
  </div>
);

export default Screen;
