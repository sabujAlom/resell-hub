import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function POST(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function PUT(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function PATCH(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function DELETE(request, { params }) {
  return handleProxyRequest(request, params);
}

async function handleProxyRequest(request, { params }) {
  try {
    const { path } = params;
    const pathString = Array.isArray(path) ? path.join('/') : path;
    const { searchParams } = new URL(request.url);
    const queryString = new URLSearchParams(searchParams).toString();
    
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const fullUrl = `${backendUrl}/${pathString}${queryString ? '?' + queryString : ''}`;
    
    console.log(`[Proxy] ${request.method} ${fullUrl}`);
    
    const options = {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    };

    // Copy authorization and other headers from the original request
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      options.headers.authorization = authHeader;
    }

    // Copy body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        const body = await request.text();
        if (body) {
          options.body = body;
        }
      } catch (err) {
        console.log('[Proxy] No body in request');
      }
    }

    const response = await fetch(fullUrl, options);
    
    if (!response.ok) {
      console.error(`[Proxy] Backend error: ${response.status} ${response.statusText}`);
      try {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json(
          { success: false, message: `Backend error: ${response.statusText}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Proxy] Error:', error.message);
    return NextResponse.json(
      { success: false, message: `Proxy error: ${error.message}` },
      { status: 500 }
    );
  }
}
