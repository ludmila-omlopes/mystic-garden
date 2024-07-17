// não está sendo usado por enquanto.

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing target URL', { status: 400 });
  }

  try {
    const fileUrl = targetUrl + pathname.replace('/api/proxy', '');
    const response = await fetch(fileUrl, {
      headers: {
        'Accept-Encoding': 'identity', // Request uncompressed content
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the requested resource. Status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Content-Type', contentType);

    return new Response(await response.arrayBuffer(), {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response('Failed to fetch the requested resource', { status: 500 });
  }
}
