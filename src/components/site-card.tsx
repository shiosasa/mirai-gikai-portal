import React from "react";
import { MiraiGikaiSite, FeatureTag } from "@/types/portal";
import { localAreaLabel } from "@/lib/site-filters";
import { getSiteFeatures } from "@/lib/sort-sites";
import { ExternalLink, MapPin, User, Sparkles, Pin } from "lucide-react";

const FEATURE_TAG_STYLES: Record<
  FeatureTag,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  ルビ機能: {
    label: "ルビ機能",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  "簡単・難しいの切り替え": {
    label: "簡単・難しいの切り替え",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  簡単難しい切り替え: {
    label: "簡単・難しいの切り替え",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  AIアシスタント: {
    label: "AIアシスタント",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  AIインタビュー: {
    label: "AIインタビュー",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  オープンソース: {
    label: "オープンソース",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
};

export function SiteCard({
  site,
  onSelectTag,
}: {
  site: MiraiGikaiSite;
  onSelectTag?: (tag: FeatureTag) => void;
}) {
  const isOita = site.id === "oita-city";
  const classification = localAreaLabel(site);
  const features = getSiteFeatures(site);

  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        site.isOfficial
          ? "bg-gradient-to-br from-amber-50/60 to-white border-amber-300 ring-1 ring-amber-300"
          : site.featured
          ? "bg-gradient-to-br from-amber-50/40 via-emerald-50/20 to-white border-amber-300 ring-1 ring-amber-200"
          : isOita
          ? "bg-gradient-to-br from-emerald-50/50 to-white border-emerald-300 ring-1 ring-emerald-300"
          : "bg-white border-slate-200"
      }`}
    >
      <div>
        {/* 上部ヘッダー：自治体＆区分バッジ */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {site.prefecture} {site.municipality !== site.prefecture && site.municipality}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {site.isOfficial && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                公式
              </span>
            )}
            {site.featured && !site.isOfficial && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                <Pin className="w-3 h-3 text-amber-600" />
                おすすめ
              </span>
            )}
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {classification}
            </span>
          </div>
        </div>

        {/* サイト名 */}
        <h3 className="mt-1 flex items-center gap-2 font-bold text-lg text-slate-900 group">
          {site.isNew && (
            <span
              className="inline-flex shrink-0 items-center rounded-full bg-pink-100 px-2 py-0.5 text-xs font-bold leading-4 text-slate-800"
              title="掲載してから14日以内のサイトです"
            >
              NEW
              <span className="sr-only">（掲載してから14日以内）</span>
            </span>
          )}
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 hover:underline inline-flex items-center gap-1 leading-snug"
          >
            <span>{site.siteName}</span>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
          </a>
        </h3>

        {/* 紹介文 */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {site.description}
        </p>

        {/* 5つの特徴タグ */}
        {features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100/80">
            {features.map((tag) => {
              const style = FEATURE_TAG_STYLES[tag];
              if (!style) return null;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={(e) => {
                    if (onSelectTag) {
                      e.preventDefault();
                      onSelectTag(tag);
                    }
                  }}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border transition-transform hover:scale-105 active:scale-95 cursor-pointer ${style.bg} ${style.text} ${style.border}`}
                  title={`${tag}で絞り込む`}
                >
                  <span className={`size-1.5 rounded-full ${style.dot}`} />
                  {style.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* フッター：製作者情報 & 見に行くボタン */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 truncate max-w-[65%]">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {site.authorSocialUrl ? (
            <a
              href={site.authorSocialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-emerald-700 truncate font-medium"
            >
              {site.authorName}
            </a>
          ) : (
            <span className="truncate font-medium">{site.authorName}</span>
          )}
        </div>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shrink-0 flex items-center gap-1 transition-colors shadow-sm"
        >
          見に行く
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
