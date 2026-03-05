/**
 * App.tsx - Refactored Version
 *
 * This is a clean, refactored version of the original App.tsx
 * All logic is properly separated into:
 * - Constants (colors, data)
 * - Components (primitives, layout, screens)
 * - Types (TypeScript interfaces)
 * - Utilities (helper functions)
 *
 * The main App is now just a state manager and router
 */

import React, { useState } from "react";
import {
    HomeScreen,
    CheckinScreen,
    ResultScreen,
    LearnScreen,
    ContentReaderScreen,
    HelpScreen,
    HelpDetailScreen,
    SettingsScreen,
} from "./screens";
import type { ScreenType, ResultType, ContentItem, HelpResource } from "./types";

type AppState = {
    activeScreen: ScreenType;
    resultType: ResultType;
    openContent: ContentItem | null;
    openResource: HelpResource | null;
};

export function App() {
    const [state, setState] = useState<AppState>({
        activeScreen: "home",
        resultType: "good",
        openContent: null,
        openResource: null,
    });

    const navigate = (screen: ScreenType) => {
        setState((prev) => ({
            ...prev,
            activeScreen: screen,
        }));
    };

    const handleCheckinComplete = (type: ResultType, concerns: string[]) => {
        setState((prev) => ({
            ...prev,
            resultType: type,
            openContent: null,
            activeScreen: "result",
        }));
    };

    const handleBack = () => {
        const previousScreen: Record<ScreenType, ScreenType> = {
            home: "home",
            checkin: "home",
            result: "home",
            learn: "home",
            content: "learn",
            help: "home",
            "help-detail": "help",
            settings: "home",
        };

        setState((prev) => ({
            ...prev,
            activeScreen: previousScreen[prev.activeScreen],
            openContent: null,
            openResource: null,
        }));
    };

    const handleOpenContent = (content: ContentItem) => {
        setState((prev) => ({
            ...prev,
            openContent: content,
            activeScreen: "content",
        }));
    };

    const handleOpenResource = (resource: HelpResource) => {
        setState((prev) => ({
            ...prev,
            openResource: resource,
            activeScreen: "help-detail",
        }));
    };

    return (
        <div className="w-screen h-screen bg-[#F8F9F7]">
            {state.activeScreen === "home" && <HomeScreen onNavigate={navigate} />}

            {state.activeScreen === "checkin" && (
                <CheckinScreen onComplete={handleCheckinComplete} onBack={() => navigate("home")} />
            )}

            {state.activeScreen === "result" && (
                <ResultScreen type={state.resultType} onNavigate={navigate} />
            )}

            {state.activeScreen === "learn" && (
                <LearnScreen onNavigate={navigate} onOpenContent={handleOpenContent} />
            )}

            {state.activeScreen === "content" && (
                <ContentReaderScreen content={state.openContent} onBack={handleBack} />
            )}

            {state.activeScreen === "help" && (
                <HelpScreen
                    onNavigate={navigate}
                    resultType={state.resultType}
                    onOpenResource={handleOpenResource}
                />
            )}

            {state.activeScreen === "help-detail" && (
                <HelpDetailScreen resource={state.openResource} onBack={handleBack} />
            )}

            {state.activeScreen === "settings" && <SettingsScreen onNavigate={navigate} />}
        </div>
    );
}

export default App;
