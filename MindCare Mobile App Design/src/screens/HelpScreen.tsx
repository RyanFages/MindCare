import { Moon, HeartHandshake, AlertTriangle, Clock, Phone, Globe } from 'lucide-react';
import { HELP_DATA, type HelpResource } from '@/lib/constants';
import Screen from '@/components/mindcare/Screen';
import BottomBar from '@/components/mindcare/BottomBar';
import McCard from '@/components/mindcare/McCard';
import McButton from '@/components/mindcare/McButton';
import { H1, TextBody } from '@/components/mindcare/Typography';

interface HelpScreenProps {
  onNavigate: (screen: string) => void;
  resultType: 'balanced' | 'watch' | 'support';
  onOpenResource: (resource: HelpResource) => void;
}

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="flex items-start gap-3 mb-4 mt-6">
    <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-muted-foreground shrink-0">
      <Icon size={16} />
    </div>
    <div>
      <h2 className="text-[18px] font-medium font-display text-foreground leading-tight">{title}</h2>
      <p className="text-[13px] text-muted-foreground mt-1 leading-snug">{subtitle}</p>
    </div>
  </div>
);

const ResourceCard = ({ resource, onOpenResource }: { resource: HelpResource; onOpenResource: (r: HelpResource) => void }) => (
  <McCard className="p-4 mb-3 active:scale-[0.99] transition-transform">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-bold text-[16px] font-display text-foreground">{resource.name}</h3>
        <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2">{resource.shortDesc}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {resource.badges.slice(0, 3).map((badge: string, i: number) => (
        <span key={i} className="text-[10px] font-medium text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
          {badge}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-border">
      <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-1 rounded-md flex items-center gap-1">
        <Clock size={10} /> {resource.hours}
      </span>
      <div className="flex gap-2">
        <McButton onClick={() => onOpenResource(resource)} variant="secondary" className="h-8 px-3 text-[12px] font-medium">
          Fiche
        </McButton>
        {resource.phone && (
          <McButton variant="primary" className="h-8 px-4 text-[12px] font-medium">
            Appeler
          </McButton>
        )}
      </div>
    </div>
  </McCard>
);

const HelpScreen = ({ onNavigate, resultType, onOpenResource }: HelpScreenProps) => {
  const isSupportNeeded = resultType === 'support';

  return (
    <Screen bottomBar={<BottomBar activeTab="help" onNavigate={onNavigate} />}>
      <div className="pt-2 px-4 pb-4">
        <div className="mb-6 mt-4">
          <H1 className="mb-2">Aide & Soutien</H1>
          <TextBody className="text-muted-foreground mt-2">
            Tu n'as pas à rester seul·e. Des professionnels et bénévoles sont là pour t'écouter.
          </TextBody>
        </div>

        {isSupportNeeded && (
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-[16px] flex gap-3 mb-6">
            <AlertTriangle size={24} className="text-destructive shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-destructive text-[15px] mb-1">Besoin de parler ?</h3>
              <p className="text-[13px] text-foreground leading-snug">
                Tu as indiqué traverser une période difficile. Ces services peuvent t'aider dès maintenant.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2 pb-4">
          <SectionHeader icon={Moon} title="Écoute immédiate" subtitle="Pour parler à quelqu'un maintenant, sans jugement." />
          {HELP_DATA.filter(r => r.category === 'immediate').map(r => (
            <ResourceCard key={r.id} resource={r} onOpenResource={onOpenResource} />
          ))}

          <SectionHeader icon={HeartHandshake} title="Accompagnement étudiant" subtitle="Des dispositifs pensés spécifiquement pour tes besoins." />
          {HELP_DATA.filter(r => r.category === 'student').map(r => (
            <ResourceCard key={r.id} resource={r} onOpenResource={onOpenResource} />
          ))}

          {/* Emergency Footer */}
          <div className="mt-8 p-4 rounded-[16px] bg-background border border-border text-center">
            <p className="text-[12px] text-mc-text-muted mb-2">En cas d'urgence vitale</p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-xs">15</div>
                <span className="font-bold text-foreground">SAMU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-xs">112</div>
                <span className="font-bold text-foreground">Urgences</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default HelpScreen;
