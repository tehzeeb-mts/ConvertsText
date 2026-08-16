/**
 * ConvertsText - Cloudflare Pages Serverless Edge Function
 * Free Cloud-Powered Grammar & Spell Checking Proxy (LanguageTool API integration)
 */

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json().catch(() => ({}));
    const text = (body.text || '').trim();
    const language = body.language || 'en-US';

    if (!text) {
      return new Response(JSON.stringify({ matches: [], score: 100 }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Prepare URL-encoded form data for LanguageTool public check API
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('language', language);
    params.append('enabledOnly', 'false');

    const ltResponse = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'ConvertsText-Online-Utility/2.4 (https://convertstext.com)'
      },
      body: params.toString()
    });

    if (!ltResponse.ok) {
      return new Response(JSON.stringify({ error: `LanguageTool API responded with ${ltResponse.status}`, fallback: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const data = await ltResponse.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, fallback: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
