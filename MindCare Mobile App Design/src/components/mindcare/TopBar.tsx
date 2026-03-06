import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const TopBar = ({ title, showBack, onBack, rightAction }: TopBarProps) => (
  <div className="h-[60px] flex items-center justify-between px-4 sticky top-0 bg-background z-40 shrink-0">
    <div className="w-10 flex justify-start">
      {showBack && (
        <button onClick={onBack} className="p-2 -ml-2 text-foreground rounded-full hover:bg-muted">
          <ChevronLeft size={24} />
        </button>
      )}
    </div>
    <div className="font-display font-medium text-[16px] text-foreground">
      {title}
    </div>
    <div className="w-10 flex justify-end">
      {rightAction}
    </div>
  </div>
);

export default TopBar;
