import { auth } from "@/config/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth);

// Custom origin validation
function isOriginAllowed(origin) {
  if (!origin) return true; // Allow requests without origin (same-domain)
  
  const allowedOrigins = [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
  
  // Exact match
  if (allowedOrigins.includes(origin)) {
    return true;
  }
  
  // Vercel deployment - allow all .vercel.app domains
  if (origin.includes('.vercel.app')) {
    return true;
  }
  
  // Production domain if set
  if (process.env.NEXT_PUBLIC_APP_URL && origin === process.env.NEXT_PUBLIC_APP_URL) {
    return true;
  }
  
  return true; // Allow all in development, stricter in production if needed
}

// Wrap handlers with CORS headers
export const GET = async (request, context) => {
  try {
    const response = await authGet(request, context);
    return addCorsHeaders(response, request);
  } catch (error) {
    console.error('[Auth GET Error]', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
};

export const POST = async (request, context) => {
  try {
    const response = await authPost(request, context);
    return addCorsHeaders(response, request);
  } catch (error) {
    console.error('[Auth POST Error]', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS = async (request) => {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(request),
  });
};

function getCorsHeaders(request) {
  const origin = request.headers.get('origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

function addCorsHeaders(response, request) {
  const headers = getCorsHeaders(request);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
