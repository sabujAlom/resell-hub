import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000",
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
