import { ExternalLink } from "lucide-react";

const ABOUT_ITEMS = [
  {
    title: "みらい議会とは",
    body: "チームみらいが開発した公式のプラットフォームです。国会の審議を、テクノロジーを使ってわかりやすく伝え、議会や政治を身近にします。",
    href: "https://gikai.team-mir.ai/",
    linkLabel: "みらい議会（公式）を見る",
  },
  {
    title: "チームみらいとは",
    body: "テクノロジーで政治の課題を解決することを目指す政党です。",
    href: "https://team-mir.ai/",
    linkLabel: "チームみらいについて詳しく",
  },
  {
    title: "地方版みらい議会とは",
    body: "「チームみらい」の活動理念に共感し、「チームみらい」が開発した「みらい議会」をベースに作成し、または模して作られた非公式のプラットフォームです。",
    href: "https://mirai-gikai-oitacity-web.vercel.app/",
    linkLabel: "例: みらいぎかいっち＠大分市",
  },
] as const;

export function PortalAbout() {
  return (
    <section
      aria-labelledby="portal-about-heading"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4"
    >
      <div className="space-y-2">
        <h2
          id="portal-about-heading"
          className="text-lg sm:text-xl font-bold text-slate-900"
        >
          このリンク集について
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          このサイトは「チームみらい」の公式サイトではありません。ご意見や不具合は、党の公式窓口ではなく、各サイトの開発者・管理者、またはこのリンク集の管理者へご連絡ください。各サイトの対応は、それぞれの開発者・管理者が行います。
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ABOUT_ITEMS.map((item) => (
          <article
            key={item.title}
            className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2"
          >
            <h3 className="font-bold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline"
            >
              {item.linkLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
