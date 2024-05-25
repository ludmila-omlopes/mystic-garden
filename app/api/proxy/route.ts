// app/api/proxy/route.ts

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing target URL', { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch the requested resource. Status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Content-Type', contentType);

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response('Failed to fetch the requested resource', { status: 500 });
  }
}
