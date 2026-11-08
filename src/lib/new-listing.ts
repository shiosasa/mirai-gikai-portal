/** みらいぎかいっちと同じく、初掲載から14日。編集では延長しない。 */
export const NEW_LISTING_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

export function catalogStartedAt(
  listedAt: readonly (string | null | undefined)[],
): string | null {
  let earliest: number | null = null;
  let value: string | null = null;
  for (const item of listedAt) {
    if (!item) continue;
    const time = Date.parse(item);
    if (!Number.isFinite(time)) continue;
    if (earliest === null || time < earliest) {
      earliest = time;
      value = item;
    }
  }
  return value;
}

/**
 * 初掲載から14日以内なら NEW。
 * リンク集の初期データは同じ時刻で一括登録されているので、その時刻までは対象外にする。
 */
export function isNewListing(
  listedAt: string | null | undefined,
  now: number,
  catalogStart: string | null,
): boolean {
  if (!listedAt || !Number.isFinite(now)) return false;
  const listed = Date.parse(listedAt);
  if (!Number.isFinite(listed) || listed > now) return false;
  if (catalogStart) {
    const start = Date.parse(catalogStart);
    if (Number.isFinite(start) && listed <= start) return false;
  }
  return now < listed + NEW_LISTING_DURATION_MS;
}
