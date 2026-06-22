import { cleanup, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CheckinScreen from "@/screens/CheckinScreen";
import { renderWithProviders } from "@/test/test-utils";

const findButtonByName = async (name: RegExp) => {
    const matches = await screen.findAllByRole("button", { name });
    return matches[matches.length - 1];
};

describe("CheckinScreen", () => {
    afterEach(() => {
        cleanup();
    });

    const completeCheckin = async (concernText: RegExp, moodText: RegExp) => {
        cleanup();
        const onComplete = vi.fn();
        renderWithProviders(
            <CheckinScreen onComplete={onComplete} onBack={() => {}} />,
        );

        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(await findButtonByName(concernText));
        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(await findButtonByName(moodText));
        fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));

        return onComplete;
    };

    it("returns balanced for high energy and no specific concerns", async () => {
        const onComplete = vi.fn();

        renderWithProviders(
            <CheckinScreen onComplete={onComplete} onBack={() => {}} />,
        );

        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(
            await screen.findByRole("button", { name: /Nothing special/i }),
        );
        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(screen.getByRole("button", { name: /Calm/i }));
        fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));

        expect(onComplete).toHaveBeenCalledWith("balanced", [
            "Nothing special",
        ]);
    });

    it("returns the same score for identical responses", async () => {
        const firstResult = await completeCheckin(/Nothing special/i, /Calm/i);
        const secondResult = await completeCheckin(/Nothing special/i, /Calm/i);

        expect(firstResult).toHaveBeenCalledWith("balanced", [
            "Nothing special",
        ]);
        expect(secondResult).toHaveBeenCalledWith("balanced", [
            "Nothing special",
        ]);
    });

    it("classifies low energy at boundary in support level", async () => {
        const onCompleteLow = vi.fn();
        renderWithProviders(
            <CheckinScreen onComplete={onCompleteLow} onBack={() => {}} />,
        );

        const energyInput = screen.getByRole("slider");
        fireEvent.change(energyInput, { target: { value: "24" } });

        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(
            await screen.findByRole("button", { name: /Nothing special/i }),
        );
        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(screen.getByRole("button", { name: /Anxious/i }));
        fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));

        expect(onCompleteLow).toHaveBeenCalledWith("support", [
            "Nothing special",
        ]);
    });

    it("classifies energy 25 as watch level when one concern exists", async () => {
        const onCompleteWatch = vi.fn();
        renderWithProviders(
            <CheckinScreen onComplete={onCompleteWatch} onBack={() => {}} />,
        );

        const energyInput = screen.getByRole("slider");
        fireEvent.change(energyInput, { target: { value: "25" } });

        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(await screen.findByRole("button", { name: /Work/i }));
        fireEvent.click(screen.getByRole("button", { name: /Continuer/i }));
        fireEvent.click(screen.getByRole("button", { name: /Calm/i }));
        fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));

        expect(onCompleteWatch).toHaveBeenCalledWith("watch", ["Work"]);
    });
});
