// End-to-end-encrypted sync client (WebCrypto). Server stores ciphertext only.
export async function deriveKey(password: string, email: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: enc.encode("aurora|" + email), iterations: 200000, hash: "SHA-256" },
    km, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}
export async function encrypt(key: CryptoKey, obj: unknown): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(obj))));
  const out = new Uint8Array(12 + ct.length); out.set(iv); out.set(ct, 12);
  return btoa(String.fromCharCode(...out));
}
export async function decrypt(key: CryptoKey, b64: string): Promise<any> {
  const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: raw.slice(0, 12) }, key, raw.slice(12));
  return JSON.parse(new TextDecoder().decode(pt));
}
