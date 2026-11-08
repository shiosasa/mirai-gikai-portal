/** みらいぎかいっちと同じく、初掲載から14日。編集では延長しない。 */
export const NEW_LISTING_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

/** 初掲載から14日以内なら NEW。 */
export function isNewListing(
  listedAt: string | null | undefined,
  now: number,
): boolean {
  if (!listedAt || !Number.isFinite(now)) return false;
  const listed = Date.parse(listedAt);
  return (
    Number.isFinite(listed) &&
    listed <= now &&
    now < listed + NEW_LISTING_DURATION_MS
  );
}
