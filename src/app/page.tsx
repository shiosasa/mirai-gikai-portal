import { getSites } from "@/lib/get-sites";
import { PortalClient } from "@/components/portal-client";

export const revalidate = 60;

export default async function HomePage() {
  const sites = await getSites();
  return <PortalClient sites={sites} />;
}
