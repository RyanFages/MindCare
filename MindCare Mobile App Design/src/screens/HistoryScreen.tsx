import { Clock, Smile, AlertCircle, HeartHandshake, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Screen from '@/components/mindcare/Screen';
import BottomBar from '@/components/mindcare/BottomBar';
import { H1, H2, TextBody } from '@/components/mindcare/Typography';
import McCard from '@/components/mindcare/McCard';
import { motion } from 'framer-motion';

export interface CheckinEntry {
  id: string;
  date: string; // ISO string
  type: 'balanced' | 'watch' | 'support';
  concerns: string[];
}

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const profileMeta: Record<string, { icon: typeof Smile; label: string; color: string; iconColor: string }> = {
  balanced: { icon: Smile, label: 'Équilibré·e', color: 'bg-primary/15', iconColor: 'text-primary' },
  watch: { icon: AlertCircle, label: 'À surveiller', color: 'bg-mc-peach/20', iconColor: 'text-foreground' },
  support: { icon: HeartHandshake, label: 'À soutenir', color: 'bg-accent/15', iconColor: 'text-accent' },
};

export function getCheckinHistory(): CheckinEntry[] {
  try {
    const raw = localStorage.getItem('mindcare_checkin_history');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCheckinEntry(type: 'balanced' | 'watch' | 'support', concerns: string[]) {
  const history = getCheckinHistory();
  const entry: CheckinEntry = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    type,
    concerns,
  };
  history.unshift(entry);
  localStorage.setItem('mindcare_checkin_history', JSON.stringify(history));
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

const HistoryScreen = ({ onNavigate, onBack }: HistoryScreenProps) => {
  const entries = getCheckinHistory();

  return (
    <Screen bottomBar={<BottomBar activeTab="home" onNavigate={onNavigate} />}>
      <div className="pt-8 pb-6 px-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10">
            <Clock size={22} className="text-primary" />
          </div>
          <H1 className="text-[26px]">Historique</H1>
        </div>
        <TextBody className="text-muted-foreground mb-6">
          Suivez l'évolution de votre bien-être au fil du temps.
        </TextBody>
      </div>

      <div className="px-5 pb-28">
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Clock size={28} className="text-muted-foreground" />
            </div>
            <H2 className="text-[18px] mb-2">Pas encore d'évaluation</H2>
            <TextBody className="text-muted-foreground text-[14px] max-w-xs mx-auto">
              Fais ton premier check-in pour commencer à suivre ton bien-être.
            </TextBody>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const meta = profileMeta[entry.type];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <McCard className="p-4 flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", meta.color)}>
                      <Icon size={22} className={meta.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-medium text-foreground text-[15px]">{meta.label}</p>
                      <p className="font-body text-[13px] text-muted-foreground mt-0.5">
                        {formatDate(entry.date)} à {formatTime(entry.date)}
                      </p>
                      {entry.concerns.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {entry.concerns.map((c) => (
                            <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-body">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </McCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Screen>
  );
};

export default HistoryScreen;
