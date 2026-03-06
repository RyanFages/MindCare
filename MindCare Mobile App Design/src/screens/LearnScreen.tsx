import { useState, useCallback } from 'react';
import { BookOpen, Volume2, Clock, ChevronRight, PlayCircle, Heart, CheckCircle, Quote, Shield, Headphones, Wind, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_DATA, type ContentItem } from '@/lib/constants';
import { isContentRead } from '@/lib/readTracker';
import { isFavorite, toggleFavorite, getFavoriteIds } from '@/lib/favoritesTracker';
import Screen from '@/components/mindcare/Screen';
import BottomBar from '@/components/mindcare/BottomBar';
import McCard from '@/components/mindcare/McCard';
import Chip from '@/components/mindcare/Chip';
import { H1, H2, TextBody } from '@/components/mindcare/Typography';

interface LearnScreenProps {
  onNavigate: (screen: string) => void;
  onOpenContent: (content: ContentItem) => void;
}

const FavButton = ({ id, onToggle }: { id: string; onToggle: () => void }) => {
  const fav = isFavorite(id);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggleFavorite(id); onToggle(); }}
      className="p-1.5 rounded-full transition-colors shrink-0"
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Bookmark size={18} className={cn(fav ? 'fill-primary text-primary' : 'text-muted-foreground')} />
    </button>
  );
};

const ContentCard = ({ item, onClick, icon: Icon, iconBg, onFavToggle }: { item: ContentItem; onClick: () => void; icon: React.ElementType; iconBg: string; onFavToggle: () => void }) => {
  const read = isContentRead(item.id);
  return (
    <McCard onClick={onClick} className="flex p-4 gap-4 items-center mb-3 transition-all hover:bg-muted active:scale-[0.99]">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", iconBg)}>
        <Icon size={20} />
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">{item.type}</span>
          {read && (
            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle size={10} /> Lu
            </span>
          )}
        </div>
        <h3 className="font-display font-medium text-foreground text-[15px] leading-tight mb-1">{item.title}</h3>
        <span className="text-[12px] text-muted-foreground flex items-center gap-1">
          <Clock size={12} /> {item.duration}
        </span>
      </div>
      <FavButton id={item.id} onToggle={onFavToggle} />
      <ChevronRight size={20} className="text-muted-foreground" />
    </McCard>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, iconBg }: { icon: React.ElementType; title: string; subtitle: string; iconBg: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", iconBg)}>
      <Icon size={18} />
    </div>
    <div>
      <H2 className="text-[18px] leading-tight">{title}</H2>
      <p className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</p>
    </div>
  </div>
);

const LearnScreen = ({ onNavigate, onOpenContent }: LearnScreenProps) => {
  const [filter, setFilter] = useState('Tout');
  const [, forceUpdate] = useState(0);
  const filters = ['Tout', '⭐ Favoris', 'Stress', 'Fatigue', 'Anxiété', 'Isolement', 'Confiance'];

  const refreshFavs = useCallback(() => forceUpdate(n => n + 1), []);

  const isFavFilter = filter === '⭐ Favoris';
  const favIds = getFavoriteIds();

  const filteredContent = CONTENT_DATA.filter(item => {
    if (isFavFilter) return favIds.has(item.id);
    if (filter === 'Tout') return true;
    return item.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
  });

  const sections = {
    articles: filteredContent.filter(i => i.section === 'understand'),
    testimonials: filteredContent.filter(i => i.section === 'testimonials'),
    podcasts: filteredContent.filter(i => i.section === 'podcasts'),
    breathing: filteredContent.filter(i => i.section === 'breathing'),
  };

  const hasAnyContent = filteredContent.length > 0;

  return (
    <Screen bottomBar={<BottomBar activeTab="learn" onNavigate={onNavigate} />}>
      <div className="pt-2">
        <div className="px-4 mb-4 mt-4">
          <H1 className="mb-2">Comprendre</H1>
          <TextBody className="text-muted-foreground">Des ressources pour mieux te comprendre, à ton rythme.</TextBody>
        </div>

        {filter === 'Tout' && (
          <div className="px-4 mb-6">
            <div className="bg-secondary/20 border border-secondary/30 p-4 rounded-[16px]">
              <p className="text-[14px] text-foreground leading-relaxed">
                <span className="font-semibold">État du moment :</span> Aujourd'hui, tu as mentionné te sentir préoccupé·e par le travail et l'avenir. Ces contenus pourraient t'aider.
              </p>
            </div>
          </div>
        )}

        {/* Sticky Filters */}
        <div className="sticky top-0 bg-background z-30 py-3 px-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-border/50 mb-4">
          {filters.map(f => (
            <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        <div className="px-4 pb-4 space-y-10">

          {/* Empty state for favorites */}
          {isFavFilter && !hasAnyContent && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bookmark size={28} className="text-muted-foreground" />
              </div>
              <H2 className="text-[17px] mb-2">Aucun favori pour l'instant</H2>
              <p className="text-[13px] text-muted-foreground max-w-[240px]">
                Appuie sur <Bookmark size={14} className="inline -mt-0.5" /> à côté d'un contenu pour le retrouver ici.
              </p>
            </div>
          )}

          {/* ── 1. ARTICLES ── */}
          {sections.articles.length > 0 && (
            <section>
              <SectionHeader icon={BookOpen} title="Articles" subtitle="Mieux comprendre ce que tu ressens" iconBg="bg-mc-blue-light/20 text-accent" />
              {sections.articles.map(item => (
                <ContentCard key={item.id} item={item} onClick={() => onOpenContent(item)} icon={BookOpen} iconBg="bg-mc-blue-light/20 text-accent" onFavToggle={refreshFavs} />
              ))}
              {!isFavFilter && (
                <div className="bg-card p-4 rounded-[16px] border border-border mt-2">
                  <p className="text-[14px] text-muted-foreground italic">
                    "Mettre des mots sur ce que tu ressens est souvent la première étape pour aller mieux."
                  </p>
                </div>
              )}
            </section>
          )}

          {/* ── 2. TÉMOIGNAGES ── */}
          {sections.testimonials.length > 0 && (
            <section>
              <SectionHeader icon={Heart} title="Témoignages authentiques" subtitle="Des jeunes partagent leur vécu, avec consentement" iconBg="bg-mc-peach/20 text-primary" />

              {sections.testimonials.map(item => {
                const read = isContentRead(item.id);
                const author = (item as any).author;
                const age = (item as any).age;
                const theme = (item as any).theme;
                return (
                  <McCard
                    key={item.id}
                    onClick={() => onOpenContent(item)}
                    className="p-5 mb-3 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-mc-peach/20 flex items-center justify-center shrink-0 text-foreground font-display font-bold text-[16px]">
                        {author ? author.charAt(0) : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {author && <span className="font-display font-semibold text-foreground text-[15px]">{author}, {age} ans</span>}
                          {read && (
                            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle size={10} /> Lu
                            </span>
                          )}
                        </div>
                        {theme && (
                          <span className="text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{theme}</span>
                        )}
                        <h3 className="font-display font-medium text-foreground text-[14px] leading-snug mt-2">
                          <Quote size={12} className="inline text-muted-foreground mr-1 -mt-0.5" />
                          {item.title}
                        </h3>
                        <span className="text-[12px] text-muted-foreground flex items-center gap-1 mt-2">
                          <Clock size={12} /> {item.duration} de lecture
                        </span>
                      </div>
                      <FavButton id={item.id} onToggle={refreshFavs} />
                    </div>
                  </McCard>
                );
              })}

              {!isFavFilter && (
                <>
                  <div className="mt-3 flex items-center gap-3 p-3 bg-muted/50 rounded-[12px] border border-border">
                    <Shield size={16} className="text-muted-foreground shrink-0" />
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Tous les témoignages sont partagés avec le consentement explicite de leurs auteurs et modérés avant publication.
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-3 p-3 bg-accent/10 rounded-[12px]">
                    <Heart size={20} className="text-accent" />
                    <p className="text-[13px] text-foreground">Tu n'es pas seul·e. Beaucoup traversent des moments similaires.</p>
                  </div>
                </>
              )}
            </section>
          )}

          {/* ── 3. PODCASTS ── */}
          {sections.podcasts.length > 0 && (
            <section>
              <SectionHeader icon={Headphones} title="Podcasts" subtitle="Écoute des épisodes pour mieux comprendre" iconBg="bg-mc-purple/20 text-mc-purple" />
              {sections.podcasts.map(item => (
                <ContentCard key={item.id} item={item} onClick={() => onOpenContent(item)} icon={Headphones} iconBg="bg-mc-purple/20 text-mc-purple" onFavToggle={refreshFavs} />
              ))}
            </section>
          )}

          {/* ── 4. EXERCICES DE RESPIRATION ── */}
          {(!isFavFilter && (sections.breathing.length > 0 || ['Tout', 'Stress', 'Anxiété'].includes(filter))) || (isFavFilter && sections.breathing.length > 0) ? (
            <section>
              <SectionHeader icon={Wind} title="Exercices de respiration" subtitle="Prends un moment pour toi" iconBg="bg-secondary/20 text-secondary-foreground" />

              {sections.breathing.map(item => (
                <ContentCard key={item.id} item={item} onClick={() => onOpenContent(item)} icon={Wind} iconBg="bg-secondary/20 text-secondary-foreground" onFavToggle={refreshFavs} />
              ))}

              {!isFavFilter && ['Tout', 'Stress', 'Anxiété'].includes(filter) && (
                <div
                  onClick={() => onNavigate('breathing-exercise')}
                  className="bg-card border border-border rounded-[20px] p-5 mt-3 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform dark:bg-[hsl(220,15%,18%)]"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[16px] text-foreground mb-1">Respiration rapide</h3>
                      <p className="text-muted-foreground text-[13px]">3 étapes pour calmer le jeu</p>
                    </div>
                    <button className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center text-primary">
                      <PlayCircle size={20} />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4 text-[12px] font-medium text-muted-foreground">
                    <span className="px-3 py-1 bg-primary/10 rounded-full">Inspirer</span>
                    <span className="px-3 py-1 bg-mc-peach/10 rounded-full">Bloquer</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full">Expirer</span>
                  </div>
                </div>
              )}
            </section>
          ) : null}

          <div className="pt-4 pb-8 text-center px-4">
            <p className="text-[11px] text-muted-foreground">
              Ces contenus sont conçus avec des professionnels de la santé mentale. Ils ne remplacent pas un suivi médical.
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default LearnScreen;
