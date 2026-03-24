import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContentItem, HelpResource } from "@/lib/constants";
import { useAuth } from "@/lib/AuthContext";

// Screens
import DisclaimerScreen from "@/screens/DisclaimerScreen";
import LoginScreen from "@/screens/LoginScreen";
import HomeScreen from "@/screens/HomeScreen";
import CheckinScreen from "@/screens/CheckinScreen";
import ResultScreen from "@/screens/ResultScreen";
import BreathingExerciseScreen from "@/screens/BreathingExerciseScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import { saveCheckinEntry } from "@/screens/HistoryScreen";
import LearnScreen from "@/screens/LearnScreen";
import ContentReaderScreen from "@/screens/ContentReaderScreen";
import HelpScreen from "@/screens/HelpScreen";
import HelpDetailScreen from "@/screens/HelpDetailScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import ProfileEditScreen from "@/screens/settings/ProfileEditScreen";
import NotificationsScreen from "@/screens/settings/NotificationsScreen";
import PrivacyScreen from "@/screens/settings/PrivacyScreen";
import SubscriptionScreen from "@/screens/settings/SubscriptionScreen";
import AppearanceScreen from "@/screens/settings/AppearanceScreen";
import LanguageScreen from "@/screens/settings/LanguageScreen";
import AboutScreen from "@/screens/settings/AboutScreen";
import JournalScreen from "@/screens/JournalScreen";

const Index = () => {
    const { isAuthenticated } = useAuth();
    const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState(() => {
        return localStorage.getItem("mindcare_disclaimer_seen") === "true";
    });
    const [currentScreen, setCurrentScreen] = useState("home");
    const [history, setHistory] = useState<string[]>(["home"]);
    const [resultType, setResultType] = useState<
        "balanced" | "watch" | "support"
    >("balanced");
    const [resultConcerns, setResultConcerns] = useState<string[]>([]);
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
        null,
    );
    const [selectedResource, setSelectedResource] =
        useState<HelpResource | null>(null);

    const handleDisclaimerAccept = () => {
        localStorage.setItem("mindcare_disclaimer_seen", "true");
        setHasSeenDisclaimer(true);
    };

    const navigate = (screen: string) => {
        setHistory((prev) => [...prev, screen]);
        setCurrentScreen(screen);
    };

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);
            setCurrentScreen(newHistory[newHistory.length - 1]);
        }
    };

    // Afficher le DisclaimerScreen si non vu
    if (!hasSeenDisclaimer) {
        return (
            <div className="h-[100dvh] w-full bg-background font-body text-foreground mx-auto max-w-md shadow-2xl overflow-hidden relative selection:bg-mc-peach">
                <DisclaimerScreen onAccept={handleDisclaimerAccept} />
            </div>
        );
    }

    // Afficher le LoginScreen si non authentifié
    if (!isAuthenticated) {
        return (
            <div className="h-[100dvh] w-full bg-background font-body text-foreground mx-auto max-w-md shadow-2xl overflow-hidden relative selection:bg-mc-peach">
                <LoginScreen onLoginSuccess={() => {}} />
            </div>
        );
    }

    return (
        <div className="h-[100dvh] w-full bg-background font-body text-foreground mx-auto max-w-md shadow-2xl overflow-hidden relative selection:bg-mc-peach">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    {currentScreen === "home" && (
                        <HomeScreen onNavigate={navigate} />
                    )}

                    {currentScreen === "checkin" && (
                        <CheckinScreen
                            onComplete={(type, concerns) => {
                                setResultType(type);
                                setResultConcerns(concerns);
                                void saveCheckinEntry(type, concerns);
                                navigate("result");
                            }}
                            onBack={goBack}
                        />
                    )}

                    {currentScreen === "result" && (
                        <ResultScreen
                            type={resultType}
                            concerns={resultConcerns}
                            onNavigate={navigate}
                        />
                    )}

                    {currentScreen === "learn" && (
                        <LearnScreen
                            onNavigate={navigate}
                            onOpenContent={(content) => {
                                setSelectedContent(content);
                                navigate("content-reader");
                            }}
                        />
                    )}

                    {currentScreen === "content-reader" && (
                        <ContentReaderScreen
                            content={selectedContent}
                            onBack={goBack}
                        />
                    )}

                    {currentScreen === "help" && (
                        <HelpScreen
                            onNavigate={navigate}
                            resultType={resultType}
                            onOpenResource={(resource) => {
                                setSelectedResource(resource);
                                navigate("help-detail");
                            }}
                        />
                    )}

                    {currentScreen === "help-detail" && (
                        <HelpDetailScreen
                            resource={selectedResource}
                            onBack={goBack}
                        />
                    )}

                    {currentScreen === "settings" && (
                        <SettingsScreen onNavigate={navigate} />
                    )}
                    {currentScreen === "breathing-exercise" && (
                        <BreathingExerciseScreen onBack={goBack} />
                    )}
                    {currentScreen === "history" && (
                        <HistoryScreen onNavigate={navigate} onBack={goBack} />
                    )}
                    {currentScreen === "profile-edit" && (
                        <ProfileEditScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-notifications" && (
                        <NotificationsScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-privacy" && (
                        <PrivacyScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-subscription" && (
                        <SubscriptionScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-appearance" && (
                        <AppearanceScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-language" && (
                        <LanguageScreen onBack={goBack} />
                    )}
                    {currentScreen === "settings-about" && (
                        <AboutScreen onBack={goBack} />
                    )}
                    {currentScreen === "journal" && (
                        <JournalScreen onNavigate={navigate} onBack={goBack} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Index;
