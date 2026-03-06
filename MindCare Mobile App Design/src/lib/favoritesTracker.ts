const STORAGE_KEY = 'mindcare_favorites';

export function getFavoriteIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().has(id);
}

export function toggleFavorite(id: string): boolean {
  const ids = getFavoriteIds();
  const nowFav = !ids.has(id);
  if (nowFav) {
    ids.add(id);
  } else {
    ids.delete(id);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  return nowFav;
}
