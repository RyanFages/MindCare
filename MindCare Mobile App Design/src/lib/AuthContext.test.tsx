import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useAuth } from "@/lib/AuthContext";
import { renderWithProviders } from "@/test/test-utils";
import { useEffect } from "react";

const TestAuthConsumer = ({
    onResult,
}: {
    onResult: (value: boolean) => void;
}) => {
    const { login, signup } = useAuth();

    useEffect(() => {
        const run = async () => {
            const result = await login("test@example.com", "password123");
            onResult(result);
        };
        void run();
    }, [login, onResult]);

    return <div>auth</div>;
};

describe("AuthContext", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("logs in successfully and stores user data", async () => {
        const fakeUser = { email: "test@example.com", name: "Test User" };
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ user: fakeUser }),
            }),
        );

        const resultSpy = vi.fn();

        renderWithProviders(<TestAuthConsumer onResult={resultSpy} />);

        await waitFor(() => {
            expect(resultSpy).toHaveBeenCalledWith(true);
        });

        expect(localStorage.getItem("mindcare_user")).toBe(
            JSON.stringify(fakeUser),
        );
    });

    it("returns false when login fails with 401", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                status: 401,
                statusText: "Unauthorized",
                text: async () => "Unauthorized",
            }),
        );

        const resultSpy = vi.fn();

        renderWithProviders(<TestAuthConsumer onResult={resultSpy} />);

        await waitFor(() => {
            expect(resultSpy).toHaveBeenCalledWith(false);
        });

        expect(localStorage.getItem("mindcare_user")).toBeNull();
    });
});
