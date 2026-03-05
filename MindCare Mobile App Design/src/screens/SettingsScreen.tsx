/**
 * Settings Screen
 * User settings and preferences
 */

import React from "react";
import {
    Bell,
    Lock,
    CreditCard,
    Paintbrush,
    Languages,
    Info,
} from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { BottomBar } from "../components/layout/BottomBar";
import {
    H1,
    TextBody,
    Card,
    Button,
    BrandLogo,
} from "../components/primitives";
import { SettingItem } from "../components/common/SettingItem";
import type { ScreenType } from "../types";

interface SettingsScreenProps {
    onNavigate: (screen: ScreenType) => void;
}

export const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
    return (
        <Screen
            bottomBar={
                <BottomBar activeTab="settings" onNavigate={onNavigate} />
            }
        >
            <div className="pt-2 px-4 pb-8">
                {/* Header */}
                <div className="mb-8 mt-4">
                    <H1>Réglages</H1>
                </div>

                {/* Profile Card */}
                <Card className="p-4 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#A5C8B2] flex items-center justify-center text-[#1F1F1F] font-bold text-xl font-['Manrope']">
                            S
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1F1F1F] font-['Manrope']">
                                Sarah Martin
                            </h3>
                            <TextBody className="text-[14px] text-[#5F6368]">
                                sarah.m@email.com
                            </TextBody>
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => console.log("Edit profile")}
                    >
                        Modifier le profil
                    </Button>
                </Card>

                {/* Account Section */}
                <section>
                    <h3 className="text-[14px] font-semibold text-[#9AA0A6] uppercase tracking-wider mb-3 pl-2 font-['Inter']">
                        Compte
                    </h3>
                    <div className="space-y-2">
                        <SettingItem
                            icon={<Bell size={20} />}
                            label="Notifications"
                            value="Activées"
                            onClick={() => console.log("Notifications")}
                        />
                        <SettingItem
                            icon={<Lock size={20} />}
                            label="Confidentialité"
                            onClick={() => console.log("Confidentialité")}
                        />
                        <SettingItem
                            icon={<CreditCard size={20} />}
                            label="Abonnement"
                            value="Gratuit"
                            onClick={() => console.log("Abonnement")}
                        />
                    </div>
                </section>

                {/* Application Section */}
                <section className="mt-6">
                    <h3 className="text-[14px] font-semibold text-[#9AA0A6] uppercase tracking-wider mb-3 pl-2 font-['Inter']">
                        Application
                    </h3>
                    <div className="space-y-2">
                        <SettingItem
                            icon={<Paintbrush size={20} />}
                            label="Apparence"
                            value="Clair"
                            onClick={() => console.log("Apparence")}
                        />
                        <SettingItem
                            icon={<Languages size={20} />}
                            label="Langue"
                            value="Français"
                            onClick={() => console.log("Langue")}
                        />
                        <SettingItem
                            icon={<Info size={20} />}
                            label="À propos"
                            onClick={() => console.log("À propos")}
                        />
                    </div>
                </section>

                {/* Footer Logo */}
                <div className="flex justify-center mt-8 mb-4">
                    <BrandLogo size="small" className="opacity-50 grayscale" />
                </div>
            </div>
        </Screen>
    );
};
