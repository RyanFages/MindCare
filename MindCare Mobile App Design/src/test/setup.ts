import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, "language", {
        value: "en-US",
        configurable: true,
    });
});

afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
});
