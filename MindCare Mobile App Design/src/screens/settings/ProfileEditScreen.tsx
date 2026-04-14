import { useEffect, useState } from "react";
import { Settings, Lock } from "lucide-react";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McButton from "@/components/mindcare/McButton";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";

interface ProfileEditScreenProps {
    onBack: () => void;
}

const ProfileEditScreen = ({ onBack }: ProfileEditScreenProps) => {
    const { t } = useLanguage();
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setName(user?.name ?? "");
        setEmail(user?.email ?? "");
    }, [user]);

    const handleSave = async () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail || isSaving) {
            setError(t("error.occurred"));
            return;
        }

        setError(null);
        setIsSaving(true);

        const saved = await updateProfile(trimmedName, trimmedEmail);
        setIsSaving(false);

        if (saved) {
            onBack();
            return;
        }

        setError(t("error.occurred"));
    };

    return (
        <Screen className="bg-card">
            <TopBar title={t("profile.title")} showBack onBack={onBack} />
            <div className="px-6 pt-6 pb-6 flex flex-col h-full">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-3xl font-display">
                            {name?.[0]?.toUpperCase()}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center border-2 border-card">
                            <Settings size={14} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    <div>
                        <label className="block text-[13px] font-medium text-muted-foreground mb-1 ml-1">
                            {t("profile.label.firstname")}
                        </label>
                        <input
                            type="text"
                            placeholder={t("profile.placeholder.firstname")}
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            className="w-full h-12 px-4 rounded-[12px] bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-muted-foreground mb-1 ml-1">
                            {t("profile.label.email")}
                        </label>
                        <input
                            type="email"
                            placeholder={t("profile.placeholder.email")}
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            className="w-full h-12 px-4 rounded-[12px] bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <div className="mt-auto pb-6">
                    {error && (
                        <p className="text-center text-[12px] text-destructive mb-3">
                            {error}
                        </p>
                    )}
                    <p className="text-center text-[12px] text-mc-text-muted mb-4 flex items-center justify-center gap-2">
                        <Lock size={12} /> {t("profile.description")}
                    </p>
                    <McButton
                        fullWidth
                        onClick={() => {
                            void handleSave();
                        }}
                        variant="primary"
                        disabled={isSaving || !name.trim() || !email.trim()}
                    >
                        {isSaving
                            ? t("button.loading")
                            : t("profile.button.save")}
                    </McButton>
                </div>
            </div>
        </Screen>
    );
};

export default ProfileEditScreen;
