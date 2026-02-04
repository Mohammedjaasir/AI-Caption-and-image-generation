import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let targetUrl = searchParams.get('url');
    const prompt = searchParams.get('prompt');

    if (targetUrl) {
        // url is already assigned to targetUrl
    } else if (prompt) {
        // Construct Pollinations URL from components to avoid encoding issues
        const encodedPrompt = encodeURIComponent(prompt);
        // Seed parameter seems to cause 502 errors with Pollinations currently, so we rely on their default behavior
        targetUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024`;
    }

    if (!targetUrl) {
        return new NextResponse('Missing parameters', { status: 400 });
    }

    try {
        console.log('Proxying request to:', targetUrl);

        // Use a standard fetch with minimal headers to emulate a browser navigation or simple curl
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        });

        if (!response.ok) {
            console.error(`Proxy upstream error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Stream the body directly
        return new NextResponse(response.body, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error: any) {
        console.error('Proxy error details:', error);
        return new NextResponse(`Failed to fetch image: ${error.message}`, { status: 500 });
    }
}
