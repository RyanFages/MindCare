import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
    addEntry,
    deleteEntry,
    getAllEntries,
    updateEntry,
    type JournalEntry,
} from "@/lib/journalTracker";

const fakeUser = { email: "tester@example.com" };

const stubLocalStorageUser = () => {
    localStorage.setItem("mindcare_user", JSON.stringify(fakeUser));
};

describe("journalTracker API", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns empty list when no user is authenticated", async () => {
        const entries = await getAllEntries();
        expect(entries).toEqual([]);
    });

    it("adds, updates and deletes an entry with authenticated user", async () => {
        stubLocalStorageUser();

        const fakeEntry: JournalEntry = {
            id: "entry-1",
            text: "hello journal",
            date: new Date().toISOString(),
        };

        vi.stubGlobal(
            "fetch",
            vi
                .fn()
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ entry: fakeEntry }),
                })
                .mockResolvedValueOnce({ ok: true })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({
                        entry: { ...fakeEntry, text: "updated" },
                    }),
                }),
        );

        const added = await addEntry("hello journal");
        expect(added).toEqual(fakeEntry);

        const deleted = await deleteEntry(fakeEntry.id);
        expect(deleted).toBe(true);

        const updated = await updateEntry(fakeEntry.id, "updated");
        expect(updated).toEqual({ ...fakeEntry, text: "updated" });
    });
});
