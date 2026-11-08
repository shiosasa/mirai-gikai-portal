import type { RegionCategory } from "../types/portal.ts";

export type RegionDef = {
  id: RegionCategory;
  name: string;
  color: string;
  hoverColor: string;
  selectedColor: string;
  borderColor: string;
  textColor: string;
  rects: { x: number; y: number; w: number; h: number }[];
  center: { x: number; y: number };
};

// 添付画像（シンプル日本地図・47都道府県）に基づいたブロック日本地図の座標定義
export const REGIONS: RegionDef[] = [
  {
    id: "北海道・東北", // 北海道
    name: "北海道",
    color: "#7dd3fc",        // 水色
    hoverColor: "#38bdf8",
    selectedColor: "#0284c7",
    borderColor: "#0369a1",
    textColor: "#082f49",
    rects: [
      { x: 552, y: 19, w: 128, h: 131 }, // 北海道大ブロック
    ],
    center: { x: 616, y: 84 },
  },
  {
    id: "北海道・東北", // 東北 (6県)
    name: "東北",
    color: "#86efac",        // 薄緑
    hoverColor: "#4ade80",
    selectedColor: "#16a34a",
    borderColor: "#15803d",
    textColor: "#14532d",
    rects: [
      { x: 552, y: 181, w: 86, h: 40 }, // 青森（横長2マス分）
      { x: 552, y: 227, w: 40, h: 40 }, // 秋田
      { x: 598, y: 227, w: 40, h: 40 }, // 岩手
      { x: 552, y: 272, w: 40, h: 41 }, // 山形
      { x: 598, y: 272, w: 40, h: 41 }, // 宮城
      { x: 552, y: 318, w: 86, h: 41 }, // 福島（横長2マス分）
    ],
    center: { x: 595, y: 270 },
  },
  {
    id: "関東", // 関東 (7都県)
    name: "関東",
    color: "#fca5a5",        // サーモンピンク
    hoverColor: "#f87171",
    selectedColor: "#dc2626",
    borderColor: "#b91c1c",
    textColor: "#7f1d1d",
    rects: [
      { x: 553, y: 365, w: 39, h: 39 }, // 群馬
      { x: 598, y: 365, w: 39, h: 39 }, // 栃木
      { x: 553, y: 411, w: 39, h: 38 }, // 埼玉
      { x: 598, y: 411, w: 39, h: 38 }, // 茨城
      { x: 553, y: 456, w: 39, h: 39 }, // 東京
      { x: 598, y: 456, w: 39, h: 85 }, // 千葉（縦長2マス分）
      { x: 553, y: 502, w: 39, h: 39 }, // 神奈川
    ],
    center: { x: 591, y: 446 },
  },
  {
    id: "中部", // 中部 (9県)
    name: "中部",
    color: "#fde047",        // 黄色
    hoverColor: "#facc15",
    selectedColor: "#ca8a04",
    borderColor: "#a16207",
    textColor: "#713f12",
    rects: [
      { x: 416, y: 364, w: 40, h: 40 }, // 石川
      { x: 462, y: 364, w: 39, h: 40 }, // 富山
      { x: 507, y: 364, w: 40, h: 40 }, // 新潟
      { x: 416, y: 410, w: 40, h: 40 }, // 福井
      { x: 462, y: 410, w: 39, h: 85 }, // 長野（縦長2マス分）
      { x: 507, y: 410, w: 40, h: 85 }, // 山梨（縦長2マス分）
      { x: 462, y: 501, w: 39, h: 40 }, // 岐阜
      { x: 507, y: 501, w: 40, h: 40 }, // 静岡
      { x: 507, y: 547, w: 40, h: 37 }, // 愛知
    ],
    center: { x: 491, y: 455 },
  },
  {
    id: "近畿", // 近畿 (7府県)
    name: "近畿",
    color: "#f472b6",        // ピンク
    hoverColor: "#ec4899",
    selectedColor: "#db2777",
    borderColor: "#be185d",
    textColor: "#831843",
    rects: [
      { x: 324, y: 457, w: 38, h: 39 }, // 京都
      { x: 371, y: 458, w: 38, h: 38 }, // 滋賀
      { x: 417, y: 457, w: 37, h: 39 }, // 三重
      { x: 324, y: 503, w: 37, h: 37 }, // 兵庫
      { x: 371, y: 503, w: 37, h: 36 }, // 大阪
      { x: 418, y: 503, w: 36, h: 36 }, // 奈良
      { x: 326, y: 548, w: 80, h: 36 }, // 和歌山（横長2マス分）
    ],
    center: { x: 371, y: 503 },
  },
  {
    id: "中国・四国", // 中国 (5県)
    name: "中国",
    color: "#93c5fd",        // 青
    hoverColor: "#60a5fa",
    selectedColor: "#2563eb",
    borderColor: "#1d4ed8",
    textColor: "#1e3a8a",
    rects: [
      { x: 187, y: 456, w: 40, h: 85 }, // 山口（縦長2マス分）
      { x: 233, y: 456, w: 39, h: 40 }, // 島根
      { x: 278, y: 456, w: 40, h: 40 }, // 鳥取
      { x: 233, y: 501, w: 39, h: 40 }, // 広島
      { x: 278, y: 501, w: 40, h: 40 }, // 岡山
    ],
    center: { x: 255, y: 498 },
  },
  {
    id: "中国・四国", // 四国 (4県)
    name: "四国",
    color: "#bef264",        // 黄緑
    hoverColor: "#a3e635",
    selectedColor: "#65a30d",
    borderColor: "#4d7c0f",
    textColor: "#365314",
    rects: [
      { x: 207, y: 572, w: 40, h: 40 }, // 愛媛
      { x: 253, y: 572, w: 40, h: 40 }, // 香川
      { x: 207, y: 618, w: 40, h: 39 }, // 高知
      { x: 253, y: 618, w: 40, h: 40 }, // 徳島
    ],
    center: { x: 250, y: 615 },
  },
  {
    id: "九州・沖縄", // 九州 (7県)
    name: "九州",
    color: "#d8b4fe",        // 紫
    hoverColor: "#c084fc",
    selectedColor: "#9333ea",
    borderColor: "#7e22ce",
    textColor: "#581c87",
    rects: [
      { x: 26, y: 501, w: 40, h: 40 },  // 福岡
      { x: 72, y: 501, w: 39, h: 40 },  // 佐賀
      { x: 117, y: 501, w: 40, h: 40 }, // 大分
      { x: 26, y: 547, w: 40, h: 39 },  // 長崎
      { x: 72, y: 547, w: 40, h: 39 },  // 熊本
      { x: 117, y: 547, w: 40, h: 85 }, // 宮崎（縦長2マス分）
      { x: 26, y: 592, w: 85, h: 40 },  // 鹿児島（横長2マス分）
    ],
    center: { x: 72, y: 566 },
  },
  {
    id: "九州・沖縄", // 沖縄 (1県)
    name: "沖縄",
    color: "#fed7aa",        // オレンジ
    hoverColor: "#fdba74",
    selectedColor: "#ea580c",
    borderColor: "#c2410c",
    textColor: "#7c2d12",
    rects: [
      { x: 46, y: 377, w: 39, h: 39 }, // 沖縄（枠内）
    ],
    center: { x: 65, y: 396 },
  },
];
