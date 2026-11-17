"use client";

import { useState, useMemo } from "react";
import { MiraiGikaiSite, FeatureTag } from "@/types/portal";
import { PortalHeader } from "@/components/portal-header";
import { PortalAbout } from "@/components/portal-about";
import { JapanMap } from "@/components/japan-map";
import { RegionTabs } from "@/components/region-tabs";
import { SiteCard } from "@/components/site-card";
import { municipalityOptions, prefectureOptions } from "@/lib/site-filters";
import { getSiteFeatures } from "@/lib/sort-sites";
import { Search, RotateCcw, Sparkles } from "lucide-react";

type Props = {
  sites: MiraiGikaiSite[];
};

const SEARCH_FEATURE_TAGS = [
  "ルビ機能",
  "簡単・難しいの切り替え",
  "AIアシスタント",
  "AIインタビュー",
] as const;

export function PortalClient({ sites }: Props) {
  const [keyword, setKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("すべて");
  const [selectedPrefecture, setSelectedPrefecture] = useState("すべて");
  const [selectedMunicipality, setSelectedMunicipality] = useState("すべて");
  const [selectedTag, setSelectedTag] = useState<string>("すべて");

  // 地域別のサイト数を算出
  const siteCounts = useMemo(() => {
    const counts: Record<string, number> = { すべて: sites.length };
    for (const site of sites) {
      counts[site.region] = (counts[site.region] || 0) + 1;
    }
    return counts;
  }, [sites]);

  // フィルタリング処理
  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const kw = keyword.toLowerCase();
      const matchesKeyword =
        !kw ||
        site.siteName.toLowerCase().includes(kw) ||
        site.prefecture.toLowerCase().includes(kw) ||
        site.municipality.toLowerCase().includes(kw) ||
        site.description.toLowerCase().includes(kw) ||
        site.authorName.toLowerCase().includes(kw);

      const matchesRegion =
        selectedRegion === "すべて" || site.region === selectedRegion;

      const matchesPrefecture =
        selectedPrefecture === "すべて" ||
        site.prefecture === selectedPrefecture;

      const matchesMunicipality =
        selectedMunicipality === "すべて" ||
        site.municipality === selectedMunicipality;

      const matchesTag =
        selectedTag === "すべて" ||
        getSiteFeatures(site).includes(selectedTag as FeatureTag);

      return (
        matchesKeyword &&
        matchesRegion &&
        matchesPrefecture &&
        matchesMunicipality &&
        matchesTag
      );
    });
  }, [
    sites,
    keyword,
    selectedRegion,
    selectedPrefecture,
    selectedMunicipality,
    selectedTag,
  ]);

  const prefectures = useMemo(() => prefectureOptions(sites), [sites]);
  const municipalities = useMemo(
    () => municipalityOptions(sites, selectedPrefecture),
    [sites, selectedPrefecture],
  );

  const handleResetFilters = () => {
    setKeyword("");
    setSelectedRegion("すべて");
    setSelectedPrefecture("すべて");
    setSelectedMunicipality("すべて");
    setSelectedTag("すべて");
  };

  const isFiltered =
    keyword !== "" ||
    selectedRegion !== "すべて" ||
    selectedPrefecture !== "すべて" ||
    selectedMunicipality !== "すべて" ||
    selectedTag !== "すべて";

  return (
    <div>
      <PortalHeader />

      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        <PortalAbout />
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

            <div className="flex items-center gap-1.5 shrink-0 text-xs sm:text-sm">
              <label
                htmlFor="prefecture-filter"
                className="font-semibold text-slate-500 shrink-0"
              >
                県:
              </label>
              <select
                id="prefecture-filter"
                value={selectedPrefecture}
                onChange={(event) => {
                  setSelectedPrefecture(event.target.value);
                  setSelectedMunicipality("すべて");
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["すべて", ...prefectures].map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 text-xs sm:text-sm">
              <label
                htmlFor="municipality-filter"
                className="font-semibold text-slate-500 shrink-0"
              >
                区市町村:
              </label>
              <select
                id="municipality-filter"
                value={selectedMunicipality}
                onChange={(event) => setSelectedMunicipality(event.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["すべて", ...municipalities].map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* リセットボタン */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors shrink-0 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                リセット
              </button>
            )}
          </div>

          {/* 特徴タグフィルター */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              特徴タグ:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedTag("すべて")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTag === "すべて"
                    ? "bg-emerald-600 text-white shadow-2xs font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                すべて
              </button>
              {SEARCH_FEATURE_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(isSelected ? "すべて" : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
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
                type="button"
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
