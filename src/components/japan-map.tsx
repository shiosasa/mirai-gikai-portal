"use client";

import React, { useState } from "react";
import { RegionCategory } from "@/types/portal";

type JapanMapProps = {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  siteCounts: Record<string, number>;
};

type RegionDef = {
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

// 添付画像に基づいたブロック日本地図の座標定義 (グリッドサイズ: 44px, 隙間: 4px)
const S = 44; // 1マスのサイズ
const G = 4;  // 隙間
const U = S + G; // 1ユニット = 48px

// 基準オフセット
const OX = 30;
const OY = 20;

const REGIONS: RegionDef[] = [
  {
    id: "北海道・東北", // 北海道
    name: "北海道",
    color: "#7dd3fc",        // 水色
    hoverColor: "#38bdf8",
    selectedColor: "#0284c7",
    borderColor: "#0369a1",
    textColor: "#082f49",
    rects: [
      { x: OX + U * 9.5, y: OY + 0, w: U * 3 - G, h: U * 2 - G }, // 北海道大ブロック
    ],
    center: { x: OX + U * 11, y: OY + U * 1 - 2 },
  },
  {
    id: "北海道・東北", // 東北
    name: "東北",
    color: "#86efac",        // 薄緑
    hoverColor: "#4ade80",
    selectedColor: "#16a34a",
    borderColor: "#15803d",
    textColor: "#14532d",
    rects: [
      { x: OX + U * 9.5, y: OY + U * 2.3, w: U * 1.5 - G, h: U - G },     // 青森
      { x: OX + U * 11, y: OY + U * 2.3, w: U * 1.5 - G, h: U - G },     // 岩手
      { x: OX + U * 9.5, y: OY + U * 3.3, w: U * 1.5 - G, h: U - G },     // 秋田
      { x: OX + U * 11, y: OY + U * 3.3, w: U * 1.5 - G, h: U - G },       // 宮城
      { x: OX + U * 9.5, y: OY + U * 4.3, w: U * 1.5 - G, h: U - G },     // 山形
      { x: OX + U * 11, y: OY + U * 4.3, w: U * 1.5 - G, h: U - G },       // 福島
    ],
    center: { x: OX + U * 11, y: OY + U * 3.8 },
  },
  {
    id: "関東",
    name: "関東",
    color: "#fca5a5",        // サーモンピンク
    hoverColor: "#f87171",
    selectedColor: "#dc2626",
    borderColor: "#b91c1c",
    textColor: "#7f1d1d",
    rects: [
      { x: OX + U * 9.5, y: OY + U * 5.6, w: U * 1.5 - G, h: U - G }, // 栃木
      { x: OX + U * 11, y: OY + U * 5.6, w: U * 1.5 - G, h: U - G },   // 茨城
      { x: OX + U * 9.5, y: OY + U * 6.6, w: U * 1.5 - G, h: U - G }, // 群馬・埼玉
      { x: OX + U * 11, y: OY + U * 6.6, w: U * 1.5 - G, h: U - G },   // 千葉
      { x: OX + U * 9.5, y: OY + U * 7.6, w: U * 1.5 - G, h: U - G }, // 東京
      { x: OX + U * 11, y: OY + U * 7.6, w: U * 1.5 - G, h: U - G },   // 神奈川
    ],
    center: { x: OX + U * 11, y: OY + U * 7.1 },
  },
  {
    id: "中部",
    name: "中部",
    color: "#fde047",        // 黄色
    hoverColor: "#facc15",
    selectedColor: "#ca8a04",
    borderColor: "#a16207",
    textColor: "#713f12",
    rects: [
      { x: OX + U * 7.5, y: OY + U * 5.6, w: U - G, h: U - G },       // 新潟
      { x: OX + U * 8.5, y: OY + U * 5.6, w: U - G, h: U - G },       // 富山
      { x: OX + U * 7.5, y: OY + U * 6.6, w: U - G, h: U - G },       // 石川・福井
      { x: OX + U * 8.5, y: OY + U * 6.6, w: U - G, h: U - G },       // 長野・山梨
      { x: OX + U * 7.5, y: OY + U * 7.6, w: U - G, h: U - G },       // 岐阜
      { x: OX + U * 8.5, y: OY + U * 7.6, w: U - G, h: U - G },       // 静岡・愛知
      { x: OX + U * 8.5, y: OY + U * 8.6, w: U - G, h: U - G },       // 三重
    ],
    center: { x: OX + U * 8.5, y: OY + U * 7.1 },
  },
  {
    id: "近畿",
    name: "近畿",
    color: "#f472b6",        // ピンク
    hoverColor: "#ec4899",
    selectedColor: "#db2777",
    borderColor: "#be185d",
    textColor: "#831843",
    rects: [
      { x: OX + U * 5.5, y: OY + U * 6.6, w: U - G, h: U - G }, // 京都・滋賀
      { x: OX + U * 6.5, y: OY + U * 6.6, w: U - G, h: U - G }, // 兵庫・大阪
      { x: OX + U * 5.5, y: OY + U * 7.6, w: U - G, h: U - G }, // 奈良
      { x: OX + U * 6.5, y: OY + U * 7.6, w: U - G, h: U - G }, // 和歌山
    ],
    center: { x: OX + U * 6.5, y: OY + U * 7.6 },
  },
  {
    id: "中国・四国", // 中国
    name: "中国",
    color: "#93c5fd",        // 青
    hoverColor: "#60a5fa",
    selectedColor: "#2563eb",
    borderColor: "#1d4ed8",
    textColor: "#1e3a8a",
    rects: [
      { x: OX + U * 3.5, y: OY + U * 6.6, w: U - G, h: U - G }, // 鳥取
      { x: OX + U * 4.5, y: OY + U * 6.6, w: U - G, h: U - G }, // 岡山
      { x: OX + U * 2.5, y: OY + U * 6.6, w: U - G, h: U - G }, // 島根
      { x: OX + U * 2.5, y: OY + U * 7.6, w: U - G, h: U - G }, // 山口
      { x: OX + U * 3.5, y: OY + U * 7.6, w: U - G, h: U - G }, // 広島
      { x: OX + U * 4.5, y: OY + U * 7.6, w: U - G, h: U - G }, // 瀬戸内
    ],
    center: { x: OX + U * 3.8, y: OY + U * 7.1 },
  },
  {
    id: "中国・四国", // 四国
    name: "四国",
    color: "#bef264",        // 黄緑
    hoverColor: "#a3e635",
    selectedColor: "#65a30d",
    borderColor: "#4d7c0f",
    textColor: "#365314",
    rects: [
      { x: OX + U * 3.5, y: OY + U * 9.0, w: U - G, h: U - G }, // 香川
      { x: OX + U * 4.5, y: OY + U * 9.0, w: U - G, h: U - G }, // 徳島
      { x: OX + U * 3.5, y: OY + U * 10.0, w: U - G, h: U - G },// 愛媛
      { x: OX + U * 4.5, y: OY + U * 10.0, w: U - G, h: U - G },// 高知
    ],
    center: { x: OX + U * 4.5, y: OY + U * 9.5 },
  },
  {
    id: "九州・沖縄", // 九州
    name: "九州",
    color: "#d8b4fe",        // 紫
    hoverColor: "#c084fc",
    selectedColor: "#9333ea",
    borderColor: "#7e22ce",
    textColor: "#581c87",
    rects: [
      { x: OX + U * 0.2, y: OY + U * 7.6, w: U - G, h: U - G }, // 福岡
      { x: OX + U * 1.2, y: OY + U * 7.6, w: U - G, h: U - G }, // 大分
      { x: OX + U * 0.2, y: OY + U * 8.6, w: U - G, h: U - G }, // 佐賀・長崎
      { x: OX + U * 1.2, y: OY + U * 8.6, w: U - G, h: U - G }, // 熊本
      { x: OX + U * 0.2, y: OY + U * 9.6, w: U - G, h: U - G }, // 鹿児島
      { x: OX + U * 1.2, y: OY + U * 9.6, w: U - G, h: U - G }, // 宮崎
    ],
    center: { x: OX + U * 1.1, y: OY + U * 8.6 },
  },
  {
    id: "九州・沖縄", // 沖縄
    name: "沖縄",
    color: "#fed7aa",        // オレンジ
    hoverColor: "#fdba74",
    selectedColor: "#ea580c",
    borderColor: "#c2410c",
    textColor: "#7c2d12",
    rects: [
      { x: OX + U * 0.5, y: OY + U * 4.9, w: U - G, h: U - G }, // 沖縄（枠内）
    ],
    center: { x: OX + U * 0.5 + (U - G) / 2, y: OY + U * 4.9 + (U - G) / 2 },
  },
];

export function JapanMap({
  selectedRegion,
  onSelectRegion,
  siteCounts,
}: JapanMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // 凡例リスト
  const LEGEND_ITEMS = [
    { label: "北海道・東北", color: "#7dd3fc", sub: "北海道・東北地方" },
    { label: "関東", color: "#fca5a5", sub: "東京・神奈川・千葉など" },
    { label: "中部", color: "#fde047", sub: "愛知・静岡・岐阜など" },
    { label: "近畿", color: "#f472b6", sub: "大阪・兵庫・京都など" },
    { label: "中国・四国", color: "#93c5fd", sub: "広島・岡山・四国など" },
    { label: "九州・沖縄", color: "#d8b4fe", sub: "福岡・大分・沖縄など" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>🗾</span> 日本列島ブロックマップから探す
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            地図上の地域をクリックすると、その地域の地方版みらい議会に絞り込めます
          </p>
        </div>
        <button
          onClick={() => onSelectRegion("すべて")}
          className={`text-xs px-3.5 py-1.5 rounded-full border font-bold transition-all ${
            selectedRegion === "すべて"
              ? "bg-slate-800 text-white border-slate-800 shadow-sm"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
          }`}
        >
          全国すべて ({siteCounts["すべて"] ?? 0}件)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG ブロック日本地図 */}
        <div className="lg:col-span-8 w-full max-w-[540px] mx-auto bg-slate-50/50 rounded-xl p-3 border border-slate-100">
          <svg
            viewBox="0 0 660 560"
            className="w-full h-auto select-none"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.03))" }}
          >
            {/* 沖縄の区切り線（沖縄ブロックの下に水平線、右に斜め上） */}
            <path
              d={`M ${OX - 10} ${OY + U * 6.3} L ${OX + U * 2.0} ${OY + U * 6.3} L ${OX + U * 3.0} ${OY + U * 5.2}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />

            {REGIONS.map((region, idx) => {
              const isSelected = selectedRegion === region.id;
              const isHovered = hoveredRegion === region.id;

              return (
                <g
                  key={`${region.name}-${idx}`}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => onSelectRegion(isSelected ? "すべて" : region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  {/* 各ブロック（影） */}
                  {region.rects.map((r, i) => (
                    <rect
                      key={`shadow-${i}`}
                      x={r.x + 3}
                      y={r.y + 3}
                      width={r.w}
                      height={r.h}
                      rx={3}
                      fill="#64748b"
                      opacity={0.25}
                    />
                  ))}

                  {/* 各ブロック本体 */}
                  {region.rects.map((r, i) => (
                    <rect
                      key={`rect-${i}`}
                      x={r.x}
                      y={r.y}
                      width={r.w}
                      height={r.h}
                      rx={3}
                      fill={
                        isSelected
                          ? region.selectedColor
                          : isHovered
                          ? region.hoverColor
                          : region.color
                      }
                      stroke="#1e293b"
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-colors duration-150"
                    />
                  ))}

                  {/* 地域名バッジ（白背景ピル） */}
                  {region.name !== "北海道" && region.name !== "沖縄" && (
                    <rect
                      x={region.center.x - 22}
                      y={region.center.y - 11}
                      width={44}
                      height={22}
                      rx={6}
                      fill={isSelected ? "#0f172a" : "rgba(255, 255, 255, 0.9)"}
                      stroke={isSelected ? "#ffffff" : "#475569"}
                      strokeWidth={1}
                      className="pointer-events-none shadow-sm"
                    />
                  )}

                  {/* 地域名テキスト */}
                  <text
                    x={region.center.x}
                    y={region.center.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={
                      region.name === "北海道" || region.name === "沖縄"
                        ? isSelected
                          ? "#ffffff"
                          : "#0f172a"
                        : isSelected
                        ? "#ffffff"
                        : "#1e293b"
                    }
                    className="font-bold pointer-events-none"
                    style={{
                      fontSize: region.name === "北海道" ? "14px" : "12px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {region.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 右側の凡例・ボタンリスト */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-500 mb-1">地方別リスト:</div>
          {LEGEND_ITEMS.map((item) => {
            const isSelected = selectedRegion === item.label;
            const count = siteCounts[item.label] ?? 0;

            return (
              <button
                key={item.label}
                onClick={() => onSelectRegion(isSelected ? "すべて" : item.label)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-102"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-sm border border-slate-900 shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {count}件
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

