export interface Channel { name: string; url: string; logo: string; group: string; epgId: string; tsUrl?: string; }
export function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/); const out: Channel[] = []; let cur: any = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("#EXTINF")) {
      const comma = line.indexOf(","); const name = comma >= 0 ? line.slice(comma + 1).trim() : "Channel";
      const attrs: Record<string, string> = {}; const re = /([a-zA-Z0-9_-]+)="([^"]*)"/g; let m;
      while ((m = re.exec(line))) attrs[m[1].toLowerCase()] = m[2];
      cur = { name: attrs["tvg-name"] || name, logo: attrs["tvg-logo"] || "", group: attrs["group-title"] || "Uncategorized", epgId: attrs["tvg-id"] || "" };
    } else if (line.startsWith("#EXTGRP:")) { if (cur) cur.group = line.slice(8).trim() || cur.group; }
    else if (line && line[0] !== "#") {
      if (cur) { cur.url = line; out.push(cur); cur = null; }
      else out.push({ name: line, url: line, group: "Uncategorized", logo: "", epgId: "" });
    }
  }
  return out;
}
