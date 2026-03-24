export interface JournalEntry {
    id: string;
    text: string;
    date: string; // ISO string
}

const API_BASE_URL =
    (import.meta.env.VITE_API_URL as string | undefined) ||
    "http://localhost:3000/api";

function getCurrentUserEmail(): string | null {
    try {
        const raw = localStorage.getItem("mindcare_user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.email ? String(parsed.email) : null;
    } catch {
        return null;
    }
}

export async function getAllEntries(): Promise<JournalEntry[]> {
    const email = getCurrentUserEmail();
    if (!email) return [];

    try {
        const response = await fetch(
            `${API_BASE_URL}/journals?email=${encodeURIComponent(email)}`,
        );
        if (!response.ok) return [];

        const data = await response.json();
        return Array.isArray(data.entries) ? data.entries : [];
    } catch {
        return [];
    }
}

export async function addEntry(text: string): Promise<JournalEntry | null> {
    const email = getCurrentUserEmail();
    if (!email) return null;

    try {
        const response = await fetch(`${API_BASE_URL}/journals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, text }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data.entry || null;
    } catch {
        return null;
    }
}

export async function deleteEntry(id: string): Promise<boolean> {
    const email = getCurrentUserEmail();
    if (!email) return false;

    try {
        const response = await fetch(
            `${API_BASE_URL}/journals/${encodeURIComponent(id)}?email=${encodeURIComponent(email)}`,
            {
                method: "DELETE",
            },
        );

        return response.ok;
    } catch {
        return false;
    }
}
