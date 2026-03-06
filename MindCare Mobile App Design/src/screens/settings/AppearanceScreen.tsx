import { Sun, Moon, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import { useTheme } from '@/lib/ThemeContext';

const AppearanceScreen = ({ onBack }: { onBack: () => void }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const RadioOption = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setTheme(id as any)}
      className="w-full flex items-center justify-between p-4 bg-card border-b border-border last:border-0 first:rounded-t-[16px] last:rounded-b-[16px]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground">
          <Icon size={20} />
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
        theme === id ? "border-primary" : "border-border"
      )}>
        {theme === id && <div className="w-3 h-3 rounded-full bg-primary" />}
      </div>
    </button>
  );

  return (
    <Screen>
      <TopBar title="Apparence" showBack onBack={onBack} />
      <div className="px-6 pt-6">
        <div className="border border-border rounded-[16px] bg-card shadow-sm">
          <RadioOption id="light" label="Clair" icon={Sun} />
          <RadioOption id="dark" label="Sombre" icon={Moon} />
          <RadioOption id="system" label="Système" icon={Settings} />
        </div>

        <div className="mt-8 flex justify-center">
          <div className={cn(
            "w-48 h-64 rounded-[20px] shadow-lg transition-colors border-4 flex flex-col items-center justify-center p-4 gap-4",
            resolvedTheme === 'dark' ? "bg-foreground border-muted-foreground" : "bg-card border-card"
          )}>
            <div className={cn("w-20 h-2 bg-current rounded-full opacity-20", resolvedTheme === 'dark' ? "text-card" : "text-foreground")} />
            <div className={cn("w-32 h-32 rounded-full opacity-20", resolvedTheme === 'dark' ? "bg-card" : "bg-foreground")} />
            <div className={cn("w-full h-10 rounded-full opacity-20", resolvedTheme === 'dark' ? "bg-card" : "bg-foreground")} />
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default AppearanceScreen;
