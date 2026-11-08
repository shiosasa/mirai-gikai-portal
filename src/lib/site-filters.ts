import type { MiraiGikaiSite } from "@/types/portal";

export const AREA_SCALES = ["全国", "都道府県単位", "市区町村単位"] as const;
export const ASSEMBLY_KINDS = ["国会", "県議会", "市区町村議会"] as const;

export type AreaScale = (typeof AREA_SCALES)[number];
export type AssemblyKind = (typeof ASSEMBLY_KINDS)[number];

type ClassifiableSite = Pick<
  MiraiGikaiSite,
  "prefecture" | "governanceType" | "region" | "isOfficial"
>;

/** 掲載範囲。全国ポータルと、都道府県・市区町村の単位を分ける。 */
export function areaScaleOf(site: ClassifiableSite): AreaScale {
  if (
    site.prefecture === "全国" ||
    site.region === "全国" ||
    site.governanceType === "本家・全国"
  ) {
    return "全国";
  }
  if (site.governanceType === "都道府県") return "都道府県単位";
  return "市区町村単位";
}

/**
 * 議会の区分。
 * 公式の本家は国会、都道府県サイトは県議会、市区・町村サイトは市区町村議会。
 * 全国の地方議会まとめは特定の議会区分に入れない。
 */
export function assemblyKindOf(site: ClassifiableSite): AssemblyKind | null {
  if (site.governanceType === "本家・全国" && site.isOfficial) return "国会";
  if (site.governanceType === "都道府県") return "県議会";
  if (site.governanceType === "市区" || site.governanceType === "町村") {
    return "市区町村議会";
  }
  return null;
}
