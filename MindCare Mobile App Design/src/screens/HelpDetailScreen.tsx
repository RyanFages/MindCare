import { HeartHandshake, Info, Clock, Globe, Phone } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McButton from '@/components/mindcare/McButton';
import { H1 } from '@/components/mindcare/Typography';
import type { HelpResource } from '@/lib/constants';

interface HelpDetailScreenProps {
  resource: HelpResource | null;
  onBack: () => void;
}

const HelpDetailScreen = ({ resource, onBack }: HelpDetailScreenProps) => {
  if (!resource) return null;

  return (
    <Screen className="bg-card">
      <TopBar showBack onBack={onBack} title="Fiche Ressource" />
      <div className="px-6 py-6 pb-24">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center text-foreground shadow-inner">
            <HeartHandshake size={32} className="text-primary" />
          </div>
        </div>

        <H1 className="text-center text-[28px] mb-2">{resource.name}</H1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {resource.badges.map((badge: string, i: number) => (
            <span key={i} className="px-3 py-1 rounded-full bg-mc-peach/10 text-mc-peach text-[12px] font-bold uppercase tracking-wider border border-mc-peach/20">
              {badge}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Info size={16} /> À propos
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed">{resource.fullDesc}</p>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Clock size={16} /> Horaires
            </h3>
            <p className="text-muted-foreground text-[15px]">{resource.fullHours}</p>
          </section>

          <div className="bg-secondary/20 p-5 rounded-[16px] border border-secondary/30 mt-4">
            <h3 className="font-bold text-foreground mb-2 text-[15px]">Quand contacter ce service ?</h3>
            <p className="text-foreground text-[14px] italic leading-relaxed opacity-80">
              "{resource.whenToContact}"
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        {resource.website && (
          <McButton variant="secondary" className="flex-1" icon={Globe}>
            Site web
          </McButton>
        )}
        {resource.phone && (
          <McButton variant="primary" className="flex-[2]" icon={Phone}>
            Appeler {resource.phone}
          </McButton>
        )}
      </div>
    </Screen>
  );
};

export default HelpDetailScreen;
