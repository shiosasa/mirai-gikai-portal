import type { Metadata } from "next";
import "./globals.css";
import { PortalFooter } from "@/components/portal-footer";

export const metadata: Metadata = {
  title: "全国「地方版みらい議会」リンク集 | となりの政治",
  description:
    "全国の市民や有志が作った「地方版みらい議会」の総合リンク集・ポータルサイトです。自分の作ったサイトを登録・共有できます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
        <div className="flex-1">{children}</div>
        <PortalFooter />
      </body>
    </html>
  );
}
