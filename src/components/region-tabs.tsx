"use client";

import React from "react";
import { RegionCategory } from "@/types/portal";

type RegionTabsProps = {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  siteCounts: Record<string, number>;
};

const REGIONS: { id: string; label: string }[] = [
  { id: "すべて", label: "全国すべて" },
  { id: "九州・沖縄", label: "九州・沖縄" },
  { id: "中国・四国", label: "中国・四国" },
  { id: "近畿", label: "近畿" },
  { id: "中部", label: "中部" },
  { id: "関東", label: "関東" },
  { id: "北海道・東北", label: "北海道・東北" },
];

export function RegionTabs({
  selectedRegion,
  onSelectRegion,
  siteCounts,
}: RegionTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex gap-2 min-w-max px-1">
        {REGIONS.map((region) => {
          const isSelected = selectedRegion === region.id;
          const count = siteCounts[region.id] ?? 0;

          return (
            <button
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{region.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
