import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Use relative URL to ensure same-domain requests on both local and Vercel
  // This works because the auth API is served from /api/auth on the same domain
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  fetchOptions: {
    credentials: 'include', // Important: Send cookies with auth requests
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        phone: { type: "string" },
        location: { type: "string" },
        status: { type: "string" },
        verified: { type: "boolean" }
      }
    })
  ]
});

export const { signIn, signUp, signOut, useSession } = authClient;
