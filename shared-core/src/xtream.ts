import { Channel } from "./m3u.js";
export interface XtreamCreds { host: string; user: string; pass: string; }
export async function loadXtreamLive(c: XtreamCreds, fetchJson: (u: string) => Promise<any>): Promise<Channel[]> {
  const base = c.host.replace(/\/+$/, "");
  const auth = `username=${encodeURIComponent(c.user)}&password=${encodeURIComponent(c.pass)}`;
  const api = (a: string) => `${base}/player_api.php?${auth}&action=${a}`;
  const [cats, streams] = await Promise.all([
    fetchJson(api("get_live_categories")).catch(() => []),
    fetchJson(api("get_live_streams")),
  ]);
  const catMap: Record<string, string> = {};
  (cats || []).forEach((x: any) => (catMap[x.category_id] = x.category_name));
  const ue = encodeURIComponent(c.user), pe = encodeURIComponent(c.pass);
  return (streams || []).map((s: any) => {
    const ext = `${base}/${ue}/${pe}/${s.stream_id}`;
    return { name: s.name, logo: s.stream_icon || "", group: catMap[s.category_id] || "Live",
      epgId: s.epg_channel_id || "", url: ext + ".m3u8", tsUrl: ext + ".ts" };
  });
}
