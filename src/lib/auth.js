import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';

const databaseUri = process.env.DB_URI;

if (!databaseUri) {
  throw new Error('DB_URI is required to initialize Better Auth.');
}

const client = new MongoClient(databaseUri);
const database = client.db();
// This Better Auth server is hosted by this Next.js app.
// Use the deployed client URL in production; default to the local dev origin.
const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173';

export const auth = betterAuth({
  baseURL,
  // Must match the JWT_SECRET the external REST API uses to verify tokens.
  secret: process.env.BETTER_AUTH_SECRET || process.env.JWT_SECRET,
  trustedOrigins: [baseURL, 'http://localhost:5173'],
  database: mongodbAdapter(database, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session :{
   cookieCache: {
    enabled: true,
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
   }
  },
  plugins:[
    jwt()
  ],
  user: {
    additionalFields: {
      role: {
        type: ['buyer', 'seller', 'admin'],
        required: false,
        defaultValue: 'buyer',
      },
      phone: {
        type: 'string',
        required: false,
      },
      location: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        required: false,
        defaultValue: 'active',
      },
      verified: {
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
    },
  },
});
