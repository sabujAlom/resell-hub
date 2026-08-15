import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getDb } from './db.js';

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), {
    collectionNames: {
      user: "users",
      session: "sessions",
      account: "accounts",
      verification: "verification"
    }
  }),
  secret: process.env.BETTER_AUTH_SECRET || "a-super-secret-key-of-at-least-32-chars-length",
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder"
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "buyer",
        input: true
      },
      phone: {
        type: "string",
        required: false,
        input: true
      },
      location: {
        type: "string",
        required: false,
        input: true
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
        input: false
      },
      verified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false
      }
    }
  },
  trustedOrigins: [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]
});
