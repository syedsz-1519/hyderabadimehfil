export function formatMediaTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const totalSecs = Math.floor(seconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export interface NamedMediaItem {
  id: string;
  name?: string;
  title?: string;
  imageUrl?: string;
}

export function findMissingMediaItems(items: NamedMediaItem[]): string[] {
  return items
    .filter((item) => !item.imageUrl || item.imageUrl.trim().length === 0)
    .map((item) => item.id);
}

export function findDuplicateImageUrls(items: NamedMediaItem[]): Array<{ imageUrl: string; itemIds: string[] }> {
  const byUrl = new Map<string, string[]>();
  for (const item of items) {
    if (!item.imageUrl) continue;
    const list = byUrl.get(item.imageUrl) ?? [];
    list.push(item.id);
    byUrl.set(item.imageUrl, list);
  }
  const duplicates: Array<{ imageUrl: string; itemIds: string[] }> = [];
  for (const [imageUrl, itemIds] of byUrl.entries()) {
    if (itemIds.length > 1) {
      duplicates.push({ imageUrl, itemIds });
    }
  }
  return duplicates;
}
