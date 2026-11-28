// Cloudflare Pages Middleware: prevent preview deployments (<commit-hash>.<project>.pages.dev)
// from being indexed by search engines. Once canonical production hostname is finalized,
// extend this guard to 301-redirect non-canonical hosts (www/apex or pages.dev) cleanly.
export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> {
  const response = await context.next();
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // Cloudflare Pages branch/commit preview URLs have >= 4 DNS labels (e.g. a1b2c3.digenttech.pages.dev)
  const isPagesPreview = host.endsWith(".pages.dev") && host.split(".").length >= 4;
  const isWorkersDev = host.endsWith(".workers.dev");

  if (isPagesPreview || isWorkersDev) {
    const patched = new Response(response.body, response);
    patched.headers.set("X-Robots-Tag", "noindex, nofollow");
    return patched;
  }

  return response;
}

