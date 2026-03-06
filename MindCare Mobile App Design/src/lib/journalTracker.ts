export interface JournalEntry {
  id: string;
  text: string;
  date: string; // ISO string
}

const STORAGE_KEY = 'mindcare_journal';

function getEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getAllEntries(): JournalEntry[] {
  return getEntries().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addEntry(text: string): JournalEntry {
  const entry: JournalEntry = {
    id: crypto.randomUUID(),
    text,
    date: new Date().toISOString(),
  };
  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
  return entry;
}

export function deleteEntry(id: string) {
  const entries = getEntries().filter(e => e.id !== id);
  saveEntries(entries);
}
