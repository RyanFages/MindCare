/**
 * Help Screen
 * Mental health resources and support services
 */

import React from "react";
import { Moon, HeartHandshake, AlertTriangle, Clock } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { BottomBar } from "../components/layout/BottomBar";
import { H1, H2, TextBody } from "../components/primitives";
import { ResourceCard } from "../components/common/ResourceCard";
import { HELP_DATA } from "../constants/help";
import type { ScreenType, HelpResource } from "../types";

interface HelpScreenProps {
    onNavigate: (screen: ScreenType) => void;
    resultType: "good" | "support";
    onOpenResource: (resource: HelpResource) => void;
}

export const HelpScreen = ({
    onNavigate,
    resultType,
    onOpenResource,
}: HelpScreenProps) => {
    const isSupportNeeded = resultType === "support";

    const SectionHeader = ({ icon: Icon, title, subtitle }: any) => (
        <div className="flex items-start gap-3 mb-4 mt-6">
            <div className="w-8 h-8 rounded-full bg-[#E6E7E3] flex items-center justify-center text-[#5F6368] shrink-0">
                <Icon size={16} />
            </div>
            <div>
                <h2 className="text-[18px] font-medium font-['Manrope'] text-[#1F1F1F] leading-tight">
                    {title}
                </h2>
                <p className="text-[13px] text-[#5F6368] mt-1 leading-snug">
                    {subtitle}
                </p>
            </div>
        </div>
    );

    return (
        <Screen
            bottomBar={<BottomBar activeTab="help" onNavigate={onNavigate} />}
        >
            <div className="pt-2 px-4">
                {/* Header */}
                <div className="mb-6 mt-4">
                    <H1 className="mb-2">Aide & Soutien</H1>
                    <TextBody className="text-[#5F6368] mt-2">
                        Tu n'as pas à rester seul·e. Des professionnels et
                        bénévoles sont là pour t'écouter.
                    </TextBody>
                </div>

                {/* Alert Banner */}
                {isSupportNeeded && (
                    <div className="bg-[#FFF0F0] border border-[#FFD9D9] p-4 rounded-[16px] flex gap-3 mb-6">
                        <AlertTriangle
                            size={24}
                            className="text-[#D32F2F] shrink-0 mt-1"
                        />
                        <div>
                            <h3 className="font-bold text-[#D32F2F] text-[15px] mb-1">
                                Besoin de parler ?
                            </h3>
                            <p className="text-[13px] text-[#1F1F1F] leading-snug">
                                Tu as indiqué traverser une période difficile.
                                Ces services peuvent t'aider dès maintenant.
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-2 pb-4">
                    {/* Immediate Help */}
                    <SectionHeader
                        icon={Moon}
                        title="Écoute immédiate"
                        subtitle="Pour parler à quelqu'un maintenant, sans jugement."
                    />
                    {HELP_DATA.filter((r) => r.category === "immediate").map(
                        (r) => (
                            <ResourceCard
                                key={r.id}
                                resource={r}
                                onOpenDetail={() => onOpenResource(r)}
                            />
                        ),
                    )}

                    {/* Student Support */}
                    <SectionHeader
                        icon={HeartHandshake}
                        title="Accompagnement étudiant"
                        subtitle="Des dispositifs pensés spécifiquement pour tes besoins."
                    />
                    {HELP_DATA.filter((r) => r.category === "student").map(
                        (r) => (
                            <ResourceCard
                                key={r.id}
                                resource={r}
                                onOpenDetail={() => onOpenResource(r)}
                            />
                        ),
                    )}

                    {/* Emergency Footer */}
                    <div className="mt-8 p-4 rounded-[16px] bg-[#F8F9F7] border border-[#E6E7E3] text-center">
                        <p className="text-[12px] text-[#9AA0A6] mb-2">
                            En cas d'urgence vitale
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs">
                                    15
                                </div>
                                <span className="font-bold text-[#1F1F1F]">
                                    SAMU
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs">
                                    112
                                </div>
                                <span className="font-bold text-[#1F1F1F]">
                                    Urgences
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Screen>
    );
};
