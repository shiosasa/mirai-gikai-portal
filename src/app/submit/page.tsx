"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  HeartHandshake,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FEATURE_TAGS, FeatureTag, GovernanceType } from "@/types/portal";
import { LISTING_GUIDELINES } from "@/data/guidelines";
import { PREFECTURES, getRegionByPrefecture } from "@/data/prefectures";

export type RecommendationType = "self" | "other";

export default function SubmitPage() {
  // 1. 区分選択（自薦 / 他薦）
  const [recommendationType, setRecommendationType] =
    useState<RecommendationType>("self");

  // 2. 基本情報
  const [siteName, setSiteName] = useState("");
  const [url, setUrl] = useState("");
  const [prefecture, setPrefecture] = useState("大分県");
  const [municipality, setMunicipality] = useState("");
  const [governanceType, setGovernanceType] = useState<GovernanceType>("市区");

  // 3. マスト条件の確認チェック（必須）
  const [mustConditions, setMustConditions] = useState<Record<string, boolean>>({
    philosophy: false,
    independent: false,
  });

  // 4. 特徴・アプローチの選択（5つのタグ項目から複数選択可）
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureTag[]>([]);

  // 送信状態
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const allMustChecked =
    mustConditions.philosophy && mustConditions.independent;

  const toggleFeature = (tag: FeatureTag) => {
    setSelectedFeatures((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleMustConditionChange = (id: string, checked: boolean) => {
    setMustConditions((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allMustChecked) {
      setErrorMessage("掲載基準のマスト条件をすべて確認・同意してください。");
      return;
    }
    if (selectedFeatures.length === 0) {
      setErrorMessage("特徴・アプローチ（選択条件）を1つ以上選択してください。");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const region = getRegionByPrefecture(prefecture);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: "new",
          recommendationType,
          siteName: siteName.trim(),
          url: url.trim(),
          prefecture: prefecture.trim(),
          municipality: municipality.trim() || prefecture.trim(),
          governanceType,
          region,
          features: selectedFeatures,
          authorName: recommendationType === "self" ? "開発者本人" : "地域有志・推薦",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "送信に失敗しました");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "エラーが発生しました。時間をおいてお試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            掲載申請を受け付けました！
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
            <p>
              <strong>サイト名：</strong>
              {siteName}
            </p>
            <p>
              <strong>URL：</strong>
              <span className="break-all">{url}</span>
            </p>
            <p>
              <strong>対象自治体：</strong>
              {prefecture} {municipality}
            </p>
            <p>
              <strong>区分：</strong>
              {recommendationType === "self" ? "自薦（開発者・運営者）" : "他薦（推薦・紹介）"}
            </p>
            <p>
              <strong>選択された特徴：</strong>
              {selectedFeatures.join("、")}
            </p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            掲載基準を確認のうえ、管理画面にて承認・ポータル掲載を反映いたします。
            ご申請ありがとうございました！
          </p>
          <div className="pt-2">
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
            自薦・他薦どちらも歓迎！
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            地方版みらい議会 掲載申請
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            自由記述不要のチェック式申請フォームです。掲載基準の確認と選択肢のチェックだけで手軽に申請いただけます。
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 text-sm">
          {/* 1. 区分選択（自薦 / 他薦） */}
          <section className="space-y-3">
            <label className="block font-bold text-slate-800 text-base">
              1. 申請区分 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecommendationType("self")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  recommendationType === "self"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm sm:text-base">自薦</div>
                <div className="text-xs text-slate-500 mt-1">
                  開発者・運営者本人による申請
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRecommendationType("other")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  recommendationType === "other"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="font-bold text-sm sm:text-base">他薦</div>
                <div className="text-xs text-slate-500 mt-1">
                  見つけたサイトの推薦・情報提供
                </div>
              </button>
            </div>
          </section>

          {/* 2. 基本情報 */}
          <section className="space-y-4">
            <label className="block font-bold text-slate-800 text-base border-t border-slate-100 pt-6">
              2. サイト基本情報 <span className="text-red-500">*</span>
            </label>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                サイト名・コンテンツ名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例: みらいぎかいっち＠大分市"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                サイトURL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                  対象都道府県 <span className="text-red-500">*</span>
                </label>
                <select
                  value={prefecture}
                  onChange={(e) => setPrefecture(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
                >
                  {PREFECTURES.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                  市区町村名（県単位の場合は県名） <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: 大分市、世田谷区、大分県"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                自治体区分 <span className="text-red-500">*</span>
              </label>
              <select
                value={governanceType}
                onChange={(e) => setGovernanceType(e.target.value as GovernanceType)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
              >
                <option value="市区">市区（市・特別区）</option>
                <option value="都道府県">都道府県</option>
                <option value="町村">町村</option>
                <option value="本家・全国">全国・本家</option>
              </select>
            </div>
          </section>

          {/* 3. マスト条件の確認チェックボックス（必須） */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <label className="block font-bold text-slate-800 text-base">
                3. マスト条件の確認 <span className="text-red-500">（すべて必須）</span>
              </label>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              以下の2つのマスト条件を満たしていることをご確認いただき、チェックを入れてください。
            </p>

            <div className="space-y-3">
              {LISTING_GUIDELINES.mustConditions.map((cond) => {
                const isChecked = Boolean(mustConditions[cond.id]);
                return (
                  <label
                    key={cond.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleMustConditionChange(cond.id, e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="font-bold text-slate-800 text-xs sm:text-sm">
                        {cond.title}
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        {cond.text}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 4. 特徴・アプローチの選択チェックボックス（複数選択可） */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <label className="block font-bold text-slate-800 text-base">
                4. 特徴・アプローチの選択 <span className="text-red-500">（1つ以上選択）</span>
              </label>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              該当サイトに実装されている機能や取り組みを選択してください（複数選択可）。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATURE_TAGS.map((tag) => {
                const isSelected = selectedFeatures.includes(tag);
                return (
                  <label
                    key={tag}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFeature(tag)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">{tag}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 送信ボタン */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting || !allMustChecked || selectedFeatures.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              <Send className="w-4 h-4" />
              {isSubmitting
                ? "送信中..."
                : !allMustChecked
                ? "マスト条件にチェックしてください"
                : selectedFeatures.length === 0
                ? "特徴を1つ以上選択してください"
                : "掲載を申請する"}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              ※ 送信後、管理画面にて内容を確認のうえ掲載されます
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
