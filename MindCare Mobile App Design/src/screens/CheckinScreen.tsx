import { useState } from "react";
import {
    BarChart2,
    HeartHandshake,
    Activity,
    Calendar,
    CheckCircle,
    X,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Screen from "@/components/mindcare/Screen";
import TopBar from "@/components/mindcare/TopBar";
import McButton from "@/components/mindcare/McButton";
import { H1, TextBody } from "@/components/mindcare/Typography";

interface CheckinScreenProps {
    onComplete: (
        result: "balanced" | "watch" | "support",
        concerns: string[],
    ) => void;
    onBack: () => void;
}

const CheckinScreen = ({ onComplete, onBack }: CheckinScreenProps) => {
    const [step, setStep] = useState(1);
    const [energy, setEnergy] = useState(50);
    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const concernOptions = [
        {
            id: "work",
            label: "Travail",
            icon: BarChart2,
            color: "bg-secondary",
        },
        {
            id: "family",
            label: "Famille",
            icon: HeartHandshake,
            color: "bg-mc-peach",
        },
        {
            id: "health",
            label: "Santé",
            icon: Activity,
            color: "bg-mc-blue-light",
        },
        {
            id: "future",
            label: "Avenir",
            icon: Calendar,
            color: "bg-mc-purple",
        },
        {
            id: "none",
            label: "Rien de spécial",
            icon: CheckCircle,
            color: "bg-primary",
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
            setSelectedConcerns(
                selectedConcerns.includes("none") ? [] : ["none"],
            );
        } else {
            let newConcerns = selectedConcerns.filter((c) => c !== "none");
            if (newConcerns.includes(id)) {
                newConcerns = newConcerns.filter((c) => c !== id);
            } else {
                newConcerns.push(id);
            }
            setSelectedConcerns(newConcerns);
        }
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else {
            const specificConcernsCount = selectedConcerns.filter(
                (c) => c !== "none",
            ).length;
            let result: "balanced" | "watch" | "support";
            if (specificConcernsCount >= 2 || energy < 25) {
                result = "support";
            } else if (specificConcernsCount === 1 || energy < 50) {
                result = "watch";
            } else {
                result = "balanced";
            }
            const concernLabels = selectedConcerns.map((id) => {
                if (id === "none") return "Rien de spécial";
                return concernOptions.find((opt) => opt.id === id)?.label || id;
            });
            onComplete(result, concernLabels);
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
                            <X size={24} className="text-mc-text-muted" />
                        </button>
                    }
                />
                {/* Progress Bar */}
                <div className="h-1 bg-muted w-full shrink-0">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="flex-1 px-6 pt-8 flex flex-col pb-10">
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
                                <TextBody className="text-muted-foreground mb-12">
                                    Déplacez le curseur selon votre ressenti du
                                    moment.
                                </TextBody>
                                <div className="py-10 px-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={energy}
                                        onChange={(e) =>
                                            setEnergy(parseInt(e.target.value))
                                        }
                                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between mt-4 text-[13px] text-mc-text-muted font-medium font-body">
                                        <span>Faible</span>
                                        <span>Au top</span>
                                    </div>
                                    <div className="mt-8 text-center text-[40px] font-medium font-display text-foreground">
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
                                <TextBody className="text-muted-foreground mb-8">
                                    Sélectionnez ce qui s'applique.
                                </TextBody>
                                <div className="space-y-3">
                                    {concernOptions.map((item) => {
                                        const isSelected =
                                            selectedConcerns.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    handleConcernToggle(item.id)
                                                }
                                                className={cn(
                                                    "w-full p-4 rounded-[20px] border flex items-center gap-4 transition-all active:scale-[0.99] font-body",
                                                    isSelected
                                                        ? "bg-primary border-primary shadow-md translate-y-[-2px]"
                                                        : "bg-card border-border text-foreground hover:bg-background",
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                                        isSelected
                                                            ? "bg-white/20 text-primary-foreground"
                                                            : cn(
                                                                  item.color,
                                                                  "text-foreground",
                                                              ),
                                                    )}
                                                >
                                                    <item.icon size={20} />
                                                </div>
                                                <span
                                                    className={cn(
                                                        "font-semibold text-[16px]",
                                                        isSelected
                                                            ? "text-primary-foreground"
                                                            : "text-foreground",
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
                                                "px-5 py-3 rounded-full border transition-colors font-body",
                                                selectedMood === mood.label
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-card border-border text-foreground hover:bg-muted",
                                            )}
                                        >
                                            {mood.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>

                    <McButton
                        onClick={nextStep}
                        fullWidth
                        variant="primary"
                        className={cn(
                            "mt-auto transition-opacity",
                            step === 2 &&
                                selectedConcerns.length === 0 &&
                                "opacity-50 pointer-events-none",
                        )}
                    >
                        {step === 3 ? "Terminer" : "Continuer"}
                    </McButton>
                </div>
            </div>
        </Screen>
    );
};

export default CheckinScreen;
