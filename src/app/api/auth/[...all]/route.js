import { auth } from "@/config/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth);

// Wrap handlers with CORS headers
export const GET = async (request, context) => {
  const response = await authGet(request, context);
  addCorsHeaders(response);
  return response;
};

export const POST = async (request, context) => {
  const response = await authPost(request, context);
  addCorsHeaders(response);
  return response;
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS = async () => {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}
