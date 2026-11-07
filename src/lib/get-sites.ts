import { getSupabaseClient } from "./supabase";
import { INITIAL_SITES } from "@/data/sites";
import { MiraiGikaiSite } from "@/types/portal";

export async function getSites(): Promise<MiraiGikaiSite[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return INITIAL_SITES;
  }

  try {
    const { data, error } = await supabase
      .from("portal_sites")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_SITES;
    }

    return data.map((row: any) => ({
      id: row.id,
      prefecture: row.prefecture,
      municipality: row.municipality,
      siteName: row.site_name,
      url: row.url,
      authorName: row.author_name,
      authorSocialUrl: row.author_social_url || undefined,
      description: row.description,
      genres: row.genres ?? [],
      governanceType: row.governance_type,
      region: row.region,
      isOfficial: row.is_official,
    }));
  } catch (err) {
    console.error("Failed to load sites from Supabase:", err);
    return INITIAL_SITES;
  }
}
