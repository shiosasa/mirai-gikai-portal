"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";
import { SiteGenre, GovernanceType, RegionCategory } from "@/types/portal";

const GENRES: SiteGenre[] = [
  "AI要約・チャット",
  "Webアプリ",
  "4コマ漫画",
  "動画解説",
  "データ分析",
  "その他",
];

const REGIONS: RegionCategory[] = [
  "北海道・東北",
  "関東",
  "中部",
  "近畿",
  "中国・四国",
  "九州・沖縄",
];

const TYPES: GovernanceType[] = ["都道府県", "市区", "町村", "本家・全国"];

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    prefecture: "",
    municipality: "",
    governanceType: "市区" as GovernanceType,
    region: "関東" as RegionCategory,
    siteName: "",
    url: "",
    authorName: "",
    authorSocialUrl: "",
    description: "",
    genres: [] as SiteGenre[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleGenre = (genre: SiteGenre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "送信に失敗しました");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "エラーが発生しました。時間をおいてお試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            ご報告ありがとうございます！
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            「<strong>{formData.siteName}</strong>」の登録申請を受け付けました。<br />
            全国のリンク集に掲載させていただきます。各地での活動を応援しています！
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
            >
              リンク集トップに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          リンク集トップに戻る
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            みんなのサイトを募集中
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            「作ったよ！」登録・報告フォーム
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            あなたやグループが作った「地方版みらい議会」や関連コンテンツ（4コマ漫画、動画、Webアプリなど）を教えてください！
            全国リンク集に掲載させていただきます。
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* 都道府県 & 市区町村名 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                都道府県 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例: 大分県, 東京都"
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                市区町村名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例: 大分市, 世田谷区, 葉山町"
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* 地域ブロック & 区分 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                地域ブロック <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value as RegionCategory })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                自治体の区分 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.governanceType}
                onChange={(e) => setFormData({ ...formData, governanceType: e.target.value as GovernanceType })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* サイト名 */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              サイト名・コンテンツ名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例: みらいぎかいっち＠大分市"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
          </div>

          {/* サイトURL */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              公開URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
          </div>

          {/* 製作者名 & SNSリンク */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                製作者・団体名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例: しおぱん, シビックテック大分"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                製作者のX(Twitter)やプロフィールURL
              </label>
              <input
                type="url"
                placeholder="https://x.com/..."
                value={formData.authorSocialUrl}
                onChange={(e) => setFormData({ ...formData, authorSocialUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* ジャンル選択（複数） */}
          <div>
            <label className="block font-bold text-slate-700 mb-2">
              特徴・ジャンル（当てはまるものを選択）
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    formData.genres.includes(genre)
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* 紹介文 */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              サイトの紹介・工夫した点 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="例: 難しい議会用語を小学生・中学生でもわかる表現で解説しています。AIチャットで気軽に質問できる機能もあります！"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-base"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "送信中..." : "「作ったよ！」を登録・報告する"}
          </button>
        </form>
      </div>
    </div>
  );
}
