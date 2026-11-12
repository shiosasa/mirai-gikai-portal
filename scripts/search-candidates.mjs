/**
 * 地方版みらい議会 自動サーチ・候補キュー追加スクリプト
 * 
 * GitHub Search API を利用して新規の「地方版みらい議会」リポジトリやデプロイサイトを検索し、
 * 既存のポータルサイトおよび申請キュー（pending / approved / rejected）と突合して
 * 重複のない新規候補のみを Supabase の `portal_submissions` に status: 'pending' で登録します。
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

// 実行オプション
const isDryRun = process.argv.includes("--dry-run");

// 環境変数
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

// 都道府県と地域ブロックのマッピングテーブル
const PREFECTURE_MAP = [
  { name: "北海道", region: "北海道・東北" },
  { name: "青森県", region: "北海道・東北" },
  { name: "岩手県", region: "北海道・東北" },
  { name: "宮城県", region: "北海道・東北" },
  { name: "秋田県", region: "北海道・東北" },
  { name: "山形県", region: "北海道・東北" },
  { name: "福島県", region: "北海道・東北" },
  { name: "茨城県", region: "関東" },
  { name: "栃木県", region: "関東" },
  { name: "群馬県", region: "関東" },
  { name: "埼玉県", region: "関東" },
  { name: "千葉県", region: "関東" },
  { name: "東京都", region: "関東" },
  { name: "神奈川県", region: "関東" },
  { name: "新潟県", region: "中部" },
  { name: "富山県", region: "中部" },
  { name: "石川県", region: "中部" },
  { name: "福井県", region: "中部" },
  { name: "山梨県", region: "中部" },
  { name: "長野県", region: "中部" },
  { name: "岐阜県", region: "中部" },
  { name: "静岡県", region: "中部" },
  { name: "愛知県", region: "中部" },
  { name: "三重県", region: "近畿" },
  { name: "滋賀県", region: "近畿" },
  { name: "京都府", region: "近畿" },
  { name: "大阪府", region: "近畿" },
  { name: "兵庫県", region: "近畿" },
  { name: "奈良県", region: "近畿" },
  { name: "和歌山県", region: "近畿" },
  { name: "鳥取県", region: "中国・四国" },
  { name: "島根県", region: "中国・四国" },
  { name: "岡山県", region: "中国・四国" },
  { name: "広島県", region: "中国・四国" },
  { name: "山口県", region: "中国・四国" },
  { name: "徳島県", region: "中国・四国" },
  { name: "香川県", region: "中国・四国" },
  { name: "愛媛県", region: "中国・四国" },
  { name: "高知県", region: "中国・四国" },
  { name: "福岡県", region: "九州・沖縄" },
  { name: "佐賀県", region: "九州・沖縄" },
  { name: "長崎県", region: "九州・沖縄" },
  { name: "熊本県", region: "九州・沖縄" },
  { name: "大分県", region: "九州・沖縄" },
  { name: "宮崎県", region: "九州・沖縄" },
  { name: "鹿児島県", region: "九州・沖縄" },
  { name: "沖縄県", region: "九州・沖縄" },
];

// リポジトリ名によく使われるローマ字表記からの自治体マッピング
const ROMAN_LOCATION_MAP = [
  { key: "komoro", pref: "長野県", muni: "小諸市", region: "中部", type: "市区" },
  { key: "takasaki", pref: "群馬県", muni: "高崎市", region: "関東", type: "市区" },
  { key: "sagamihara", pref: "神奈川県", muni: "相模原市", region: "関東", type: "市区" },
  { key: "shizuoka", pref: "静岡県", muni: "静岡市", region: "中部", type: "市区" },
  { key: "himeji", pref: "兵庫県", muni: "姫路市", region: "近畿", type: "市区" },
  { key: "matsuyama", pref: "愛媛県", muni: "松山市", region: "中国・四国", type: "市区" },
  { key: "karatsu", pref: "佐賀県", muni: "唐津市", region: "九州・沖縄", type: "市区" },
  { key: "tagawa", pref: "福岡県", muni: "田川市", region: "九州・沖縄", type: "市区" },
  { key: "fukuoka", pref: "福岡県", muni: "福岡県", region: "九州・沖縄", type: "都道府県" },
  { key: "setagaya", pref: "東京都", muni: "世田谷区", region: "関東", type: "市区" },
  { key: "oitacity", pref: "大分県", muni: "大分市", region: "九州・沖縄", type: "市区" },
  { key: "oita", pref: "大分県", muni: "大分市", region: "九州・沖縄", type: "市区" },
  { key: "yokohama", pref: "神奈川県", muni: "横浜市", region: "関東", type: "市区" },
  { key: "kawasaki", pref: "神奈川県", muni: "川崎市", region: "関東", type: "市区" },
  { key: "nagoya", pref: "愛知県", muni: "名古屋市", region: "中部", type: "市区" },
  { key: "kyoto", pref: "京都府", muni: "京都市", region: "近畿", type: "市区" },
  { key: "osaka", pref: "大阪府", muni: "大阪市", region: "近畿", type: "市区" },
  { key: "kobe", pref: "兵庫県", muni: "神戸市", region: "近畿", type: "市区" },
  { key: "sapporo", pref: "北海道", muni: "札幌市", region: "北海道・東北", type: "市区" },
  { key: "sendai", pref: "宮城県", muni: "仙台市", region: "北海道・東北", type: "市区" },
  { key: "hiroshima", pref: "広島県", muni: "広島市", region: "中国・四国", type: "市区" },
  { key: "naha", pref: "沖縄県", muni: "那覇市", region: "九州・沖縄", type: "市区" },
];

/**
 * URLを正規化して比較可能にする（小文字化、プロトコル・末尾スラッシュ除去など）
 */
function normalizeUrl(rawUrl) {
  if (!rawUrl) return "";
  try {
    const parsed = new URL(rawUrl);
    let path = parsed.pathname.replace(/\/+$/, "");
    return (parsed.hostname + path).toLowerCase();
  } catch {
    return rawUrl.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
}

/**
 * テキスト・リポジトリ名から都道府県・自治体名・地域ブロックを推定する
 */
function detectLocation(repoName, description) {
  const combined = `${repoName} ${description || ""}`;
  const lower = combined.toLowerCase();

  // 1. ローマ字辞書から探索
  for (const r of ROMAN_LOCATION_MAP) {
    if (lower.includes(r.key)) {
      return {
        prefecture: r.pref,
        municipality: r.muni,
        region: r.region,
        governanceType: r.type,
      };
    }
  }

  let detectedPref = "";
  let detectedRegion = "関東";
  let detectedMuni = "";
  let governanceType = "市区";

  // 2. 「＠○○」「@○○」の表記を抽出
  const atMatch = combined.match(/[@＠]\s*([^\s,、。！？()（）/]{2,10})/);
  if (atMatch) {
    const rawTarget = atMatch[1].trim();
    // 都道府県名そのものの場合
    const prefObj = PREFECTURE_MAP.find((p) => p.name === rawTarget || p.name.startsWith(rawTarget));
    if (prefObj) {
      return {
        prefecture: prefObj.name,
        municipality: prefObj.name,
        region: prefObj.region,
        governanceType: "都道府県",
      };
    }
    // 市区町村の場合
    if (rawTarget.match(/(市|特別区|区|町|村)$/)) {
      detectedMuni = rawTarget;
      governanceType = rawTarget.endsWith("町") || rawTarget.endsWith("村") ? "町村" : "市区";
    }
  }

  // 3. 都道府県の判定
  for (const p of PREFECTURE_MAP) {
    const shortName = p.name.replace(/(都|道|府|県)$/, "");
    if (combined.includes(p.name) || combined.includes(shortName)) {
      detectedPref = p.name;
      detectedRegion = p.region;
      break;
    }
  }

  // 4. 自治体名（○○市、○○区、○○町、○○村）の抽出
  if (!detectedMuni) {
    const muniMatch = combined.match(/([^\s@【】「」()（）/]{2,8}?(?:市|特別区|区|町|村))/);
    if (muniMatch) {
      detectedMuni = muniMatch[1];
      governanceType = detectedMuni.endsWith("町") || detectedMuni.endsWith("村") ? "町村" : "市区";
    }
  }

  // 都道府県レベルの場合
  if (!detectedMuni && detectedPref) {
    detectedMuni = detectedPref;
    governanceType = "都道府県";
  }

  return {
    prefecture: detectedPref || "全国",
    municipality: detectedMuni || "未特定",
    region: detectedRegion,
    governanceType,
  };
}

/**
 * GitHub Search APIでリポジトリを検索
 */
async function searchGitHubRepositories() {
  const queries = [
    "mirai-gikai in:name,description",
    "miraigikai in:name,description",
    "\"みらい議会\" in:name,description",
    "topic:mirai-gikai",
  ];

  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "mirai-gikai-portal-search-bot",
  };
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  const repoMap = new Map();

  for (const q of queries) {
    try {
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=50`;
      console.log(`[GitHub API] 検索中: ${q}`);
      const res = await fetch(url, { headers });

      if (!res.ok) {
        console.warn(`[GitHub API] 警告: 検索リクエスト失敗 (${res.status} ${res.statusText})`);
        continue;
      }

      const data = await res.json();
      const items = data.items || [];
      console.log(`[GitHub API] ${items.length} 件取得 (${q})`);

      for (const item of items) {
        if (!repoMap.has(item.full_name)) {
          repoMap.set(item.full_name, item);
        }
      }
    } catch (err) {
      console.error(`[GitHub API] エラー (${q}):`, err);
    }
  }

  return Array.from(repoMap.values());
}

/**
 * 既存のDB・登録済みリストから除外対象URL & リポジトリIDのセットを取得
 */
async function getExistingExclusionSets(supabase) {
  const excludedUrls = new Set();
  const excludedRepos = new Set();

  // 1. オフラインの初期データ（src/data/sites.ts）から除外URLを収集
  try {
    const sitesFile = fs.readFileSync("./src/data/sites.ts", "utf-8");
    const urlMatches = sitesFile.matchAll(/url:\s*["']([^"']+)["']/g);
    for (const m of urlMatches) {
      const norm = normalizeUrl(m[1]);
      if (norm) excludedUrls.add(norm);
    }
  } catch (err) {
    // ファイル読み込み失敗時はスルー
  }

  // 2. Supabaseが利用可能な場合、既存テーブルから全URL・リポジトリ情報を収集
  if (supabase) {
    // 既存サイト（portal_sites）
    const { data: sites, error: sitesErr } = await supabase
      .from("portal_sites")
      .select("url, site_name, author_social_url");
    if (!sitesErr && sites) {
      for (const s of sites) {
        if (s.url) excludedUrls.add(normalizeUrl(s.url));
        if (s.author_social_url) excludedUrls.add(normalizeUrl(s.author_social_url));
      }
    }

    // 既存申請・候補（portal_submissions - pending, approved, rejected すべて）
    const { data: subs, error: subsErr } = await supabase
      .from("portal_submissions")
      .select("url, reporter_contact, admin_notes, status");
    if (!subsErr && subs) {
      for (const sub of subs) {
        if (sub.url) excludedUrls.add(normalizeUrl(sub.url));
        if (sub.reporter_contact) excludedUrls.add(normalizeUrl(sub.reporter_contact));
        // admin_notes に保存された repo.full_name を抽出
        const repoMatch = sub.admin_notes?.match(/GitHub:\s*([\w.-]+\/[\w.-]+)/i);
        if (repoMatch) {
          excludedRepos.add(repoMatch[1].toLowerCase());
        }
      }
    }
  }

  return { excludedUrls, excludedRepos };
}

/**
 * メイン処理
 */
async function main() {
  console.log("=== 地方版みらい議会 自動サーチ開始 ===");
  if (isDryRun) {
    console.log("※ DRY-RUN モードで実行中（DB保存は行いません）");
  }

  const supabase =
    supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
  if (!supabase && !isDryRun) {
    console.error("エラー: Supabase の接続情報が設定されていません。");
    process.exit(1);
  }

  // 1. 既存の登録・申請済みURLリストを取得
  const { excludedUrls, excludedRepos } = await getExistingExclusionSets(supabase);
  console.log(`[除外リスト] 登録・申請済みURL: ${excludedUrls.size} 件, リポジトリ: ${excludedRepos.size} 件`);

  // 2. GitHubから候補リポジトリを検索
  const repos = await searchGitHubRepositories();
  console.log(`[GitHub API] 合計 ${repos.length} 件のリポジトリを検知・検証開始`);

  const newCandidates = [];

  for (const repo of repos) {
    // 本家公式リポジトリ等の除外
    const fullNameLower = repo.full_name.toLowerCase();
    if (fullNameLower === "team-mir-ai/gikai" || fullNameLower.endsWith("/mirai-gikai-portal")) {
      continue;
    }

    // 既に除外リスト（リポジトリ名）にあるかチェック
    if (excludedRepos.has(fullNameLower)) {
      continue;
    }

    // 公開URL（homepage）とリポジトリURLの確認
    const repoUrl = repo.html_url;
    const homepageUrl = repo.homepage ? repo.homepage.trim() : "";
    const targetUrl = homepageUrl || repoUrl;

    const normRepoUrl = normalizeUrl(repoUrl);
    const normTargetUrl = normalizeUrl(targetUrl);

    // 既にURLが登録済みかチェック
    if (
      excludedUrls.has(normRepoUrl) ||
      excludedUrls.has(normTargetUrl) ||
      (homepageUrl && excludedUrls.has(normalizeUrl(homepageUrl)))
    ) {
      continue;
    }

    // タイトル・サイト名の決定と自治体の判定
    const loc = detectLocation(repo.name, repo.description);

    let siteName = "";
    if (loc.municipality && loc.municipality !== "未特定") {
      siteName = `みらい議会＠${loc.municipality}`;
    } else if (loc.prefecture && loc.prefecture !== "全国") {
      siteName = `みらい議会＠${loc.prefecture}`;
    } else if (repo.description) {
      siteName = repo.description.slice(0, 30);
    } else {
      siteName = repo.name;
    }

    const candidate = {
      report_type: "new",
      site_name: siteName,
      url: targetUrl,
      prefecture: loc.prefecture,
      municipality: loc.municipality,
      governance_type: loc.governanceType,
      region: loc.region,
      author_name: `@${repo.owner?.login || "有志開発者"}`,
      author_social_url: repo.owner?.html_url || null,
      description: repo.description
        ? `${repo.description} (GitHub⭐: ${repo.stargazers_count})`
        : `GitHubリポジトリより自動検知 (⭐${repo.stargazers_count})`,
      genres: ["Webアプリ"],
      reporter_name: "🤖 GitHub自動検知ボット",
      reporter_contact: repoUrl,
      broken_detail: null,
      status: "pending", // 未確認ステータス
      admin_notes: `【自動検知】GitHub: ${repo.full_name} | Updated: ${repo.updated_at} | Stars: ${repo.stargazers_count}`,
    };

    newCandidates.push(candidate);
    // 重複追加防止
    excludedRepos.add(fullNameLower);
    excludedUrls.add(normTargetUrl);
    excludedUrls.add(normRepoUrl);
  }

  console.log(`\n=== サーチ完了: 新規候補 ${newCandidates.length} 件 ===`);

  if (newCandidates.length === 0) {
    console.log("新しく追加すべき候補は見つかりませんでした。");
    return;
  }

  // 候補一覧を出力
  for (const c of newCandidates) {
    console.log(`- [${c.prefecture} ${c.municipality} / ${c.region}] ${c.site_name} (${c.url}) - 作成者: ${c.author_name}`);
  }

  // 3. Supabaseの portal_submissions に pending として一括登録
  if (!isDryRun && supabase) {
    console.log(`\nSupabase の portal_submissions に ${newCandidates.length} 件を未確認リストとして保存中...`);
    const { data, error } = await supabase.from("portal_submissions").insert(newCandidates);
    if (error) {
      console.error("Supabase への保存に失敗しました:", error);
      process.exit(1);
    }
    console.log("✅ 正常に未確認リストへ追加されました！");
  }

  // 4. Webhook 通知（Discord / Slack 等）
  if (webhookUrl && newCandidates.length > 0) {
    console.log("Webhook 通知を送信中...");
    const candidateLines = newCandidates
      .slice(0, 5)
      .map((c) => `• **${c.site_name}** (${c.prefecture} ${c.municipality})\n  URL: ${c.url}\n  リポジトリ: ${c.reporter_contact}`)
      .join("\n\n");

    const message = {
      content: `📢 **【自動検知】新しい地方版みらい議会の候補が ${newCandidates.length} 件見つかりました！**\n\n管理画面の「未確認の申請・候補リスト」に自動追加しました。内容を確認して公開承認してください。\n\n${candidateLines}${
        newCandidates.length > 5 ? `\n\n...他 ${newCandidates.length - 5} 件` : ""
      }`,
    };

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      if (res.ok) {
        console.log("✅ Webhook 通知を送信しました。");
      } else {
        console.warn(`Webhook 送信警告 (${res.status}):`, await res.text());
      }
    } catch (err) {
      console.error("Webhook 通知エラー:", err);
    }
  }

  // 5. GitHub Step Summary に出力（GitHub Actions用）
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summaryRows = newCandidates
      .map(
        (c) =>
          `| **${c.site_name}** | ${c.prefecture} | ${c.municipality} | [リンク](${c.url}) | [GitHub](${c.reporter_contact}) | ${c.author_name} |`
      )
      .join("\n");

    const summaryContent = `### 🤖 地方版みらい議会 自動サーチ結果

**新しく ${newCandidates.length} 件の候補を検知し、管理画面の未確認リスト（キュー）に追加しました。**

| サイト名 | 都道府県 | 自治体 | 公開/リポジトリURL | GitHub | 作成者 |
| :--- | :--- | :--- | :--- | :--- | :--- |
${summaryRows}
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryContent);
  }
}

main().catch((err) => {
  console.error("実行中エラー:", err);
  process.exit(1);
});
