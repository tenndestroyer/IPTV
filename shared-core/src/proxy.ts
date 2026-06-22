// Proxy / transcode URL builders. `base` is your origin, e.g. https://kingpickz.com
export function b64url(s: string): string {
  const b = typeof btoa !== "undefined" ? btoa(unescape(encodeURIComponent(s)))
    : (globalThis as any).Buffer.from(s, "utf8").toString("base64");
  return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function proxyUrl(base: string, url: string, ua?: string): string {
  let q = base + "/iptv-stream/proxy?b64=1&u=" + b64url(url);
  if (ua) q += "&ua=" + encodeURIComponent(ua);
  return q;
}
export function hlsUrl(base: string, url: string, ua?: string): string {
  let q = base + "/iptv-stream/hls?b64=1&u=" + b64url(url);
  if (ua) q += "&ua=" + encodeURIComponent(ua);
  return q;
}
export function transcodeUrl(base: string, url: string, mode: "audio" | "full" = "audio", ua?: string): string {
  let q = base + "/iptv-stream/transcode?b64=1&u=" + b64url(url) + "&mode=" + mode;
  if (ua) q += "&ua=" + encodeURIComponent(ua);
  return q;
}
