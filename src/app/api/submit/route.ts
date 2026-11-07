import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      prefecture,
      municipality,
      siteName,
      url,
      authorName,
      authorSocialUrl,
      description,
      genres,
      governanceType,
      region,
    } = body;

    // 必須項目のバリデーション
    if (!prefecture || !municipality || !siteName || !url || !authorName || !description) {
      return NextResponse.json(
        { error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    // URL形式の簡易チェック
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "有効なURLを入力してください" },
        { status: 400 }
      );
    }

    const submission = {
      id: `submission-${Date.now()}`,
      prefecture,
      municipality,
      governanceType: governanceType || "市区",
      region: region || "関東",
      siteName,
      url,
      authorName,
      authorSocialUrl: authorSocialUrl || null,
      description,
      genres: Array.isArray(genres) ? genres : [],
      submittedAt: new Date().toISOString(),
    };

    console.log("【地方版みらい議会 登録申請を受付】", JSON.stringify(submission, null, 2));

    // Webhook通知（Discord / Slack など）が設定されている場合は通知
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📢 **地方版みらい議会の新しい登録申請が届きました！**\n**サイト名**: ${siteName}\n**地域**: ${prefecture} ${municipality}\n**URL**: ${url}\n**製作者**: ${authorName}\n**紹介**: ${description}`,
          }),
        });
      } catch (err) {
        console.error("Webhook notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "登録申請を受け付けました",
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
