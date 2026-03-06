import { Shield, Lock, X } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McButton from '@/components/mindcare/McButton';

const PrivacyScreen = ({ onBack }: { onBack: () => void }) => (
  <Screen className="bg-card">
    <TopBar title="Confidentialité" showBack onBack={onBack} />
    <div className="px-6 pt-4 pb-6 flex flex-col h-full overflow-y-auto">
      <div className="space-y-4 mb-8">
        <div className="bg-background p-5 rounded-[16px] border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={20} className="text-primary" />
            <h3 className="font-bold text-foreground">Anonymat garanti</h3>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Nous ne demandons jamais ton nom complet ou ton adresse pour utiliser l'app. Ton profil est uniquement local.
          </p>
        </div>
        <div className="bg-background p-5 rounded-[16px] border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Lock size={20} className="text-accent" />
            <h3 className="font-bold text-foreground">Données chiffrées</h3>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Tes réponses aux check-ins et ton journal sont chiffrés. Personne d'autre que toi ne peut les lire.
          </p>
        </div>
        <div className="bg-background p-5 rounded-[16px] border border-border">
          <div className="flex items-center gap-3 mb-2">
            <X size={20} className="text-mc-purple" />
            <h3 className="font-bold text-foreground">Pas de revente</h3>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Tes données émotionnelles ne sont pas à vendre. Elles servent uniquement à personnaliser ton expérience.
          </p>
        </div>
      </div>
      <div className="mt-auto pb-6 space-y-3">
        <McButton fullWidth variant="secondary">Politique de confidentialité</McButton>
        <McButton fullWidth variant="ghost" className="text-destructive hover:bg-destructive/5">Supprimer mes données</McButton>
      </div>
    </div>
  </Screen>
);

export default PrivacyScreen;
