/**
 * ConvertsText - Cloudflare Worker Entry Point
 * Handles static asset fetching, caching headers, 404 routing,
 * and automatic noindex enforcement for *.pages.dev & *.workers.dev domains.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Try fetching the requested static asset
    let response = await env.ASSETS.fetch(request);

    // If asset not found (404), serve 404.html
    if (response.status === 404) {
      const notFoundUrl = new URL('/404.html', request.url);
      const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl, request));
      return new Response(notFoundResponse.body, {
        status: 404,
        headers: {
          ...Object.fromEntries(notFoundResponse.headers),
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, follow'
        }
      });
    }

    // Clone headers to inject caching and security headers
    const newHeaders = new Headers(response.headers);
    
    // Security headers
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Automatically enforce NOINDEX on staging domains (*.pages.dev and *.workers.dev)
    if (url.hostname.endsWith('.pages.dev') || url.hostname.endsWith('.workers.dev')) {
      newHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    }

    // Cache static assets (CSS, JS, SVG, XML) for 7 days, HTML for 1 hour
    if (url.pathname.match(/\.(css|js|svg|png|jpg|ico|woff2)$/)) {
      newHeaders.set('Cache-Control', 'public, max-age=604800, immutable');
    } else {
      newHeaders.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
