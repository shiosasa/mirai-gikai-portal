import React from "react";
import { ExternalLink } from "lucide-react";

export function PortalFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-16 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <p className="font-bold text-slate-200 text-base">
            全国「地方版みらい議会」リンク集
          </p>
          <p className="text-slate-400 text-xs max-w-md">
            本サイトは地方版だけの非公式リンク集です。国会版の本家は一覧に入れていません。各サイトの開発・管理者が、そのサイトの責任を持ちます。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a
            href="https://sites.google.com/view/tonarinoseiji/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 underline flex items-center gap-1"
          >
            となりの政治（運営者サイト）
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://mirai-gikai-oitacity-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 underline flex items-center gap-1"
          >
            みらいぎかいっち＠大分市
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://gikai.team-mir.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 underline flex items-center gap-1"
          >
            本家「みらい議会」（国会版）
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
