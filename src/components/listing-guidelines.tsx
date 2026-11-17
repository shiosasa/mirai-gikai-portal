import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { LISTING_GUIDELINES } from "@/constants/guidelines";

export function ListingGuidelines({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 text-xs sm:text-sm ${className}`}>
      {/* マスト条件 */}
      <div className="space-y-2">
        <h3 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm sm:text-base">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          【マスト条件】（すべて満たすことが必須）
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 leading-relaxed">
          {LISTING_GUIDELINES.mustConditions.map((cond) => (
            <li key={cond.id} className="pl-1">
              <span>{cond.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 選択条件 */}
      <div className="space-y-2 pt-3 border-t border-emerald-200/50">
        <h3 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm sm:text-base">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          【選択条件】（以下のいずれかが備わっていること）
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          上記の5つの特徴タグのいずれかが実装されている、またはオープンソース等で公開されていること。
        </p>
        <ul className="space-y-2 pl-1 text-slate-700 leading-relaxed">
          {LISTING_GUIDELINES.optionalConditions.items.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <div>
                <strong className="text-slate-800">{item.category}：</strong>
                <span>{item.text}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* 特徴タグバッジ一覧 */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {LISTING_GUIDELINES.optionalConditions.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 shadow-2xs"
            >
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
