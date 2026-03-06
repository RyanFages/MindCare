import { ChevronRight } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McButton from '@/components/mindcare/McButton';
import BrandLogo from '@/components/mindcare/BrandLogo';
import { H2, TextBody } from '@/components/mindcare/Typography';

const AboutScreen = ({ onBack }: { onBack: () => void }) => (
  <Screen className="bg-card">
    <TopBar title="À propos" showBack onBack={onBack} />
    <div className="px-6 pt-10 pb-6 flex flex-col items-center h-full text-center">
      <BrandLogo size="large" className="mb-6" />
      <H2 className="mb-4">MindCare</H2>
      <TextBody className="text-muted-foreground max-w-xs mb-12">
        MindCare est une application conçue pour aider les 18–25 ans à mieux comprendre et traverser leurs émotions.
      </TextBody>

      <div className="w-full space-y-3">
        <div className="flex justify-between py-3 border-b border-muted">
          <span className="text-muted-foreground">Version</span>
          <span className="text-foreground font-medium">1.0.0</span>
        </div>
        <div className="flex justify-between py-3 border-b border-muted">
          <span className="text-muted-foreground">Conditions d'utilisation</span>
          <ChevronRight size={16} className="text-mc-text-muted" />
        </div>
        <div className="flex justify-between py-3 border-b border-muted">
          <span className="text-muted-foreground">Mentions légales</span>
          <ChevronRight size={16} className="text-mc-text-muted" />
        </div>
      </div>

      <div className="mt-auto w-full">
        <McButton fullWidth variant="secondary">Nous contacter</McButton>
        <p className="text-[11px] text-mc-text-muted mt-4">Made with ❤️ for mental health.</p>
      </div>
    </div>
  </Screen>
);

export default AboutScreen;
