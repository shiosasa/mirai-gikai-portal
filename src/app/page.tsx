"use client";

import { useState, useMemo } from "react";
import { INITIAL_SITES } from "@/data/sites";
import { GovernanceType, RegionCategory, SiteGenre } from "@/types/portal";
import { PortalHeader } from "@/components/portal-header";
import { JapanMap } from "@/components/japan-map";
import { RegionTabs } from "@/components/region-tabs";
import { SiteCard } from "@/components/site-card";
import { Search, RotateCcw } from "lucide-react";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("すべて");
  const [selectedType, setSelectedType] = useState<string>("すべて");
  const [selectedGenre, setSelectedGenre] = useState<string>("すべて");

  // 地域別のサイト数を算出
  const siteCounts = useMemo(() => {
    const counts: Record<string, number> = { すべて: INITIAL_SITES.length };
    for (const site of INITIAL_SITES) {
      counts[site.region] = (counts[site.region] || 0) + 1;
    }
    return counts;
  }, []);

  // フィルタリング処理
  const filteredSites = useMemo(() => {
    return INITIAL_SITES.filter((site) => {
      // キーワード検索（自治体、サイト名、概要、作者）
      const kw = keyword.toLowerCase();
      const matchesKeyword =
        !kw ||
        site.siteName.toLowerCase().includes(kw) ||
        site.prefecture.toLowerCase().includes(kw) ||
        site.municipality.toLowerCase().includes(kw) ||
        site.description.toLowerCase().includes(kw) ||
        site.authorName.toLowerCase().includes(kw);

      // 地域フィルター
      const matchesRegion =
        selectedRegion === "すべて" || site.region === selectedRegion;

      // 自治体区分フィルター
      const matchesType =
        selectedType === "すべて" || site.governanceType === selectedType;

      // ジャンルフィルター
      const matchesGenre =
        selectedGenre === "すべて" ||
        site.genres.includes(selectedGenre as SiteGenre);

      return matchesKeyword && matchesRegion && matchesType && matchesGenre;
    });
  }, [keyword, selectedRegion, selectedType, selectedGenre]);

  const handleResetFilters = () => {
    setKeyword("");
    setSelectedRegion("すべて");
    setSelectedType("すべて");
    setSelectedGenre("すべて");
  };

  const isFiltered =
    keyword !== "" ||
    selectedRegion !== "すべて" ||
    selectedType !== "すべて" ||
    selectedGenre !== "すべて";

  return (
    <div>
      <PortalHeader />

      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        {/* 日本列島マップ（地域クリック連動） */}
        <JapanMap
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          siteCounts={siteCounts}
        />

        {/* 検索・絞り込みバー */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* キーワード検索入力 */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="自治体名（例: 大分、世田谷）、サイト名、製作者などで検索..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* 自治体区分 */}
            <div className="flex items-center gap-1.5 shrink-0 text-xs sm:text-sm">
              <span className="font-semibold text-slate-500 shrink-0">区分:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["すべて", "都道府県", "市区", "町村", "本家・全国"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* ジャンル選択 */}
            <div className="flex items-center gap-1.5 shrink-0 text-xs sm:text-sm">
              <span className="font-semibold text-slate-500 shrink-0">特徴:</span>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {[
                  "すべて",
                  "AI要約・チャット",
                  "Webアプリ",
                  "4コマ漫画",
                  "動画解説",
                  "データ分析",
                  "その他",
                ].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* リセットボタン */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                リセット
              </button>
            )}
          </div>

          {/* 地域スライド（横スクロールタブ） */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 mb-2">
              地域でスライド選択:
            </div>
            <RegionTabs
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
              siteCounts={siteCounts}
            />
          </div>
        </section>

        {/* サイトカード一覧 */}
        <main className="py-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {selectedRegion === "すべて" ? "全国の登録サイト" : `${selectedRegion}の登録サイト`}
              <span className="text-emerald-700 text-sm font-normal ml-2">
                （{filteredSites.length}件）
              </span>
            </h2>
          </div>

          {filteredSites.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-slate-500 text-sm">
                条件に一致するサイトが見つかりませんでした。
              </p>
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-600 hover:underline font-semibold"
              >
                条件をリセットする
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
