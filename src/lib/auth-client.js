import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// Create dummy client for server-side rendering
const createDummyClient = () => ({
  useSession: () => ({ data: null, isPending: true }),
  signIn: async () => { throw new Error('Auth client not available on server'); },
  signUp: async () => { throw new Error('Auth client not available on server'); },
  signOut: async () => { throw new Error('Auth client not available on server'); },
});

// Initialize auth client
let authClient = null;

if (typeof window !== 'undefined') {
  try {
    authClient = createAuthClient({
      baseURL: window.location.origin + '/api/auth',
      fetchOptions: {
        credentials: 'include',
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
  } catch (error) {
    console.error('Failed to initialize auth client:', error);
    authClient = createDummyClient();
  }
} else {
  // Use dummy client on server side
  authClient = createDummyClient();
}

export { authClient };
export const { signIn, signUp, signOut, useSession } = authClient;
