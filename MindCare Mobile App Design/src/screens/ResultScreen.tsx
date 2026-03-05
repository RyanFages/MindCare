/**
 * Result Screen
 * Shows result of check-in with personalized message
 */

import React from "react";
import { motion } from "framer-motion";
import { BarChart2, HeartHandshake } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { H1, TextBody, Button } from "../components/primitives";
import { cn } from "../lib/cn";
import type { ScreenType } from "../types";

interface ResultScreenProps {
    type: "good" | "support";
    concerns?: string[];
    onNavigate: (screen: ScreenType) => void;
}

export const ResultScreen = ({
    type,
    concerns = [],
    onNavigate,
}: ResultScreenProps) => {
    const isGood = type === "good";

    const getDynamicText = () => {
        if (isGood) {
            return "Votre énergie est au beau fixe. Profitez de ce moment pour explorer nos contenus.";
        }

        const labels = concerns.filter((c) => c !== "none");

        if (labels.length === 0) {
            return "Il semble que ce soit une journée difficile. Nous avons des ressources pour vous aider.";
        }

        const mapText: Record<string, string> = {
            work: "ton travail",
            family: "la famille",
            health: "la santé",
            future: "ce qui t'attend",
        };

        if (labels.length === 1) {
            return `Tu sembles préoccupé·e par ${mapText[labels[0]]}. C'est important de prendre du recul pour mieux gérer cette situation.`;
        }

        const textParts = labels.map((l) => mapText[l]).join(" et ");
        return `Les préoccupations liées à ${textParts} peuvent s'accumuler. Il est normal de se sentir dépassé, mais vous n'êtes pas seul·e.`;
    };

    return (
        <Screen className="bg-white">
            <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center mb-8",
                        isGood ? "bg-[#7EA38B]/20" : "bg-[#6B9BB8]/20",
                    )}
                >
                    {isGood ? (
                        <BarChart2 size={48} className="text-[#7EA38B]" />
                    ) : (
                        <HeartHandshake size={48} className="text-[#6B9BB8]" />
                    )}
                </motion.div>

                <H1 className="mb-4 text-[28px]">
                    {isGood
                        ? "Tout semble aller bien !"
                        : "Besoin d'un peu de soutien ?"}
                </H1>

                <TextBody className="text-[#5F6368] mb-12 max-w-xs mx-auto">
                    {getDynamicText()}
                </TextBody>

                <div className="w-full space-y-4">
                    <Button
                        onClick={() => onNavigate("learn")}
                        fullWidth
                        variant="primary"
                        className="bg-[#F2B9A0] text-[#1F1F1F]"
                    >
                        {isGood
                            ? "Explorer les contenus"
                            : "Voir les ressources"}
                    </Button>
                    <Button
                        onClick={() => onNavigate("home")}
                        fullWidth
                        variant="ghost"
                    >
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        </Screen>
    );
};
