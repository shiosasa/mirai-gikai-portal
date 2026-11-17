import assert from "node:assert/strict";
import test from "node:test";
import { getSiteFeatures, sortPortalSites } from "./sort-sites.ts";
import type { MiraiGikaiSite } from "../types/portal.ts";

function createMockSite(partial: Partial<MiraiGikaiSite>): MiraiGikaiSite {
  return {
    id: "test",
    prefecture: "東京都",
    municipality: "世田谷区",
    siteName: "テスト議会",
    url: "https://example.com",
    authorName: "テスト太郎",
    description: "テスト説明",
    genres: ["Webアプリ"],
    governanceType: "市区",
    region: "関東",
    ...partial,
  };
}

test("ソート優先度1: 公式枠・ピン留めが最上部に来る", () => {
  const normalNew = createMockSite({
    id: "normal-new",
    siteName: "通常（新しい）",
    createdAt: "2026-11-15T00:00:00Z",
    featured: false,
  });
  const featuredOld = createMockSite({
    id: "featured-old",
    siteName: "ピン留め（古い）",
    createdAt: "2026-10-01T00:00:00Z",
    featured: true,
  });
  const official = createMockSite({
    id: "official",
    siteName: "公式枠",
    createdAt: "2026-09-01T00:00:00Z",
    isOfficial: true,
  });

  const sorted = sortPortalSites([normalNew, featuredOld, official]);
  // 公式枠が0、featuredOldが1、normalNewが2
  assert.equal(sorted[0].id, "official");
  assert.equal(sorted[1].id, "featured-old");
  assert.equal(sorted[2].id, "normal-new");
});

test("ソート優先度2: 同じ枠内では登録日時の新しい順（降順）になる", () => {
  const site1 = createMockSite({
    id: "site1",
    createdAt: "2026-11-10T00:00:00Z",
    municipality: "大分市",
  });
  const site2 = createMockSite({
    id: "site2",
    createdAt: "2026-11-15T00:00:00Z",
    municipality: "福岡市",
  });
  const site3 = createMockSite({
    id: "site3",
    createdAt: "2026-11-01T00:00:00Z",
    municipality: "別府市",
  });

  const sorted = sortPortalSites([site1, site2, site3]);
  assert.deepEqual(
    sorted.map((s) => s.id),
    ["site2", "site1", "site3"]
  );
});

test("ソート優先度3: 登録日時が同一または未設定の場合は自治体名の五十音順になる", () => {
  const siteB = createMockSite({
    id: "site-b",
    prefecture: "大分県",
    municipality: "別府市",
    createdAt: "2026-11-01T00:00:00Z",
  });
  const siteA = createMockSite({
    id: "site-a",
    prefecture: "大分県",
    municipality: "大分市",
    createdAt: "2026-11-01T00:00:00Z",
  });
  const siteU = createMockSite({
    id: "site-u",
    prefecture: "大分県",
    municipality: "宇佐市",
    createdAt: "2026-11-01T00:00:00Z",
  });

  const sorted = sortPortalSites([siteB, siteU, siteA]);
  // 五十音順: 宇佐市 < 大分市 < 別府市
  assert.deepEqual(
    sorted.map((s) => s.municipality),
    ["宇佐市", "大分市", "別府市"]
  );
});

test("非破壊的であること", () => {
  const s1 = createMockSite({ id: "1", createdAt: "2026-11-01T00:00:00Z" });
  const s2 = createMockSite({ id: "2", createdAt: "2026-11-02T00:00:00Z" });
  const original = [s1, s2];
  const sorted = sortPortalSites(original);

  assert.notEqual(original, sorted);
  assert.equal(original[0].id, "1");
});

test("getSiteFeatures: 5つの特徴タグが正しく抽出・正規化される", () => {
  const site = createMockSite({
    features: ["ルビ機能", "オープンソース"],
    hasAiAssistant: true,
  });

  const tags = getSiteFeatures(site);
  assert.deepEqual(tags, ["ルビ機能", "AIアシスタント", "オープンソース"]);
});
