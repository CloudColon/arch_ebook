import "server-only";

export function siteOrigin(req: Request) {
  return process.env.SITE_URL ?? new URL(req.url).origin;
}
