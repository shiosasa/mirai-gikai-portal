import type { MiraiGikaiSite } from "@/types/portal";

const DIET_OFFICIAL_ID = "hontai-official";
const DIET_HOST = "gikai.team-mir.ai";

type OfficialCheck = Pick<MiraiGikaiSite, "id" | "url" | "isOfficial">;

/** 国会版の本家。地方版の検索・リンク集には出さない。 */
export function isDietOfficialSite(site: OfficialCheck): boolean {
  if (site.id === DIET_OFFICIAL_ID || site.isOfficial) return true;
  try {
    return new URL(site.url).hostname === DIET_HOST;
  } catch {
    return site.url.includes(DIET_HOST);
  }
}

export function localPortalSites(sites: MiraiGikaiSite[]): MiraiGikaiSite[] {
  return sites.filter((site) => !isDietOfficialSite(site));
}

function byJapaneseName(left: string, right: string): number {
  return left.localeCompare(right, "ja");
}

function isPrefectureWideName(name: string): boolean {
  return name === "全国" || name === "北海道" || /[都府県]$/.test(name);
}

/** 県単位の検索候補。国会の本家と「全国」は含めない。 */
export function prefectureOptions(sites: MiraiGikaiSite[]): string[] {
  return [
    ...new Set(
      sites
        .map((site) => site.prefecture.trim())
        .filter((name) => name && name !== "全国"),
    ),
  ].sort(byJapaneseName);
}

/**
 * 区市町村の検索候補。
 * 県単位サイトは市区町村欄が県名と同じことが多いので、そこは県の検索に任せる。
 */
export function municipalityOptions(
  sites: MiraiGikaiSite[],
  prefecture = "すべて",
): string[] {
  return [
    ...new Set(
      sites
        .filter(
          (site) => prefecture === "すべて" || site.prefecture === prefecture,
        )
        .map((site) => site.municipality.trim())
        .filter(
          (name) =>
            name &&
            !isPrefectureWideName(name) &&
            name !== prefecture,
        ),
    ),
  ].sort(byJapaneseName);
}

export function localAreaLabel(
  site: Pick<MiraiGikaiSite, "prefecture" | "municipality" | "governanceType">,
): string {
  if (
    site.governanceType === "都道府県" ||
    site.municipality.trim() === site.prefecture.trim() ||
    isPrefectureWideName(site.municipality)
  ) {
    return "県";
  }
  return "区市町村";
}
