import { Settings, Lock } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McButton from '@/components/mindcare/McButton';

interface ProfileEditScreenProps {
  onBack: () => void;
}

const ProfileEditScreen = ({ onBack }: ProfileEditScreenProps) => (
  <Screen className="bg-card">
    <TopBar title="Modifier le profil" showBack onBack={onBack} />
    <div className="px-6 pt-6 pb-6 flex flex-col h-full">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-3xl font-display">
            S
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center border-2 border-card">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-1 ml-1">Prénom</label>
          <input type="text" defaultValue="Sarah" className="w-full h-12 px-4 rounded-[12px] bg-background border border-border text-foreground focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-1 ml-1">Nom</label>
          <input type="text" defaultValue="Martin" className="w-full h-12 px-4 rounded-[12px] bg-background border border-border text-foreground focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-1 ml-1">Email</label>
          <input type="email" defaultValue="sarah.m@email.com" className="w-full h-12 px-4 rounded-[12px] bg-background border border-border text-foreground focus:outline-none focus:border-primary" />
        </div>
      </div>

      <div className="mt-auto pb-6">
        <p className="text-center text-[12px] text-mc-text-muted mb-4 flex items-center justify-center gap-2">
          <Lock size={12} /> Tes informations restent privées.
        </p>
        <McButton fullWidth onClick={onBack} variant="primary">Enregistrer</McButton>
      </div>
    </div>
  </Screen>
);

export default ProfileEditScreen;
