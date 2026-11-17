import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      reportType = "new",
      recommendationType = "self",
      prefecture,
      municipality,
      siteName,
      url,
      authorName,
      authorSocialUrl,
      description,
      features,
      genres,
      governanceType,
      region,
      reporterName,
      reporterContact,
      brokenDetail,
    } = body;

    // バリデーション
    if (reportType === "broken") {
      if (!siteName || !brokenDetail) {
        return NextResponse.json(
          { error: "対象のサイト名と状況の詳細を入力してください" },
          { status: 400 }
        );
      }
    } else {
      if (!prefecture || !siteName || !url) {
        return NextResponse.json(
          { error: "必須項目（都道府県・サイト名・URL）が入力されていません" },
          { status: 400 }
        );
      }

      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: "有効なURLを入力してください" },
          { status: 400 }
        );
      }
    }

    const featureList: string[] = Array.isArray(features) ? features : [];
    const autoDescription =
      description ||
      `【${recommendationType === "self" ? "自薦" : "他薦"}】特徴: ${
        featureList.length > 0 ? featureList.join("、") : "地方版みらい議会"
      }`;

    const submission = {
      id: `submission-${Date.now()}`,
      reportType,
      recommendationType,
      prefecture: prefecture || null,
      municipality: municipality || prefecture || null,
      governanceType: governanceType || "市区",
      region: region || "関東",
      siteName,
      url: url || null,
      authorName: authorName || (recommendationType === "self" ? "開発者本人" : "推薦"),
      authorSocialUrl: authorSocialUrl || null,
      description: autoDescription,
      features: featureList,
      genres: Array.isArray(genres) ? genres : ["Webアプリ"],
      reporterName: reporterName || (recommendationType === "self" ? "自薦" : "他薦"),
      reporterContact: reporterContact || null,
      brokenDetail: brokenDetail || null,
      submittedAt: new Date().toISOString(),
    };

    console.log("【地方版みらい議会 フォーム送信を受付】", JSON.stringify(submission, null, 2));

    // Supabaseが設定されている場合は portal_submissions に保存
    const { getSupabaseClient } = await import("@/lib/supabase");
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("portal_submissions").insert({
        report_type: reportType,
        prefecture: prefecture || null,
        municipality: municipality || prefecture || null,
        governance_type: governanceType || "市区",
        region: region || "関東",
        site_name: siteName,
        url: url || null,
        author_name: submission.authorName,
        author_social_url: authorSocialUrl || null,
        description: autoDescription,
        genres: submission.genres,
        reporter_name: submission.reporterName,
        reporter_contact: reporterContact || null,
        broken_detail: brokenDetail || null,
        status: "pending",
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }
    }

    // Webhook通知（Discord / Slack など）
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      const typeLabel =
        reportType === "broken"
          ? "⚠️ リンク切れ・閉鎖の報告"
          : reportType === "update"
          ? "✏️ 掲載情報の変更・修正連絡"
          : `✨ 掲載申請（${recommendationType === "self" ? "自薦" : "他薦"}）`;

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📢 **地方版みらい議会【${typeLabel}】が届きました！**\n**対象サイト**: ${siteName}\n**URL**: ${url || "未記入"}\n**地域**: ${prefecture || ""} ${municipality || ""}\n**特徴タグ**: ${featureList.join("、") || "なし"}\n**申請区分**: ${recommendationType === "self" ? "自薦" : "他薦"}`,
          }),
        });
      } catch (err) {
        console.error("Webhook notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "送信を受け付けました",
      data: submission,
    });
  } catch (err: any) {
    console.error("Submit API error:", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
