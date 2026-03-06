import { Bell, Lock, CreditCard, Paintbrush, Languages, Info, ChevronRight } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import BottomBar from '@/components/mindcare/BottomBar';
import McCard from '@/components/mindcare/McCard';
import McButton from '@/components/mindcare/McButton';
import BrandLogo from '@/components/mindcare/BrandLogo';
import { H1, TextBody } from '@/components/mindcare/Typography';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingItem = ({ icon: Icon, label, value, onClick }: { icon: any; label: string; value?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center justify-between py-4 border-b border-border last:border-0",
      onClick && "cursor-pointer active:opacity-70 transition-opacity"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className="text-muted-foreground" />
      <span className="text-foreground font-medium font-body">{label}</span>
    </div>
    <div className="text-mc-text-muted flex items-center gap-2">
      <span className="text-[14px] font-body">{value}</span>
      <ChevronRight size={16} />
    </div>
  </div>
);

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const { theme } = useTheme();
  const themeLabel = theme === 'dark' ? 'Sombre' : theme === 'system' ? 'Système' : 'Clair';

  return (
  <Screen bottomBar={<BottomBar activeTab="settings" onNavigate={onNavigate} />}>
    <div className="pt-2 px-4 pb-4">
      <div className="mb-8 mt-4">
        <H1>Réglages</H1>
      </div>

      <McCard className="p-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-xl font-display">
            S
          </div>
          <div>
            <h3 className="font-bold text-foreground font-display">Sarah Martin</h3>
            <TextBody className="text-[14px] text-muted-foreground">sarah.m@email.com</TextBody>
          </div>
        </div>
        <McButton variant="secondary" fullWidth onClick={() => onNavigate('profile-edit')}>Modifier le profil</McButton>
      </McCard>

      <section>
        <h3 className="text-[14px] font-semibold text-mc-text-muted uppercase tracking-wider mb-2 pl-2 font-body">Compte</h3>
        <McCard className="px-4">
          <SettingItem icon={Bell} label="Notifications" value="Activées" onClick={() => onNavigate('settings-notifications')} />
          <SettingItem icon={Lock} label="Confidentialité" onClick={() => onNavigate('settings-privacy')} />
          <SettingItem icon={CreditCard} label="Abonnement" value="Gratuit" onClick={() => onNavigate('settings-subscription')} />
        </McCard>
      </section>

      <section className="mt-6">
        <h3 className="text-[14px] font-semibold text-mc-text-muted uppercase tracking-wider mb-2 pl-2 font-body">Application</h3>
        <McCard className="px-4">
          <SettingItem icon={Paintbrush} label="Apparence" value={themeLabel} onClick={() => onNavigate('settings-appearance')} />
          <SettingItem icon={Languages} label="Langue" value="Français" onClick={() => onNavigate('settings-language')} />
          <SettingItem icon={Info} label="À propos" onClick={() => onNavigate('settings-about')} />
        </McCard>
      </section>

      <div className="flex justify-center mt-8 mb-4">
        <BrandLogo size="small" className="opacity-50 grayscale" />
      </div>
    </div>
  </Screen>
  );
};

export default SettingsScreen;
