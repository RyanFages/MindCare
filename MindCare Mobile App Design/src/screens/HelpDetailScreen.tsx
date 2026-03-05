/**
 * Help Detail Screen
 * Display full details of a help resource
 */

import React from "react";
import {
    HeartHandshake,
    Info,
    Clock,
    Shield,
    Lock,
    Globe,
    Phone,
    X,
} from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { TopBar } from "../components/layout/TopBar";
import { H1, Button } from "../components/primitives";
import { cn } from "../lib/cn";
import type { HelpResource } from "../types";

interface HelpDetailScreenProps {
    resource: HelpResource | null;
    onBack: () => void;
}

export const HelpDetailScreen = ({
    resource,
    onBack,
}: HelpDetailScreenProps) => {
    if (!resource) return null;

    return (
        <Screen className="bg-white">
            <TopBar showBack onBack={onBack} title="Fiche Ressource" />

            <div className="px-6 py-6 pb-24">
                {/* Icon Header */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#F8F9F7] flex items-center justify-center text-[#1F1F1F] shadow-inner">
                        <HeartHandshake size={32} className="text-[#7EA38B]" />
                    </div>
                </div>

                {/* Title */}
                <H1 className="text-center text-[28px] mb-2">
                    {resource.name}
                </H1>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {resource.badges.map((badge: string, i: number) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-[#F2B9A0]/10 text-[#D98C6C] text-[12px] font-bold uppercase tracking-wider border border-[#F2B9A0]/20"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {/* About */}
                    <section>
                        <h3 className="font-bold text-[#1F1F1F] mb-2 flex items-center gap-2">
                            <Info size={16} /> À propos
                        </h3>
                        <p className="text-[#5F6368] text-[15px] leading-relaxed">
                            {resource.fullDesc}
                        </p>
                    </section>

                    {/* Hours */}
                    <section>
                        <h3 className="font-bold text-[#1F1F1F] mb-2 flex items-center gap-2">
                            <Clock size={16} /> Horaires
                        </h3>
                        <p className="text-[#5F6368] text-[15px]">
                            {resource.fullHours}
                        </p>
                    </section>

                    {/* When to Contact */}
                    <div className="bg-[#A5C8B2]/20 p-5 rounded-[16px] border border-[#A5C8B2]/30 mt-4">
                        <h3 className="font-bold text-[#1F1F1F] mb-2 text-[15px]">
                            Quand contacter ce service ?
                        </h3>
                        <p className="text-[#1F1F1F] text-[14px] italic leading-relaxed opacity-80">
                            "{resource.whenToContact}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E6E7E3] flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {resource.website && (
                    <Button variant="secondary" className="flex-1">
                        <Globe size={18} />
                        Site web
                    </Button>
                )}
                {resource.phone && (
                    <Button variant="primary" className="flex-[2] bg-[#F2B9A0]">
                        <Phone size={18} />
                        {resource.phone}
                    </Button>
                )}
            </div>
        </Screen>
    );
};
