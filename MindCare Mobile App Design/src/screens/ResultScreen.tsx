import { Smile, AlertCircle, HeartHandshake, BookOpen, Wind, Phone, Sparkles, Moon, Brain, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import McButton from '@/components/mindcare/McButton';
import McCard from '@/components/mindcare/McCard';
import { H1, H2, TextBody } from '@/components/mindcare/Typography';

type ResultType = 'balanced' | 'watch' | 'support';

interface ResultScreenProps {
  type: ResultType;
  concerns?: string[];
  onNavigate: (screen: string) => void;
}

const profiles: Record<ResultType, {
  icon: typeof Smile;
  title: string;
  color: string;
  bgColor: string;
  iconColor: string;
  description: string;
}> = {
  balanced: {
    icon: Smile,
    title: 'Vous semblez équilibré·e',
    color: 'bg-primary/15',
    bgColor: 'border-primary/20',
    iconColor: 'text-primary',
    description: "Votre énergie et votre état émotionnel semblent stables. C'est le bon moment pour renforcer vos habitudes positives.",
  },
  watch: {
    icon: AlertCircle,
    title: 'Quelques points à surveiller',
    color: 'bg-mc-peach/20',
    bgColor: 'border-mc-peach/30',
    iconColor: 'text-foreground',
    description: "Certains signaux méritent votre attention. Prendre un moment pour soi peut faire la différence.",
  },
  support: {
    icon: HeartHandshake,
    title: 'Un peu de soutien serait bienvenu',
    color: 'bg-accent/15',
    bgColor: 'border-accent/20',
    iconColor: 'text-accent',
    description: "Cette période semble un peu difficile, et c'est tout à fait normal. Voici des ressources pensées pour vous.",
  },
};

interface Recommendation {
  icon: typeof Smile;
  title: string;
  subtitle: string;
  color: string;
  iconColor: string;
  target: string;
}

function getRecommendations(type: ResultType, concerns: string[]): Recommendation[] {
  const recs: Recommendation[] = [];

  // Always recommend breathing for watch/support
  if (type === 'watch' || type === 'support') {
    recs.push({
      icon: Wind,
      title: 'Exercice de respiration',
      subtitle: '3 minutes pour calmer le mental',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      target: 'breathing-exercise',
    });
  }

  // Concern-based recommendations
  const hasConcern = (id: string) => concerns.includes(id);

  if (hasConcern('work')) {
    recs.push({
      icon: Brain,
      title: 'Fatigue mentale',
      subtitle: 'Comprendre quand le cerveau sature',
      color: 'bg-mc-blue-light/30',
      iconColor: 'text-foreground',
      target: 'learn',
    });
  }

  if (hasConcern('health') || hasConcern('family')) {
    recs.push({
      icon: Heart,
      title: 'T\u00e9moignages',
      subtitle: "D'autres ont v\u00e9cu \u00e7a \u2014 tu n'es pas seul\u00b7e",
      color: 'bg-mc-peach/20',
      iconColor: 'text-foreground',
      target: 'learn',
    });
  }

  if (hasConcern('future')) {
    recs.push({
      icon: Sparkles,
      title: "G\u00e9rer l'anxi\u00e9t\u00e9",
      subtitle: 'Des techniques concr\u00e8tes au quotidien',
      color: 'bg-accent/10',
      iconColor: 'text-accent',
      target: 'learn',
    });
  }

  // Support-level: always suggest talking to someone
  if (type === 'support') {
    recs.push({
      icon: Phone,
      title: "Parler \u00e0 quelqu'un",
      subtitle: "Lignes d'\u00e9coute gratuites et confidentielles",
      color: 'bg-accent/15',
      iconColor: 'text-accent',
      target: 'help',
    });
  }

  // Balanced: exploration content
  if (type === 'balanced') {
    recs.push({
      icon: BookOpen,
      title: 'Explorer les contenus',
      subtitle: 'Articles et audios pour aller plus loin',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      target: 'learn',
    });
    recs.push({
      icon: Wind,
      title: 'Respiration guidée',
      subtitle: 'Un moment de calme pour bien terminer',
      color: 'bg-secondary/30',
      iconColor: 'text-foreground',
      target: 'breathing-exercise',
    });
  }

  // Watch: suggest nightline
  if (type === 'watch') {
    recs.push({
      icon: Moon,
      title: 'Nightline',
      subtitle: "Des \u00e9tudiants form\u00e9s pour t'\u00e9couter",
      color: 'bg-mc-purple/20',
      iconColor: 'text-foreground',
      target: 'help',
    });
  }

  return recs.slice(0, 3);
}

const ResultScreen = ({ type, concerns = [], onNavigate }: ResultScreenProps) => {
  const profile = profiles[type];
  const Icon = profile.icon;
  const recommendations = getRecommendations(type, concerns);

  return (
    <Screen className="bg-card">
      <div className="min-h-full flex flex-col p-8">
        {/* Profile result */}
        <div className="flex flex-col items-center text-center pt-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-6", profile.color)}
          >
            <Icon size={40} className={profile.iconColor} />
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <H1 className="mb-3 text-[24px]">{profile.title}</H1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className={cn("rounded-2xl border p-4 mb-8 max-w-sm mx-auto", profile.bgColor, "bg-background")}
          >
            <TextBody className="text-muted-foreground leading-relaxed text-[14px]">
              {profile.description}
            </TextBody>
          </motion.div>
        </div>

        {/* Personalized recommendations */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="space-y-3 mb-8"
        >
          <H2 className="text-[17px] text-muted-foreground mb-2">Ressources pour toi</H2>
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <McCard
                className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => onNavigate(rec.target)}
              >
                <div className={cn("w-11 h-11 rounded-full flex items-center justify-center shrink-0", rec.color)}>
                  <rec.icon size={20} className={rec.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-medium text-foreground text-[15px]">{rec.title}</p>
                  <p className="font-body text-[13px] text-muted-foreground mt-0.5">{rec.subtitle}</p>
                </div>
              </McCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-auto space-y-3"
        >
          <McButton onClick={() => onNavigate('home')} fullWidth variant="ghost">
            Retour à l'accueil
          </McButton>
        </motion.div>

        <p className="text-[12px] text-muted-foreground/70 mt-6 text-center max-w-xs mx-auto italic">
          ⚠️ Ce résultat ne constitue pas un diagnostic médical. En cas de détresse, contactez un professionnel de santé.
        </p>
      </div>
    </Screen>
  );
};

export default ResultScreen;
