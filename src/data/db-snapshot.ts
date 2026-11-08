import type { MiraiGikaiSite } from "@/types/portal";

/** Production listing snapshot used only when Supabase env is missing. */
export const DB_SNAPSHOT: MiraiGikaiSite[] = [
  {
    "id": "hontai-official",
    "prefecture": "全国",
    "municipality": "公式",
    "siteName": "みらい議会（公式）",
    "url": "https://gikai.team-mir.ai/",
    "authorName": "チームみらい",
    "authorSocialUrl": "https://x.com/team_mir_ai",
    "description": "本家本元。テクノロジーを活用して議会や政治を身近にする公式プラットフォーム。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "本家・全国",
    "region": "全国",
    "isOfficial": true,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "zenkoku-portal",
    "prefecture": "全国",
    "municipality": "全国",
    "siteName": "みらい議会＠全国地方議会",
    "url": "https://mirai-gikai-zenkoku.vercel.app/",
    "authorName": "Syogo-Suganoya",
    "authorSocialUrl": "https://x.com/ssuga620282",
    "description": "全国の地方議会で審議されている議案を日本地図などから探せる非公式ポータル。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "本家・全国",
    "region": "全国",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "kanagawa-pref",
    "prefecture": "神奈川県",
    "municipality": "神奈川県",
    "siteName": "みらい議会＠神奈川県",
    "url": "https://mirai-gikai-kanagawa-web.vercel.app/",
    "authorName": "Gondow",
    "authorSocialUrl": "https://x.com/GondowTakashi",
    "description": "神奈川県議会の審議内容を分かりやすく届ける地方版みらい議会。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "都道府県",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "nara-pref",
    "prefecture": "奈良県",
    "municipality": "奈良県",
    "siteName": "みらい議会＠奈良県",
    "url": "https://mirai-gikai-nara-web.vercel.app/",
    "authorName": "有志開発者",
    "description": "奈良県議会の情報や議案を準備中の模様。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "都道府県",
    "region": "近畿",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "fukuoka-pref",
    "prefecture": "福岡県",
    "municipality": "福岡県",
    "siteName": "みらい議会＠福岡県",
    "url": "https://t.co/qqswRe6FJS",
    "authorName": "バクモン",
    "authorSocialUrl": "https://x.com/m_gikai_fukuoka",
    "description": "福岡県議会の議案・審議情報を市民目線で伝えるプラットフォーム。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "都道府県",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "tokorozawa-city",
    "prefecture": "埼玉県",
    "municipality": "所沢市",
    "siteName": "みらい議会＠所沢市",
    "url": "https://mirai-gikai-tokorozawa.vercel.app/",
    "authorName": "有志開発者",
    "description": "所沢市議会の動きを届ける地域版みらい議会。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "kimitsu-city",
    "prefecture": "千葉県",
    "municipality": "君津市",
    "siteName": "みらい議会＠君津市",
    "url": "https://mirai-gikai-kimitsu-web.vercel.app/",
    "authorName": "大竹みちたか",
    "authorSocialUrl": "https://instagram.com/michitakaotake",
    "description": "君津市議会の議案解説や取り組みをわかりやすく。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "chuo-ward",
    "prefecture": "東京都",
    "municipality": "中央区",
    "siteName": "みらい議会＠中央区",
    "url": "https://mirai-gikai.yukihoz.tokyo/",
    "authorName": "ほづみゆうき",
    "authorSocialUrl": "https://x.com/ninofku",
    "description": "中央区議会議員ほづみゆうきさん管理。東京都中央区議会を暮らしの目線で解説。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "shinjuku-ward",
    "prefecture": "東京都",
    "municipality": "新宿区",
    "siteName": "みらい議会＠新宿区",
    "url": "https://miraigikai-shinjuku-web.vercel.app/",
    "authorName": "新宿区民A",
    "authorSocialUrl": "https://github.com/OchiK",
    "description": "新宿区議会の審議情報を身近に届けるサイト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "setagaya-ward",
    "prefecture": "東京都",
    "municipality": "世田谷区",
    "siteName": "みらい議会＠世田谷",
    "url": "https://civictech-setagaya.org/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://x.com/DD_Setagaya",
    "description": "世田谷区の地域課題と議会をつなぐ取り組み。",
    "genres": [
      "Webアプリ",
      "データ分析"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "ota-ward",
    "prefecture": "東京都",
    "municipality": "大田区",
    "siteName": "みらい議会＠大田区",
    "url": "https://ota.aix.tokyo/",
    "authorName": "masao-kunii",
    "authorSocialUrl": "https://x.com/kunii_masa17608",
    "description": "大田区議会をやさしく伝える市民情報サイト。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "adachi-ward",
    "prefecture": "東京都",
    "municipality": "足立区",
    "siteName": "みらい議会＠足立区",
    "url": "https://mirai-gikai-adachi-web.vercel.app/",
    "authorName": "ワクワクみらい政策ラボ",
    "authorSocialUrl": "https://x.com/0909mirai_lab",
    "description": "足立区議会の審議を市民の目線でやさしく整理。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "sumida-ward",
    "prefecture": "東京都",
    "municipality": "墨田区",
    "siteName": "みらい議会＠墨田区",
    "url": "https://mirai-gikai-sumida.gorisan.info/",
    "authorName": "井上ひろき",
    "authorSocialUrl": "https://x.com/gorisan_it",
    "description": "墨田区議会を身近にする地域特化サイト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "tachikawa-city",
    "prefecture": "東京都",
    "municipality": "立川市",
    "siteName": "みらい議会＠立川市",
    "url": "https://mirai-gikai-tachikawa-web.vercel.app/",
    "authorName": "ぷれ",
    "authorSocialUrl": "https://x.com/miraigikai_tckw",
    "description": "立川市議会の情報・議案をやさしく伝えるサイト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "kawasaki-city",
    "prefecture": "神奈川県",
    "municipality": "川崎市",
    "siteName": "みらい議会＠川崎市",
    "url": "https://mirai-gikai-kawasaki-web.vercel.app/",
    "authorName": "Gondow",
    "authorSocialUrl": "https://x.com/GondowTakashi",
    "description": "川崎市議会に特化した地域版みらい議会。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "sagamihara-city",
    "prefecture": "神奈川県",
    "municipality": "相模原市",
    "siteName": "みらい議会＠相模原市",
    "url": "https://miraigikai-sagamihara.vercel.app/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://github.com/tauon-neutrino-ai",
    "description": "相模原市議会を暮らしの視点でわかりやすく。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "hayama-town",
    "prefecture": "神奈川県",
    "municipality": "葉山町",
    "siteName": "みらい議会＠葉山町",
    "url": "https://hayama-gikai-web.vercel.app/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://x.com/Yasuaki_jp",
    "description": "町村単位でも広がるみらい議会。葉山町議会の動きを身近に。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "町村",
    "region": "関東",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "numazu-city",
    "prefecture": "静岡県",
    "municipality": "沼津市",
    "siteName": "みらい議会＠沼津市",
    "url": "https://mirai-numazu.com/",
    "authorName": "せいいち",
    "authorSocialUrl": "https://x.com/seiichi3141",
    "description": "沼津市議会をわかりやすく、市民に身近に届けるプロジェクト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "中部",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "kuwana-city",
    "prefecture": "三重県",
    "municipality": "桑名市",
    "siteName": "みらい議会＠桑名市",
    "url": "https://mirai-gikai-kuwana-web.vercel.app/",
    "authorName": "Cat.Person.Optimist",
    "authorSocialUrl": "https://x.com/C_P_Optimist",
    "description": "桑名市議会の議案や議論をやさしく伝えるサイト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "中部",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "nagoya-city",
    "prefecture": "愛知県",
    "municipality": "名古屋市",
    "siteName": "みらい議会＠愛知・名古屋",
    "url": "https://mirai-gikai-nagoya.vercel.app/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://x.com/ssuga620282",
    "description": "名古屋市議会を市民向けにやさしく解説。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "中部",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "kusatsu-city",
    "prefecture": "滋賀県",
    "municipality": "草津市",
    "siteName": "みらい議会＠草津市",
    "url": "https://mirai-gikai-kusatsu.vercel.app/",
    "authorName": "八木よしと",
    "authorSocialUrl": "https://x.com/YY_papa",
    "description": "草津市議会議員・八木よしとさん管理。草津市議会を分かりやすく身近に。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "近畿",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "hirakata-city",
    "prefecture": "大阪府",
    "municipality": "枚方市",
    "siteName": "みらい議会＠枚方市",
    "url": "https://mirai-gikai-hirakata-city-web-three.vercel.app/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://x.com/huchanmaru",
    "description": "枚方市議会の議案解説・市民情報プラットフォーム。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "近畿",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "akitakata-city",
    "prefecture": "広島県",
    "municipality": "安芸高田市",
    "siteName": "みらい議会＠安芸高田市",
    "url": "https://mirai-gikai-akitakata-city-web.vercel.app/",
    "authorName": "バクモン",
    "authorSocialUrl": "https://x.com/bakumon0907",
    "description": "安芸高田市議会の審議をやさしく整理して発信。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "中国・四国",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "fukuoka-city",
    "prefecture": "福岡県",
    "municipality": "福岡市",
    "siteName": "みらい議会＠福岡市",
    "url": "https://mirai-gikai-fukuoka-city-web-6wib.vercel.app/",
    "authorName": "バクモン",
    "authorSocialUrl": "https://x.com/m_gikai_fukuoka",
    "description": "福岡市議会の議案・市政をやさしく届けるプラットフォーム。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "市区",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "tagawa-city",
    "prefecture": "福岡県",
    "municipality": "田川市",
    "siteName": "みらい議会＠田川市",
    "url": "https://tagawa-gikai.jp/",
    "authorName": "田川市政ラボ",
    "authorSocialUrl": "https://github.com/Suuuisui/mirai-gikai-tagawa",
    "description": "田川市議会の情報発信サイト。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "fukutsu-city",
    "prefecture": "福岡県",
    "municipality": "福津市",
    "siteName": "みらい議会＠福津市",
    "url": "https://mirai-gikai-fukutsu.jp/",
    "authorName": "tee",
    "authorSocialUrl": "https://docs.google.com/forms/d/e/1FAIpQLSesbPS6Fd0wwEE_J4L9eE1inyYV8fp_eALoBEaV4kMoNUh3DA/viewform?pli=1",
    "description": "福津市議会の動きを市民へ。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "市区",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "hirokawa-town",
    "prefecture": "福岡県",
    "municipality": "広川町",
    "siteName": "みらい議会＠広川町",
    "url": "https://mirai-gikai-web-ashen.vercel.app/",
    "authorName": "有志開発者",
    "description": "広川町議会の情報をやさしく解説。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "町村",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "onga-town",
    "prefecture": "福岡県",
    "municipality": "遠賀町",
    "siteName": "みらい議会＠遠賀町",
    "url": "https://miraigikai.onga-mirai-tech.com/",
    "authorName": "有志開発者",
    "authorSocialUrl": "https://x.com/OngaMiraiTech",
    "description": "遠賀町議会の議論をテクノロジーで身近に。",
    "genres": [
      "Webアプリ"
    ],
    "governanceType": "町村",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  },
  {
    "id": "oita-city",
    "prefecture": "大分県",
    "municipality": "大分市",
    "siteName": "みらいぎかいっち＠大分市",
    "url": "https://mirai-gikai-oitacity-web.vercel.app/",
    "authorName": "「となりの政治」しおぱん",
    "authorSocialUrl": "https://x.com/shiopan_222",
    "description": "「おおいたん市議会っち何しよん？」暮らしの視点で市議会をやさしく伝える市民情報サイト。AI要約やインタビューも搭載。",
    "genres": [
      "Webアプリ",
      "AI要約・チャット"
    ],
    "governanceType": "市区",
    "region": "九州・沖縄",
    "isOfficial": false,
    "createdAt": "2026-11-08T01:54:18.412084+00:00"
  }
];
