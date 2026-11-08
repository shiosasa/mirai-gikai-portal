import { getSupabaseClient } from "./supabase";
import { DB_SNAPSHOT } from "@/data/db-snapshot";
import { INITIAL_SITES } from "@/data/sites";
import { localPortalSites } from "./site-filters";
import { isNewListing } from "./new-listing";
import { MiraiGikaiSite } from "@/types/portal";

function withNewListings(
  sites: MiraiGikaiSite[],
  now = Date.now(),
): MiraiGikaiSite[] {
  return sites.map((site) => ({
    ...site,
    isNew: isNewListing(site.createdAt, now),
  }));
}

function offlineSites(): MiraiGikaiSite[] {
  const source = DB_SNAPSHOT.length > 0 ? DB_SNAPSHOT : INITIAL_SITES;
  return withNewListings(localPortalSites(source));
}

export async function getSites(): Promise<MiraiGikaiSite[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return offlineSites();
  }

  try {
    const { data, error } = await supabase
      .from("portal_sites")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return offlineSites();
    }

    return withNewListings(localPortalSites(data.map((row: any) => ({
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
      createdAt: row.created_at,
    }))));
  } catch (err) {
    console.error("Failed to load sites from Supabase:", err);
    return offlineSites();
  }
}
