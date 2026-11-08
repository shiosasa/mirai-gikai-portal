"use client";

import React, { useState } from "react";
import { RegionCategory } from "@/types/portal";
import { REGIONS } from "./japan-map-data";

type JapanMapProps = {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  siteCounts: Record<string, number>;
};

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
            viewBox="0 0 710 680"
            className="w-full h-auto select-none"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.03))" }}
          >
            {/* 沖縄の区切り線（沖縄ブロックの下に水平線、右に斜め上） */}
            <path
              d="M 21 497 L 117 497 L 180 410"
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

