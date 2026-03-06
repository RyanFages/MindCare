import { useState } from 'react';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';

const LanguageScreen = ({ onBack }: { onBack: () => void }) => {
  const [lang, setLang] = useState('fr');

  const RadioOption = ({ id, label, flag }: { id: string; label: string; flag: string }) => (
    <button
      onClick={() => setLang(id)}
      className="w-full flex items-center justify-between p-4 bg-card border-b border-border last:border-0 first:rounded-t-[16px] last:rounded-b-[16px]"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{flag}</span>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className={cn(
        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
        lang === id ? "border-primary" : "border-border"
      )}>
        {lang === id && <div className="w-3 h-3 rounded-full bg-primary" />}
      </div>
    </button>
  );

  return (
    <Screen>
      <TopBar title="Langue" showBack onBack={onBack} />
      <div className="px-6 pt-6">
        <div className="border border-border rounded-[16px] bg-card shadow-sm">
          <RadioOption id="fr" label="Français" flag="🇫🇷" />
          <RadioOption id="en" label="English" flag="🇬🇧" />
          <RadioOption id="es" label="Español" flag="🇪🇸" />
        </div>
        <p className="text-center text-[13px] text-mc-text-muted mt-4">La langue peut être changée à tout moment.</p>
      </div>
    </Screen>
  );
};

export default LanguageScreen;
