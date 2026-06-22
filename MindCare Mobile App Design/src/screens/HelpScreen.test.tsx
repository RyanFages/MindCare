import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HelpScreen from "@/screens/HelpScreen";
import { renderWithProviders } from "@/test/test-utils";

describe("HelpScreen", () => {
    it("renders emergency resource 3114 when support is needed", () => {
        renderWithProviders(
            <HelpScreen
                onNavigate={() => {}}
                resultType="support"
                onOpenResource={() => {}}
            />,
        );

        expect(screen.getByText("3114")).toBeInTheDocument();
        expect(screen.getByText("Urgence")).toBeInTheDocument();
    });
});
