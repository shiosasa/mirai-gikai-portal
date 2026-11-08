import { ExternalLink } from "lucide-react";

const SEPARATE_LINKS = [
  {
    href: "https://gikai.team-mir.ai/",
    label: "本家「みらい議会」（国会版）",
  },
  {
    href: "https://team-mir.ai/",
    label: "チームみらい",
  },
] as const;

export function PortalAbout() {
  return (
    <section
      aria-labelledby="portal-about-heading"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4"
    >
      <div className="space-y-3">
        <h2
          id="portal-about-heading"
          className="text-lg sm:text-xl font-bold text-slate-900"
        >
          このリンク集について
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          議会をやさしく伝えるサイト「みらい議会」の地方版です。
        </p>
        <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <p>
            「みらい議会」は、政党チームみらいが運営する、国会を分かりやすく伝えるプラットフォームです。
          </p>
          <p>
            このリンク集に載せる地方版は、チームみらいの理念に共感し、本家のコードを継承して開発したもの、あるいは本家を模して作成したサイトです。しおぱん（となりの政治）は、この定義に沿うサイトだけを掲載します。
          </p>
          <p>
            各サイトの内容と運用の責任は、そのサイトの開発者・管理者が持ちます。このリンク集は紹介のための非公式な一覧で、チームみらいや本家の公式サイトではありません。国会を伝える本家は、地方議会の検索やリンク集には載せず、下の別リンクから開いてください。
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {SEPARATE_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 hover:underline"
          >
            {item.label}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    </section>
  );
}
