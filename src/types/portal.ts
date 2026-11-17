export type RegionCategory =
  | "北海道・東北"
  | "関東"
  | "中部"
  | "近畿"
  | "中国・四国"
  | "九州・沖縄"
  | "全国";

export type SiteGenre =
  | "AI要約・チャット"
  | "Webアプリ"
  | "4コマ漫画"
  | "動画解説"
  | "データ分析"
  | "その他";

export type GovernanceType = "都道府県" | "市区" | "町村" | "本家・全国";

export type FeatureTag =
  | "ルビ機能"
  | "簡単難しい切り替え"
  | "AIアシスタント"
  | "AIインタビュー"
  | "オープンソース";

export const FEATURE_TAGS: readonly FeatureTag[] = [
  "ルビ機能",
  "簡単難しい切り替え",
  "AIアシスタント",
  "AIインタビュー",
  "オープンソース",
] as const;

export type MiraiGikaiSite = {
  id: string;
  prefecture: string;        // 都道府県（例: "大分県", "東京都", "全国"）
  municipality: string;      // 市区町村（例: "大分市", "世田谷区", "全国"）
  siteName: string;          // サイト・コンテンツ名
  url: string;               // リンクURL
  authorName: string;        // 作成者・団体名
  authorSocialUrl?: string;  // X(Twitter)などのSNSリンク
  description: string;       // 紹介文・特徴
  genres: SiteGenre[];       // 特徴タグ
  governanceType: GovernanceType;
  region: RegionCategory;
  isOfficial?: boolean;      // 本家公式かどうか
  featured?: boolean;        // ピン留め・トップ固定フラグ
  createdAt?: string;        // 初掲載日時。編集では変えない
  isNew?: boolean;
  features?: FeatureTag[];   // 5つの特徴タグ
  hasRuby?: boolean;
  hasLevelSwitch?: boolean;
  hasAiAssistant?: boolean;
  hasAiInterview?: boolean;
  hasOpenSource?: boolean;
};
