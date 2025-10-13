
export type DeviceType = 'Mobile' | 'Tablet' | 'Pc' | 'Unknown';

export interface ClientInfo {
  operatingSystem: string;     // best-effort human readable (e.g. "Windows", "Android")
  deviceType: DeviceType;      // 'mobile' | 'tablet' | 'desktop' | 'unknown'
  timeZone: string;     // IANA timezone (client-side)
  referer: string;      // document.referrer (may be empty)
  ipAddress: string;    // best-effort public IP (from ipify / fallback)
}

/**
 * Try to fetch public IP from multiple public services.
 * Returns null if all attempts fail.
 */
const fetchPublicIp = async (): Promise<string> => {
  // Keep requests short — they are best-effort (and can fail/be blocked).
  try {
    const r = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    if (!r.ok) throw new Error('ipify failed');
    const j = await r.json();
    if (typeof j?.ip === 'string' && j.ip.length) return j.ip;
  } catch (e) {
    // fallback to icanhazip (plain text)
    try {
      const r2 = await fetch('https://icanhazip.com/', { cache: 'no-store' });
      if (!r2.ok) throw new Error('icanhazip failed');
      const txt = (await r2.text()).trim();
      if (txt) return txt;
    } catch (_e) {
      return "0.0.0.0";
    }
  }
  return "0.0.0.0";
}

/**
 * Detect operating system and device type (best-effort).
 * Uses navigator.userAgentData when available, otherwise falls back to userAgent string heuristics.
 */
const detectOsAndDevice = (): { operatingSystem: string; deviceType: DeviceType } => {
  const uaData = (navigator as any).userAgentData;
  if (uaData) {
    // userAgentData is structured and more reliable when available
    const platform = uaData.platform ?? 'Unknown';
    const brands = uaData.brands ?? uaData.uaList ?? [];
    // simple mobile check
    const isMobile = !!uaData.mobile;
    return {
      operatingSystem: String(platform),
      deviceType: isMobile ? 'Mobile' : 'Pc',
    };
  }

  const ua = navigator.userAgent || '';
  let operatingSystem = 'Unknown';
  if (/android/i.test(ua)) operatingSystem = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) operatingSystem = 'iOS';
  else if (/windows phone/i.test(ua)) operatingSystem = 'Windows Phone';
  else if (/windows nt/i.test(ua)) operatingSystem = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) operatingSystem = 'macOS';
  else if (/linux/i.test(ua)) operatingSystem = 'Linux';

  let deviceType: DeviceType = 'Pc';
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(ua)) deviceType = 'Mobile';
  else if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) deviceType = 'Tablet';

  return { operatingSystem, deviceType };
}

/**
 * Gather client info (best-effort). This function performs one optional external network call
 * to get the public IP (can be disabled via `opts.fetchIp = false`).
 */
const getClientInfo = async (): Promise<ClientInfo> => {
  const { operatingSystem, deviceType } = detectOsAndDevice();
  const timeZone = (Intl && (Intl as any).DateTimeFormat)
    ? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Unknown"
    : "Unknown";

  const referer = typeof document !== 'undefined' ? (document.referrer || "https://unknown.com") : "https://unknown.com";

  const ipAddress = await fetchPublicIp();

  console.log("infos : ", operatingSystem,
    deviceType,
    timeZone,
    referer,
    ipAddress,)

  return {
    operatingSystem,
    deviceType,
    timeZone,
    referer,
    ipAddress,
  };
}

export default getClientInfo;