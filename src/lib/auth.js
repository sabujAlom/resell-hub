import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const databaseUri = process.env.DB_URI;

if (!databaseUri) {
  throw new Error('DB_URI is required to initialize Better Auth.');
}

const client = new MongoClient(databaseUri);
const database = client.db();
// This Better Auth server is hosted by the local Next.js app.
const baseURL = 'http://localhost:5173';

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [baseURL],
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
  user: {
    additionalFields: {
      role: {
        type: ['buyer', 'seller'],
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
