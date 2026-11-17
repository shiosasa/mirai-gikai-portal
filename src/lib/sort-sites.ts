import type { FeatureTag, MiraiGikaiSite } from "@/types/portal";

export const FEATURE_TAGS: readonly FeatureTag[] = [
  "ルビ機能",
  "簡単・難しいの切り替え",
  "AIアシスタント",
  "AIインタビュー",
  "オープンソース",
] as const;

/**
 * サイトに備わっている特徴タグを抽出・正規化して返す
 */
export function getSiteFeatures(site: MiraiGikaiSite): FeatureTag[] {
  const result = new Set<FeatureTag>();

  const normalizeTag = (tag: string): FeatureTag | null => {
    if (tag === "簡単難しい切り替え" || tag === "簡単・難しいの切り替え") {
      return "簡単・難しいの切り替え";
    }
    if (FEATURE_TAGS.includes(tag as FeatureTag)) {
      return tag as FeatureTag;
    }
    return null;
  };

  // 配列指定の features があれば取り込む
  if (Array.isArray(site.features)) {
    for (const tag of site.features) {
      const normalized = normalizeTag(tag);
      if (normalized) result.add(normalized);
    }
  }

  // 個別 boolean プロパティの反映
  if (site.hasRuby) result.add("ルビ機能");
  if (site.hasLevelSwitch) result.add("簡単・難しいの切り替え");
  if (site.hasAiAssistant) result.add("AIアシスタント");
  if (site.hasAiInterview) result.add("AIインタビュー");
  if (site.hasOpenSource) result.add("オープンソース");

  // 既存の genres からの補完（既存データ・管理画面保存互換用）
  if (Array.isArray(site.genres)) {
    for (const genre of site.genres) {
      const normalized = normalizeTag(genre);
      if (normalized) result.add(normalized);
    }
    if (site.genres.includes("AI要約・チャット")) {
      result.add("AIアシスタント");
    }
  }

  return FEATURE_TAGS.filter((tag) => result.has(tag));
}

/**
 * ピン留め・公式枠判定
 */
export function isFeaturedSite(site: MiraiGikaiSite): boolean {
  return Boolean(site.featured || site.isOfficial);
}

/**
 * サイトの固定表示優先度を取得する
 * 0: 公式枠（本家最上部）
 * 1: ピン留め（featured）
 * 2: 通常サイト
 */
export function getSitePriority(site: MiraiGikaiSite): number {
  if (site.isOfficial) return 0;
  if (site.featured) return 1;
  return 2;
}

/**
 * サイト一覧のカード表示順を以下の優先度でソートする
 * 1. ピン留め・公式枠（featured: true または isOfficial: true）が最上部
 * 2. 登録日時の新しい順（降順: createdAt）
 * 3. 自治体名（五十音順）
 */
export function sortPortalSites(sites: MiraiGikaiSite[]): MiraiGikaiSite[] {
  return [...sites].sort((a, b) => {
    // 1. ピン留め・公式枠（最優先）
    const aPriority = getSitePriority(a);
    const bPriority = getSitePriority(b);
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // 2. 登録日時の新しい順（降順）
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
    const aValid = !Number.isNaN(aTime) && aTime > 0;
    const bValid = !Number.isNaN(bTime) && bTime > 0;

    if (aValid && bValid && aTime !== bTime) {
      return bTime - aTime;
    }
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;

    // 3. 自治体名（五十音順）
    const aMuni = a.municipality || a.prefecture || "";
    const bMuni = b.municipality || b.prefecture || "";
    const muniCompare = aMuni.localeCompare(bMuni, "ja");
    if (muniCompare !== 0) return muniCompare;
    return (a.prefecture || "").localeCompare(b.prefecture || "", "ja");
  });
}
