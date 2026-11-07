"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Send, HeartHandshake, AlertCircle } from "lucide-react";
import { SiteGenre, GovernanceType, RegionCategory } from "@/types/portal";

export type ReportType = "new" | "update" | "broken";

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
  const [reportType, setReportType] = useState<ReportType>("new");

  const [formData, setFormData] = useState({
    siteName: "",
    url: "",
    prefecture: "",
    municipality: "",
    governanceType: "市区" as GovernanceType,
    region: "関東" as RegionCategory,
    authorName: "",
    authorSocialUrl: "",
    description: "",
    genres: [] as SiteGenre[],
    reporterName: "",
    reporterContact: "",
    brokenDetail: "",
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
        body: JSON.stringify({ ...formData, reportType }),
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
            ご連絡ありがとうございます！
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {reportType === "new" && (
              <>
                「<strong>{formData.siteName || formData.url}</strong>」の掲載申請を受け付けました。<br />
                内容を確認のうえ、ポータルに掲載させていただきます！
              </>
            )}
            {reportType === "update" && (
              <>
                「<strong>{formData.siteName || formData.url}</strong>」の変更・修正連絡を受け付けました。<br />
                確認のうえ、掲載内容を更新いたします。
              </>
            )}
            {reportType === "broken" && (
              <>
                リンク切れ・動作不良のご報告を受け付けました。<br />
                教えていただき助かります。状況を確認して対応いたします！
              </>
            )}
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
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            自薦・他薦どちらも大歓迎！
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            掲載・情報提供・お問い合わせ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            「新しい地方版みらい議会を作ったよ」「こんなサイトを見つけたよ」「URLが変わった・動いていない」など、お気軽にお寄せください！
          </p>
        </div>

        {/* ご用件（タブ選択） */}
        <div className="mb-8 p-1 bg-slate-100 rounded-xl grid grid-cols-3 gap-1 text-xs sm:text-sm font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setReportType("new")}
            className={`py-2.5 px-2 rounded-lg transition-all text-center ${
              reportType === "new"
                ? "bg-white text-emerald-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            新しく登録（自薦・他薦）
          </button>
          <button
            type="button"
            onClick={() => setReportType("update")}
            className={`py-2.5 px-2 rounded-lg transition-all text-center ${
              reportType === "update"
                ? "bg-white text-emerald-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            掲載内容の変更・修正
          </button>
          <button
            type="button"
            onClick={() => setReportType("broken")}
            className={`py-2.5 px-2 rounded-lg transition-all text-center ${
              reportType === "broken"
                ? "bg-white text-rose-700 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            動いてない・閉鎖の報告
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* リンク切れ・閉鎖報告の場合のフォーム */}
          {reportType === "broken" ? (
            <div className="space-y-5">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 leading-relaxed">
                リンク切れやサービス閉鎖のご報告を受け付けています。教えていただきありがとうございます！
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  対象のサイト名、または自治体名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: みらい議会＠○○市、○○県"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  該当サイトのURL（分かる場合）
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  状況の詳細 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="例: アクセスすると404エラーになって開けない、ドメインが切れている、など"
                  value={formData.brokenDetail}
                  onChange={(e) => setFormData({ ...formData, brokenDetail: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-sm leading-relaxed"
                />
              </div>
            </div>
          ) : (
            /* 新規登録 または 変更・修正 の場合 */
            <div className="space-y-6">
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
                    製作者・団体名（他薦で不明な場合は「有志」等でOK） <span className="text-red-500">*</span>
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
                    製作者のX(Twitter)やプロフィールURL（任意）
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

              {/* ジャンル選択 */}
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
                  サイトの紹介・工夫点・変更内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    reportType === "update"
                      ? "変更点や修正したい内容を具体的に教えてください。"
                      : "サイトの特徴やおすすめポイントなどを教えてください！"
                  }
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* 連絡者の情報（任意） */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="font-bold text-xs text-slate-400">
              ご連絡者さまの情報（任意・非公開）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  お名前・ニックネーム
                </label>
                <input
                  type="text"
                  placeholder="匿名でもOKです"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  連絡先（Xアカウントやメールアドレス）
                </label>
                <input
                  type="text"
                  placeholder="任意（確認が必要な場合のみ使用）"
                  value={formData.reporterContact}
                  onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-base ${
              reportType === "broken"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            <Send className="w-4 h-4" />
            {isSubmitting
              ? "送信中..."
              : reportType === "broken"
              ? "不具合・閉鎖を報告する"
              : reportType === "update"
              ? "変更内容を送信する"
              : "掲載を申請する（自薦・他薦）"}
          </button>
        </form>
      </div>
    </div>
  );
}
