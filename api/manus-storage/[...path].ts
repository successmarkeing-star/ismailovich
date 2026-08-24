import { ENV } from "../../server/_core/env";

export default async function handler(req: any, res: any) {
  const rawPath = typeof req.url === "string" ? req.url.split("?")[0] : "";
  const key = rawPath.replace(/^\/api\/manus-storage\/?/, "").replace(/^\/+/, "");

  if (!key) {
    res.status(400).send("Missing storage key");
    return;
  }

  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    res.status(500).send("Storage proxy not configured");
    return;
  }

  try {
    const forgeUrl = new URL(
      "v1/storage/presign/get",
      ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
    );
    forgeUrl.searchParams.set("path", key);

    const forgeResp = await fetch(forgeUrl, {
      headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
    });

    if (!forgeResp.ok) {
      res.status(502).send("Storage backend error");
      return;
    }

    const { url } = (await forgeResp.json()) as { url?: string };
    if (!url) {
      res.status(502).send("Empty signed URL from backend");
      return;
    }

    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
    res.redirect(307, url);
  } catch (error) {
    console.error("[VercelStorageProxy] failed:", error);
    res.status(502).send("Storage proxy error");
  }
}
