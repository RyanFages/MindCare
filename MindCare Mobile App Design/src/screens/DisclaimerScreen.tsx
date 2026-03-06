import { ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Screen from '@/components/mindcare/Screen';
import BrandLogo from '@/components/mindcare/BrandLogo';
import McButton from '@/components/mindcare/McButton';
import { H1, TextBody } from '@/components/mindcare/Typography';

interface DisclaimerScreenProps {
  onAccept: () => void;
}

const DisclaimerScreen = ({ onAccept }: DisclaimerScreenProps) => {
  return (
    <Screen className="bg-card">
      <div className="min-h-full flex flex-col items-center justify-center px-8 py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrandLogo size="large" className="mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <H1 className="mb-3 text-[28px]">Bienvenue sur MindCare</H1>
          <TextBody className="text-muted-foreground mb-10 max-w-xs mx-auto">
            Un espace bienveillant pour mieux comprendre tes émotions, à ton rythme.
          </TextBody>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full space-y-4 mb-10"
        >
          <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-[15px] mb-1">
                Ce n'est pas un diagnostic médical
              </p>
              <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
                Cette application ne remplace pas un professionnel de santé. Elle t'aide simplement à mieux te connaître.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
              <Heart size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-[15px] mb-1">
                Zéro jugement, zéro analyse
              </p>
              <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
                Ici, il n'y a pas de bonnes ou mauvaises réponses. Juste un moment pour toi.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full"
        >
          <McButton onClick={onAccept} fullWidth variant="primary" className="h-14 text-[17px]">
            J'ai compris, continuer
          </McButton>
        </motion.div>
      </div>
    </Screen>
  );
};

export default DisclaimerScreen;
