import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McButton from '@/components/mindcare/McButton';
import { H1, TextBody } from '@/components/mindcare/Typography';

interface BreathingExerciseScreenProps {
  onBack: () => void;
}

const steps = [
  {
    label: 'Inspirer',
    instruction: 'Inspirez lentement par le nez pendant 4 secondes',
    duration: 4,
    scale: 1.6,
    color: 'bg-primary/20',
    borderColor: 'border-primary/30',
  },
  {
    label: 'Bloquer',
    instruction: 'Retenez votre souffle pendant 4 secondes',
    duration: 4,
    scale: 1.6,
    color: 'bg-mc-peach/20',
    borderColor: 'border-mc-peach/30',
  },
  {
    label: 'Expirer',
    instruction: 'Expirez doucement par la bouche pendant 6 secondes',
    duration: 6,
    scale: 1,
    color: 'bg-accent/20',
    borderColor: 'border-accent/30',
  },
];

const BreathingExerciseScreen = ({ onBack }: BreathingExerciseScreenProps) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [countdown, setCountdown] = useState(steps[0].duration);
  const [finished, setFinished] = useState(false);

  const totalCycles = 3;

  const advanceStep = useCallback(() => {
    if (currentStep < 2) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setCountdown(steps[next].duration);
    } else {
      if (cycle + 1 >= totalCycles) {
        setFinished(true);
        setStarted(false);
      } else {
        setCycle(c => c + 1);
        setCurrentStep(0);
        setCountdown(steps[0].duration);
      }
    }
  }, [currentStep, cycle]);

  useEffect(() => {
    if (!started || finished) return;
    if (countdown <= 0) {
      advanceStep();
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, finished, countdown, advanceStep]);

  const handleStart = () => {
    setStarted(true);
    setFinished(false);
    setCurrentStep(0);
    setCycle(0);
    setCountdown(steps[0].duration);
  };

  const step = steps[currentStep];

  return (
    <Screen>
      <div className="min-h-full flex flex-col">
        <TopBar
          title="Respiration guidée"
          showBack
          onBack={onBack}
          rightAction={<button onClick={onBack}><X size={24} className="text-mc-text-muted" /></button>}
        />

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          {!started && !finished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                <Wind size={36} className="text-primary" />
              </div>
              <H1 className="mb-3 text-[26px]">Respiration rapide</H1>
              <TextBody className="text-muted-foreground mb-2 max-w-xs">
                Un exercice simple en 3 étapes pour retrouver ton calme en quelques minutes.
              </TextBody>
              <TextBody className="text-muted-foreground/60 mb-10 text-[13px]">
                3 cycles · environ 1 min 30
              </TextBody>

              <div className="flex gap-3 mb-10">
                {steps.map((s, i) => (
                  <div key={i} className={`px-4 py-2 rounded-full border text-[13px] font-medium ${s.color} ${s.borderColor}`}>
                    {s.label}
                  </div>
                ))}
              </div>

              <McButton onClick={handleStart} fullWidth variant="primary" className="h-14 text-[17px]">
                Commencer
              </McButton>
            </motion.div>
          )}

          {started && !finished && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${cycle}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <TextBody className="text-muted-foreground/60 mb-6 text-[13px]">
                  Cycle {cycle + 1}/{totalCycles}
                </TextBody>

                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  <motion.div
                    className={`absolute inset-0 rounded-full ${step.color}`}
                    animate={{ scale: step.scale }}
                    transition={{ duration: step.duration, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10 text-[48px] font-display font-medium text-foreground">
                    {countdown}
                  </span>
                </div>

                <H1 className="mb-2 text-[28px]">{step.label}</H1>
                <TextBody className="text-muted-foreground max-w-xs">
                  {step.instruction}
                </TextBody>

                <div className="flex gap-3 mt-8">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === currentStep ? 'bg-foreground' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                <Wind size={36} className="text-primary" />
              </div>
              <H1 className="mb-3 text-[26px]">Bien joué 👏</H1>
              <TextBody className="text-muted-foreground mb-10 max-w-xs">
                Tu as terminé l'exercice. Prends un moment pour observer comment tu te sens maintenant.
              </TextBody>
              <div className="w-full space-y-3">
                <McButton onClick={handleStart} fullWidth variant="secondary">
                  Recommencer
                </McButton>
                <McButton onClick={onBack} fullWidth variant="ghost">
                  Retour
                </McButton>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Screen>
  );
};

export default BreathingExerciseScreen;
