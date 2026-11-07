import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      reportType = "new",
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
      if (!prefecture || !municipality || !siteName || !url || !authorName || !description) {
        return NextResponse.json(
          { error: "必須項目が入力されていません" },
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

    const submission = {
      id: `submission-${Date.now()}`,
      reportType,
      prefecture: prefecture || null,
      municipality: municipality || null,
      governanceType: governanceType || "市区",
      region: region || "関東",
      siteName,
      url: url || null,
      authorName: authorName || null,
      authorSocialUrl: authorSocialUrl || null,
      description: description || null,
      genres: Array.isArray(genres) ? genres : [],
      reporterName: reporterName || "匿名",
      reporterContact: reporterContact || null,
      brokenDetail: brokenDetail || null,
      submittedAt: new Date().toISOString(),
    };

    console.log("【地方版みらい議会 フォーム送信を受付】", JSON.stringify(submission, null, 2));

    // Webhook通知（Discord / Slack など）
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      const typeLabel =
        reportType === "broken"
          ? "⚠️ リンク切れ・閉鎖の報告"
          : reportType === "update"
          ? "✏️ 掲載情報の変更・修正連絡"
          : "✨ 新規掲載の申請（自薦・他薦）";

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📢 **地方版みらい議会【${typeLabel}】が届きました！**\n**対象サイト**: ${siteName}\n**URL**: ${url || "未記入"}\n**地域**: ${prefecture || ""} ${municipality || ""}\n**内容**: ${brokenDetail || description}\n**報告者**: ${reporterName || "匿名"} (${reporterContact || "連絡先なし"})`,
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
