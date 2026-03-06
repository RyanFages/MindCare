import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Chip = ({ label, active, onClick }: ChipProps) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-[14px] font-medium transition-colors whitespace-nowrap font-body",
      active 
        ? "bg-primary text-primary-foreground"
        : "bg-card border border-border text-muted-foreground hover:bg-muted"
    )}
  >
    {label}
  </button>
);

export default Chip;
