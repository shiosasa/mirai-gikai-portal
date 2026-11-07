"use client";

import React from "react";
import { RegionCategory } from "@/types/portal";

type JapanMapProps = {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  siteCounts: Record<string, number>;
};

type RegionBlock = {
  id: RegionCategory;
  name: string;
  shortName: string;
  color: string;
  hoverColor: string;
  selectedColor: string;
  gridArea: string; // CSS Grid position
  description: string;
};

const REGION_BLOCKS: RegionBlock[] = [
  {
    id: "北海道・東北",
    name: "北海道・東北",
    shortName: "北日本",
    color: "bg-sky-100 text-sky-800 border-sky-300",
    hoverColor: "hover:bg-sky-200",
    selectedColor: "bg-sky-600 text-white border-sky-600 shadow-md",
    gridArea: "hokkaido",
    description: "北海道、青森、岩手、宮城、秋田、山形、福島",
  },
  {
    id: "関東",
    name: "関東",
    shortName: "関東",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    hoverColor: "hover:bg-emerald-200",
    selectedColor: "bg-emerald-600 text-white border-emerald-600 shadow-md",
    gridArea: "kanto",
    description: "東京、神奈川、埼玉、千葉、茨城、栃木、群馬",
  },
  {
    id: "中部",
    name: "中部",
    shortName: "中部",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    hoverColor: "hover:bg-amber-200",
    selectedColor: "bg-amber-600 text-white border-amber-600 shadow-md",
    gridArea: "chubu",
    description: "愛知、静岡、岐阜、三重、山梨、長野、新潟、富山、石川、福井",
  },
  {
    id: "近畿",
    name: "近畿",
    shortName: "近畿",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    hoverColor: "hover:bg-indigo-200",
    selectedColor: "bg-indigo-600 text-white border-indigo-600 shadow-md",
    gridArea: "kinki",
    description: "大阪、京都、兵庫、奈良、滋賀、和歌山",
  },
  {
    id: "中国・四国",
    name: "中国・四国",
    shortName: "中四国",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    hoverColor: "hover:bg-orange-200",
    selectedColor: "bg-orange-600 text-white border-orange-600 shadow-md",
    gridArea: "chugoku_shikoku",
    description: "広島、岡山、山口、鳥取、島根、徳島、香川、愛媛、高知",
  },
  {
    id: "九州・沖縄",
    name: "九州・沖縄",
    shortName: "九州・沖縄",
    color: "bg-rose-100 text-rose-800 border-rose-300",
    hoverColor: "hover:bg-rose-200",
    selectedColor: "bg-rose-600 text-white border-rose-600 shadow-md",
    gridArea: "kyushu",
    description: "福岡、佐賀、長崎、熊本、大分、宮崎、鹿児島、沖縄",
  },
];

export function JapanMap({
  selectedRegion,
  onSelectRegion,
  siteCounts,
}: JapanMapProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            🗾 日本列島マップから探す
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            地域を押すと、そのエリアの地方版みらい議会に絞り込めます
          </p>
        </div>
        <button
          onClick={() => onSelectRegion("すべて")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            selectedRegion === "すべて"
              ? "bg-slate-800 text-white border-slate-800"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
          }`}
        >
          全国すべて表示 ({siteCounts["すべて"] ?? 0})
        </button>
      </div>

      {/* 日本地図風のブロック配置グリッド */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {REGION_BLOCKS.map((block) => {
          const isSelected = selectedRegion === block.id;
          const count = siteCounts[block.id] ?? 0;

          return (
            <button
              key={block.id}
              type="button"
              onClick={() => onSelectRegion(isSelected ? "すべて" : block.id)}
              className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? block.selectedColor
                  : `${block.color} ${block.hoverColor}`
              }`}
            >
              <div className="flex justify-between items-start gap-1">
                <span className="font-bold text-sm tracking-tight">
                  {block.name}
                </span>
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    isSelected
                      ? "bg-white/30 text-white"
                      : "bg-white/80 text-slate-700"
                  }`}
                >
                  {count}件
                </span>
              </div>
              <p
                className={`text-[10px] mt-2 line-clamp-2 leading-tight ${
                  isSelected ? "text-white/80" : "text-slate-600"
                }`}
              >
                {block.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
