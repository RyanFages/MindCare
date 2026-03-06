const STORAGE_KEY = 'mindcare_read_content';

export function getReadContentIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function isContentRead(id: string): boolean {
  return getReadContentIds().has(id);
}

export function markContentRead(id: string): void {
  const ids = getReadContentIds();
  ids.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}
