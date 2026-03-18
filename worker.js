export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://kylekensrue-design.github.io',
      'Content-Type': 'application/json',
    };

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const response = await fetch('https://zenquotes.io/api/today', {
        headers: { 'User-Agent': 'DailyQuoteApp/1.0' },
      });
      const data = await response.text();
      return new Response(data, {
        status: response.status,
        headers: { ...corsHeaders, 'Cache-Control': 'public, max-age=3600' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to fetch quote' }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
