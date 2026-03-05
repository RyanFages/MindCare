/**
 * Resource Card Component
 * Displays help resources with action buttons
 */

import React from "react";
import { Clock } from "lucide-react";
import { Card, Button } from "../primitives";
import { cn } from "../../lib/cn";
import type { HelpResource } from "../../types";

interface ResourceCardProps {
    resource: HelpResource;
    onOpenDetail?: () => void;
    onCall?: () => void;
}

export const ResourceCard = ({
    resource,
    onOpenDetail,
    onCall,
}: ResourceCardProps) => {
    return (
        <Card className="p-4 mb-3 active:scale-[0.99] transition-transform">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-[16px] font-['Manrope'] text-[#1F1F1F]">
                        {resource.name}
                    </h3>
                    <p className="text-[13px] text-[#5F6368] mt-1 line-clamp-2">
                        {resource.shortDesc}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {resource.badges.slice(0, 3).map((badge: string, i: number) => (
                    <span
                        key={i}
                        className="text-[10px] font-medium text-[#5F6368] bg-[#F8F9F7] px-2 py-1 rounded-md border border-[#E6E7E3]"
                    >
                        {badge}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F8F9F7]">
                <span className="text-[11px] font-medium text-[#7EA38B] bg-[#7EA38B]/10 px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock size={10} /> {resource.hours}
                </span>
                <div className="flex gap-2">
                    {onOpenDetail && (
                        <Button
                            onClick={onOpenDetail}
                            variant="secondary"
                            className="h-8 px-3 text-[12px] font-medium"
                        >
                            Fiche
                        </Button>
                    )}
                    {resource.phone && onCall && (
                        <Button
                            onClick={onCall}
                            variant="primary"
                            className="h-8 px-4 text-[12px] font-medium bg-[#F2B9A0]"
                        >
                            Appeler
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};
