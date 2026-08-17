/**
 * ConvertsText - Cloudflare Pages Edge Middleware
 * Intercepts all incoming requests on Cloudflare Pages and automatically
 * enforces NOINDEX on all *.pages.dev and staging preview domains.
 */

export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // If accessed via *.pages.dev or *.workers.dev staging/preview domains
  if (hostname.endsWith('.pages.dev') || hostname.endsWith('.workers.dev') || hostname.includes('preview')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}
