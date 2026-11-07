import React from "react";
import Link from "next/link";
import { PlusCircle, ExternalLink } from "lucide-react";

export function PortalHeader() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-emerald-100 text-xs px-3 py-1 rounded-full font-medium mb-3 backdrop-blur-sm">
              <span>非公式ポータル</span>
              <span>・</span>
              <a
                href="https://sites.google.com/view/tonarinoseiji/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white flex items-center gap-0.5"
              >
                となりの政治
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              全国「地方版みらい議会」リンク集
            </h1>
            <p className="mt-2 text-emerald-100 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              各地の有志・市民が作った「みらい議会」の総合プラットフォームです。
              地域の議会をやさしく伝えるサイトを見つけたり、新しく見つけた・作ったサイトを登録できます！
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <Link
              href="/submit"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105 text-sm md:text-base"
            >
              <PlusCircle className="w-5 h-5 text-slate-900" />
              掲載・変更を連絡する
            </Link>
            <span className="text-[11px] text-emerald-100/90 font-medium">
              自薦・他薦・リンク切れ報告もこちら
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
