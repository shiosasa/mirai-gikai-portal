import { FEATURE_TAGS, FeatureTag } from "@/types/portal";

/**
 * 地方版みらい議会の掲載基準ガイドライン
 */
export const LISTING_GUIDELINES = {
  title: "地方版みらい議会 掲載基準",
  description:
    "しおぱんの全国「地方版みらい議会」リンク集では、本家「みらい議会」を踏襲し、市民と地域政治をつなぐ健全でオープンなプラットフォームをご紹介するため、以下の掲載基準を定めています。",

  /** マスト条件（すべて満たすことが必須） */
  mustConditions: [
    {
      id: "philosophy",
      number: 1,
      title: "理念や価値観への共感とテクノロジーの活用",
      text: "チームみらいの理念や価値観（「手を動かす」「オープンにする」「分断を煽らない」「何事も決めつけない」など）に共感し、テクノロジーを使って「政治を身近に・分かりやすくする」ことに取り組んでいること。（あるいはそのように見える）",
    },
    {
      id: "independent",
      number: 2,
      title: "独立したプロジェクトであること",
      text: "自治体公式ではなく、シビックテックや地域有志による独立したプロジェクトであること。",
    },
  ],

  /** 勘案条件（以下のいずれかが備わっているか） */
  optionalConditions: {
    title: "勘案条件（以下のいずれかが備わっているか）",
    items: [
      {
        id: "roots_and_features",
        category: "技術的ルーツと機能",
        text: "本家をフォークして作られているか、或いは模して造られており「ルビ機能」「簡単・難しいの切り替え」「AIアシスタント」などが実装されていること。",
        relatedTags: ["ルビ機能", "簡単・難しいの切り替え", "AIアシスタント"] as FeatureTag[],
      },
      {
        id: "interactive",
        category: "双方向の機能",
        text: "「AIインタビュー」などの双方向機能を備えていること。",
        relatedTags: ["AIインタビュー"] as FeatureTag[],
      },
      {
        id: "open_source",
        category: "オープンソース",
        text: "開発されたコードがオープンソース（OSS）として公開・共有されていること。",
        relatedTags: ["オープンソース"] as FeatureTag[],
      },
    ],
    tags: FEATURE_TAGS,
  },
} as const;

export type MustCondition =
  (typeof LISTING_GUIDELINES.mustConditions)[number];
export type OptionalConditionItem =
  (typeof LISTING_GUIDELINES.optionalConditions.items)[number];
