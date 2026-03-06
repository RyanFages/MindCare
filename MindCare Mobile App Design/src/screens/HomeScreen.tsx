import { BookOpen, HeartHandshake, Volume2, Calendar, PlayCircle, Clock, BookText } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import BottomBar from '@/components/mindcare/BottomBar';
import BrandLogo from '@/components/mindcare/BrandLogo';
import McButton from '@/components/mindcare/McButton';
import McCard from '@/components/mindcare/McCard';
import { H1, H2, TextBody } from '@/components/mindcare/Typography';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const { t } = useLanguage();
  const quickActions = [
    { label: 'Comprendre', icon: BookOpen, color: 'bg-mc-blue-light', target: 'learn' },
    { label: 'Parler', icon: HeartHandshake, color: 'bg-mc-purple', target: 'help' },
    { label: 'Respirer', icon: Volume2, color: 'bg-secondary', target: 'learn' },
  ];

  return (
    <Screen bottomBar={<BottomBar activeTab="home" onNavigate={onNavigate} />}>
      {/* Immersive Header */}
      <div className="pt-8 pb-6 px-4 flex flex-col items-center text-center bg-gradient-to-b from-background via-card to-background">
        <BrandLogo size="small" className="mb-6 w-8 h-8" />
        <H1 className="mb-2 text-[32px]">{t("home.welcome")}, Sarah</H1>
        <TextBody className="text-muted-foreground text-[16px]">Comment te sens-tu aujourd'hui ?</TextBody>
      </div>

      <div className="px-4 space-y-8">
        {/* Main Card: Ton Moment */}
        <McCard className="p-6 bg-card border border-border text-foreground relative overflow-hidden shadow-lg dark:bg-[hsl(220,15%,18%)]" onClick={() => onNavigate('checkin')}>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary backdrop-blur-sm">
              <Calendar size={24} />
            </div>
            <H2 className="text-foreground text-[22px] mb-2">Ton moment</H2>
            <TextBody className="text-muted-foreground mb-8 font-light">2 minutes pour toi, maintenant.</TextBody>
            <McButton variant="primary" className="w-full h-14 text-[18px] shadow-[0_4px_14px_rgba(242,185,160,0.4)]">
              Commencer
            </McButton>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-card to-muted z-0"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        </McCard>

        {/* Quick Actions Bar */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.target)}
              className="flex items-center gap-3 pl-2 pr-5 py-2 bg-card border border-border rounded-full shadow-sm active:scale-95 transition-transform whitespace-nowrap shrink-0"
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground", action.color)}>
                <action.icon size={16} />
              </div>
              <span className="font-display font-medium text-foreground text-[15px]">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Historique */}
        <McCard
          className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
          onClick={() => onNavigate('history')}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-display font-medium text-foreground text-[15px]">Historique du bien-être</h4>
            <p className="font-body text-[13px] text-muted-foreground">Suivre ton évolution</p>
          </div>
        </McCard>

        {/* Journal */}
        <McCard
          className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
          onClick={() => onNavigate('journal')}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BookText size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-display font-medium text-foreground text-[15px]">Mon journal</h4>
            <p className="font-body text-[13px] text-muted-foreground">Écrire tes pensées</p>
          </div>
        </McCard>

        {/* Pour toi aujourd'hui */}
        <div className="pb-4">
          <H2 className="mb-4 text-[20px] px-1">Pour toi aujourd'hui</H2>
          <div className="space-y-4">
            <McCard className="flex items-center p-4 gap-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => onNavigate('learn')}>
              <img
                src="https://images.unsplash.com/photo-1766832858735-b3740223153e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                className="w-16 h-16 rounded-[12px] object-cover"
                alt="Nature"
              />
              <div className="flex-1">
                <h4 className="font-display font-medium text-foreground text-[16px]">Respiration guidée</h4>
                <p className="font-body text-[13px] text-muted-foreground mt-1">5 min • Relaxation</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground">
                <PlayCircle size={20} />
              </button>
            </McCard>

            {/* Micro-card bienveillante */}
            <div className="px-4 py-6 rounded-[20px] bg-background border border-border text-center border-dashed">
              <p className="font-display text-muted-foreground text-[14px] italic leading-relaxed">
                "Tu n'as rien à réussir ici. Juste être là."
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default HomeScreen;
