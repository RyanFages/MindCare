/**
 * Home Screen
 * First screen shown to users with daily check-in prompt and quick actions
 */

import React from "react";
import {
    BookOpen,
    HeartHandshake,
    Volume2,
    Calendar,
    PlayCircle,
} from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { BottomBar } from "../components/layout/BottomBar";
import {
    H1,
    H2,
    TextBody,
    Card,
    Button,
    BrandLogo,
} from "../components/primitives";
import { cn } from "../lib/cn";
import { COLORS } from "../constants/theme";
import type { ScreenType } from "../types";

interface HomeScreenProps {
    onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
    const quickActions = [
        {
            label: "Comprendre",
            icon: BookOpen,
            color: "bg-[#9EB7C4]",
            target: "learn" as ScreenType,
        },
        {
            label: "Parler",
            icon: HeartHandshake,
            color: "bg-[#B9A7BB]",
            target: "help" as ScreenType,
        },
        {
            label: "Respirer",
            icon: Volume2,
            color: "bg-[#A5C8B2]",
            target: "learn" as ScreenType,
        },
    ];

    return (
        <Screen
            bottomBar={<BottomBar activeTab="home" onNavigate={onNavigate} />}
        >
            {/* Header */}
            <div className="pt-8 pb-6 px-4 flex flex-col items-center text-center bg-gradient-to-b from-[#F8F9F7] via-white to-[#F8F9F7]">
                <BrandLogo size="small" className="mb-6 w-8 h-8" />
                <H1 className="mb-2 text-[32px]">Bonjour, Sarah</H1>
                <TextBody className="text-[#5F6368] text-[16px]">
                    Comment te sens-tu aujourd'hui ?
                </TextBody>
            </div>

            <div className="px-4 space-y-8">
                {/* Main Check-in Card */}
                <Card
                    className="p-6 bg-[#1F1F1F] text-white relative overflow-hidden shadow-lg"
                    onClick={() => onNavigate("checkin")}
                >
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm">
                            <Calendar size={24} />
                        </div>
                        <H2 className="text-white text-[22px] mb-2">
                            Ton moment
                        </H2>
                        <TextBody className="text-white/70 mb-8 font-light">
                            2 minutes pour toi, maintenant.
                        </TextBody>

                        <Button
                            variant="primary"
                            className="w-full bg-[#F2B9A0] text-[#1F1F1F] border-none h-14 text-[18px] shadow-[0_4px_14px_rgba(242,185,160,0.4)]"
                        >
                            Commencer
                        </Button>
                    </div>

                    {/* Ambient Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F] to-[#2D3136] z-0"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7EA38B]/10 rounded-full blur-3xl pointer-events-none"></div>
                </Card>

                {/* Quick Actions Bar */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => onNavigate(action.target)}
                            className="flex items-center gap-3 pl-2 pr-5 py-2 bg-white border border-[#E6E7E3] rounded-full shadow-sm active:scale-95 transition-transform whitespace-nowrap shrink-0"
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                                    action.color,
                                )}
                            >
                                <action.icon size={16} />
                            </div>
                            <span className="font-['Manrope'] font-medium text-[#1F1F1F] text-[15px]">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* For You Today Section */}
                <div className="pb-4">
                    <H2 className="mb-4 text-[20px] px-1">
                        Pour toi aujourd'hui
                    </H2>

                    <div className="space-y-4">
                        <Card
                            className="flex items-center p-4 gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                            onClick={() => onNavigate("learn")}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1766832858735-b3740223153e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                                className="w-16 h-16 rounded-[12px] object-cover"
                                alt="Nature"
                            />
                            <div className="flex-1">
                                <h4 className="font-['Manrope'] font-medium text-[#1F1F1F] text-[16px]">
                                    Respiration guidée
                                </h4>
                                <p className="font-['Inter'] text-[13px] text-[#5F6368] mt-1">
                                    5 min • Relaxation
                                </p>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-[#F8F9F7] flex items-center justify-center text-[#1F1F1F]">
                                <PlayCircle size={20} />
                            </button>
                        </Card>

                        {/* Kindness Quote Card */}
                        <div className="px-4 py-6 rounded-[20px] bg-[#F8F9F7] border border-[#E6E7E3] text-center border-dashed">
                            <p className="font-['Manrope'] text-[#5F6368] text-[14px] italic leading-relaxed">
                                "Tu n'as rien à réussir ici. Juste être là."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Screen>
    );
};
