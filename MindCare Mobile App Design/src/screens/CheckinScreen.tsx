/**
 * Check-in Screen
 * Multi-step form to assess user's emotional state
 * Step 1: Energy level
 * Step 2: Concerns/preoccupations
 * Step 3: Mood descriptor
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    BarChart2,
    HeartHandshake,
    Activity,
    Calendar,
    CheckCircle,
} from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { TopBar } from "../components/layout/TopBar";
import { H1, TextBody, Button } from "../components/primitives";
import { cn } from "../lib/cn";
import type { ScreenType } from "../types";

interface CheckinScreenProps {
    onComplete: (result: "good" | "support", concerns: string[]) => void;
    onBack: () => void;
}

export const CheckinScreen = ({ onComplete, onBack }: CheckinScreenProps) => {
    const [step, setStep] = useState(1);
    const [energy, setEnergy] = useState(50);
    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const concernOptions = [
        {
            id: "work",
            label: "Travail",
            icon: BarChart2,
            color: "bg-[#A5C8B2]",
        },
        {
            id: "family",
            label: "Famille",
            icon: HeartHandshake,
            color: "bg-[#F2B9A0]",
        },
        { id: "health", label: "Santé", icon: Activity, color: "bg-[#9EB7C4]" },
        {
            id: "future",
            label: "Avenir",
            icon: Calendar,
            color: "bg-[#B9A7BB]",
        },
        {
            id: "none",
            label: "Rien de spécial",
            icon: CheckCircle,
            color: "bg-[#7EA38B]",
        },
    ];

    const moodOptions = [
        { label: "Calme", type: "good" },
        { label: "Motivé", type: "good" },
        { label: "Reconnaissant", type: "good" },
        { label: "Excité", type: "good" },
        { label: "Anxieux", type: "support" },
        { label: "Fatigué", type: "support" },
        { label: "Triste", type: "support" },
        { label: "Perdu", type: "support" },
    ];

    const handleConcernToggle = (id: string) => {
        if (id === "none") {
            if (selectedConcerns.includes("none")) {
                setSelectedConcerns([]);
            } else {
                setSelectedConcerns(["none"]);
            }
        } else {
            let newConcerns = [...selectedConcerns];
            if (newConcerns.includes("none")) {
                newConcerns = [];
            }

            if (newConcerns.includes(id)) {
                newConcerns = newConcerns.filter((c) => c !== id);
            } else {
                newConcerns.push(id);
            }
            setSelectedConcerns(newConcerns);
        }
    };

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Determine support needed
            const specificConcernsCount = selectedConcerns.filter(
                (c) => c !== "none",
            ).length;
            const isSupport = specificConcernsCount >= 2 || energy < 30;
            onComplete(isSupport ? "support" : "good", selectedConcerns);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        else onBack();
    };

    return (
        <Screen>
            <div className="min-h-full flex flex-col">
                <TopBar
                    title={`Check-in ${step}/3`}
                    showBack
                    onBack={prevStep}
                    rightAction={
                        <button onClick={onBack}>
                            <X size={24} className="text-[#9AA0A6]" />
                        </button>
                    }
                />

                {/* Progress Bar */}
                <div className="h-1 bg-[#F0F0F0] w-full shrink-0">
                    <motion.div
                        className="h-full bg-[#7EA38B]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="flex-1 px-6 pt-8 flex flex-col pb-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1"
                        >
                            {step === 1 && (
                                <>
                                    <H1 className="mb-4 text-[28px]">
                                        Comment est votre énergie ?
                                    </H1>
                                    <TextBody className="text-[#5F6368] mb-12">
                                        Déplacez le curseur selon votre ressenti
                                        du moment.
                                    </TextBody>

                                    <div className="py-10 px-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={energy}
                                            onChange={(e) =>
                                                setEnergy(
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            className="w-full h-2 bg-[#E6E7E3] rounded-lg appearance-none cursor-pointer accent-[#7EA38B]"
                                        />
                                        <div className="flex justify-between mt-4 text-[13px] text-[#9AA0A6] font-medium font-['Inter']">
                                            <span>Faible</span>
                                            <span>Au top</span>
                                        </div>
                                        <div className="mt-8 text-center text-[40px] font-medium font-['Manrope'] text-[#1F1F1F]">
                                            {energy}%
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <H1 className="mb-4 text-[28px]">
                                        Qu'est-ce qui vous préoccupe ?
                                    </H1>
                                    <TextBody className="text-[#5F6368] mb-8">
                                        Sélectionnez ce qui s'applique.
                                    </TextBody>

                                    <div className="space-y-3">
                                        {concernOptions.map((item) => {
                                            const isSelected =
                                                selectedConcerns.includes(
                                                    item.id,
                                                );
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleConcernToggle(
                                                            item.id,
                                                        )
                                                    }
                                                    className={cn(
                                                        "w-full p-4 rounded-[20px] border flex items-center gap-4 transition-all active:scale-[0.99] font-['Inter']",
                                                        isSelected
                                                            ? "bg-[#7EA38B] border-[#7EA38B] shadow-md translate-y-[-2px]"
                                                            : "bg-white border-[#E6E7E3] text-[#1F1F1F] hover:bg-[#F8F9F7]",
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                                            isSelected
                                                                ? "bg-white/20 text-white"
                                                                : cn(
                                                                      item.color,
                                                                      "text-[#1F1F1F]",
                                                                  ),
                                                        )}
                                                    >
                                                        <Icon size={20} />
                                                    </div>
                                                    <span
                                                        className={cn(
                                                            "font-semibold text-[16px]",
                                                            isSelected
                                                                ? "text-white"
                                                                : "text-[#1F1F1F]",
                                                        )}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <H1 className="mb-4 text-[28px]">
                                        Un mot pour décrire l'instant ?
                                    </H1>
                                    <div className="flex flex-wrap gap-3">
                                        {moodOptions.map((mood) => (
                                            <button
                                                key={mood.label}
                                                onClick={() =>
                                                    setSelectedMood(mood.label)
                                                }
                                                className={cn(
                                                    "px-5 py-3 rounded-full border transition-colors font-['Inter']",
                                                    selectedMood === mood.label
                                                        ? "bg-[#1F1F1F] text-white border-[#1F1F1F]"
                                                        : "bg-white border-[#E6E7E3] text-[#1F1F1F] hover:bg-[#F8F9F7]",
                                                )}
                                            >
                                                {mood.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <Button
                        onClick={nextStep}
                        fullWidth
                        variant="primary"
                        className={cn(
                            "bg-[#F2B9A0] text-[#1F1F1F] mt-auto transition-opacity",
                            step === 2 &&
                                selectedConcerns.length === 0 &&
                                "opacity-50 pointer-events-none",
                        )}
                    >
                        {step === 3 ? "Terminer" : "Continuer"}
                    </Button>
                </div>
            </div>
        </Screen>
    );
};
