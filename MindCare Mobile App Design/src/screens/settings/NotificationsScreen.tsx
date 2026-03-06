import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Clock, Calendar, Heart } from 'lucide-react';
import Screen from '@/components/mindcare/Screen';
import TopBar from '@/components/mindcare/TopBar';
import McCard from '@/components/mindcare/McCard';
import McButton from '@/components/mindcare/McButton';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const HOURS = Array.from({ length: 15 }, (_, i) => {
  const h = i + 8;
  return `${h.toString().padStart(2, '0')}:00`;
});

const STORAGE_KEY = 'mindcare_notifications';

interface NotifSettings {
  daily: boolean;
  content: boolean;
  support: boolean;
  weeklyCheckin: boolean;
  weeklyDay: number;
  weeklyHour: string;
}

const defaultSettings: NotifSettings = {
  daily: true,
  content: true,
  support: false,
  weeklyCheckin: true,
  weeklyDay: 6, // Dimanche
  weeklyHour: '10:00',
};

const NotificationsScreen = ({ onBack }: { onBack: () => void }) => {
  const [settings, setSettings] = useState<NotifSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch { return defaultSettings; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = (patch: Partial<NotifSettings>) => setSettings(s => ({ ...s, ...patch }));

  const ToggleItem = ({ label, desc, isOn, onToggle, icon: Icon }: { label: string; desc: string; isOn: boolean; onToggle: () => void; icon?: React.ElementType }) => (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="pr-4 flex items-start gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={16} className="text-primary" />
          </div>
        )}
        <div>
          <div className="text-foreground font-medium font-body text-[15px]">{label}</div>
          <div className="text-muted-foreground text-[13px] leading-snug mt-0.5">{desc}</div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "w-12 h-7 rounded-full transition-colors relative shrink-0",
          isOn ? "bg-primary" : "bg-border"
        )}
      >
        <div className={cn(
          "absolute top-1 w-5 h-5 bg-card rounded-full shadow-sm transition-transform",
          isOn ? "left-[calc(100%-22px)]" : "left-1"
        )} />
      </button>
    </div>
  );

  return (
    <Screen className="bg-card">
      <TopBar title="Notifications" showBack onBack={onBack} />
      <div className="px-6 pt-2 pb-6 flex flex-col h-full overflow-y-auto">
        {/* Weekly Check-in — Featured */}
        <McCard className="px-4 py-2 mb-4 border-primary/20">
          <div className="flex items-center gap-2 pt-3 pb-1">
            <Calendar size={16} className="text-primary" />
            <span className="text-foreground font-display font-semibold text-[15px]">Rappel hebdomadaire</span>
          </div>
          <p className="text-muted-foreground text-[13px] leading-snug mb-3 pl-6">
            Un petit rappel bienveillant, une fois par semaine max, pour penser à toi. 💛
          </p>

          <ToggleItem
            label="Activer le rappel"
            desc="Un seul rappel par semaine, promis."
            isOn={settings.weeklyCheckin}
            onToggle={() => update({ weeklyCheckin: !settings.weeklyCheckin })}
          />

          {settings.weeklyCheckin && (
            <div className="pb-4 pt-2 space-y-4 pl-1">
              {/* Day picker */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-foreground text-[13px] font-medium">Jour</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day, i) => (
                    <button
                      key={day}
                      onClick={() => update({ weeklyDay: i })}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[13px] font-body transition-colors",
                        settings.weeklyDay === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hour picker */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-foreground text-[13px] font-medium">Horaire</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {HOURS.map(h => (
                    <button
                      key={h}
                      onClick={() => update({ weeklyHour: h })}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[13px] font-body transition-colors",
                        settings.weeklyHour === h
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted/50 border border-border rounded-2xl p-4 mt-2">
                <p className="text-muted-foreground text-[12px] font-body uppercase tracking-wide mb-1.5">Aperçu du rappel</p>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground text-[14px] font-medium leading-snug">
                      Hey, comment tu te sens cette semaine ? 🌿
                    </p>
                    <p className="text-muted-foreground text-[13px] mt-1 leading-snug">
                      Prends 2 minutes pour faire le point. Pas d'obligation, juste un moment pour toi.
                    </p>
                    <p className="text-muted-foreground text-[11px] mt-2">
                      {DAYS[settings.weeklyDay]} à {settings.weeklyHour}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </McCard>

        {/* Other notifications */}
        <McCard className="px-4">
          <ToggleItem icon={Bell} label="Rappels quotidiens" desc="Un petit check-in pour suivre ton humeur." isOn={settings.daily} onToggle={() => update({ daily: !settings.daily })} />
          <ToggleItem icon={Bell} label="Nouveaux contenus" desc="Quand un article ou audio qui pourrait te plaire sort." isOn={settings.content} onToggle={() => update({ content: !settings.content })} />
          <ToggleItem icon={Heart} label="Messages de soutien" desc="Des petites pensées positives aléatoires." isOn={settings.support} onToggle={() => update({ support: !settings.support })} />
        </McCard>

        <div className="mt-auto pb-6 pt-4">
          <McButton
            fullWidth
            onClick={() => update({ daily: false, content: false, support: false, weeklyCheckin: false })}
            variant="ghost"
            className="text-destructive hover:bg-destructive/5"
          >
            Tout désactiver
          </McButton>
        </div>
      </div>
    </Screen>
  );
};

export default NotificationsScreen;
