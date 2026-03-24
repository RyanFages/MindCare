import { useEffect, useState } from "react";
import { Plus, BookText, Trash2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Screen from "@/components/mindcare/Screen";
import BottomBar from "@/components/mindcare/BottomBar";
import TopBar from "@/components/mindcare/TopBar";
import McCard from "@/components/mindcare/McCard";
import McButton from "@/components/mindcare/McButton";
import { H2, TextBody } from "@/components/mindcare/Typography";
import {
    getAllEntries,
    addEntry,
    deleteEntry,
    type JournalEntry,
} from "@/lib/journalTracker";

interface JournalScreenProps {
    onNavigate: (screen: string) => void;
    onBack: () => void;
}

const JournalScreen = ({ onNavigate, onBack }: JournalScreenProps) => {
    const { t } = useLanguage();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isWriting, setIsWriting] = useState(false);
    const [text, setText] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const loadEntries = async () => {
            const loaded = await getAllEntries();
            setEntries(loaded);
        };

        void loadEntries();
    }, []);

    const handleSave = async () => {
        if (!text.trim()) return;
        await addEntry(text.trim());
        setText("");
        setIsWriting(false);
        setEntries(await getAllEntries());
    };

    const handleDelete = async (id: string) => {
        await deleteEntry(id);
        setEntries(await getAllEntries());
        if (expandedId === id) setExpandedId(null);
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Screen
            bottomBar={<BottomBar activeTab="home" onNavigate={onNavigate} />}
        >
            <TopBar title={t("journal.title")} showBack onBack={onBack} />

            <div className="px-4 space-y-6 pb-4">
                {/* New entry */}
                {isWriting ? (
                    <McCard className="p-4 space-y-4">
                        <H2 className="text-[18px]">
                            {t("journal.new-entry.title")}
                        </H2>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t("journal.new-entry.placeholder")}
                            className="w-full min-h-[140px] bg-muted/50 border border-border rounded-2xl p-4 text-foreground text-[15px] font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <McButton
                                variant="secondary"
                                className="flex-1"
                                onClick={() => {
                                    setIsWriting(false);
                                    setText("");
                                }}
                            >
                                {t("journal.button.cancel")}
                            </McButton>
                            <McButton
                                variant="primary"
                                className="flex-1"
                                onClick={handleSave}
                                disabled={!text.trim()}
                            >
                                {t("journal.button.save")}
                            </McButton>
                        </div>
                    </McCard>
                ) : (
                    <McCard
                        className="p-5 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform border-dashed border-2 border-primary/30 bg-primary/5"
                        onClick={() => setIsWriting(true)}
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Plus size={24} className="text-primary" />
                        </div>
                        <div>
                            <h4 className="font-display font-medium text-foreground text-[16px]">
                                {t("journal.new-entry.button")}
                            </h4>
                            <p className="font-body text-[13px] text-muted-foreground">
                                {t("journal.new-entry.subtitle")}
                            </p>
                        </div>
                    </McCard>
                )}

                {/* Past entries */}
                {entries.length > 0 ? (
                    <div className="space-y-3">
                        <H2 className="text-[18px] px-1">
                            {t("journal.entries.title")}
                        </H2>
                        {entries.map((entry) => {
                            const isExpanded = expandedId === entry.id;
                            return (
                                <McCard
                                    key={entry.id}
                                    className="p-4 space-y-2"
                                >
                                    <button
                                        onClick={() =>
                                            setExpandedId(
                                                isExpanded ? null : entry.id,
                                            )
                                        }
                                        className="w-full flex items-center justify-between"
                                    >
                                        <div className="text-left">
                                            <p className="font-display font-medium text-foreground text-[14px] capitalize">
                                                {formatDate(entry.date)}
                                            </p>
                                            <p className="font-body text-[12px] text-muted-foreground">
                                                {formatTime(entry.date)}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            size={18}
                                            className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                                        />
                                    </button>
                                    {isExpanded && (
                                        <div className="pt-2 border-t border-border space-y-3">
                                            <p className="font-body text-foreground text-[14px] leading-relaxed whitespace-pre-wrap">
                                                {entry.text}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    void handleDelete(entry.id);
                                                }}
                                                className="flex items-center gap-2 text-destructive text-[13px] font-medium"
                                            >
                                                <Trash2 size={14} />
                                                {t("journal.button.delete")}
                                            </button>
                                        </div>
                                    )}
                                </McCard>
                            );
                        })}
                    </div>
                ) : !isWriting ? (
                    <div className="text-center py-12 space-y-3">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                            <BookText
                                size={28}
                                className="text-muted-foreground"
                            />
                        </div>
                        <TextBody className="text-muted-foreground">
                            {t("journal.empty.title")}
                        </TextBody>
                        <TextBody className="text-muted-foreground text-[13px]">
                            {t("journal.empty.subtitle")}
                        </TextBody>
                    </div>
                ) : null}
            </div>
        </Screen>
    );
};

export default JournalScreen;
