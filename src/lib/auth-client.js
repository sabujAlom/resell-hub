import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Use local auth endpoint - always same-domain
  baseURL: '/api/auth',
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
