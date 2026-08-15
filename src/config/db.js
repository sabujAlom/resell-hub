import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error('Please define the DB_URI environment variable inside .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      retryWrites: false,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  // Retrieve the client instance from cache or construct it
  client = new MongoClient(uri, {
    retryWrites: false,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
} else {
  client = new MongoClient(uri, {
    retryWrites: false,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect();
}

export { client };

export function getDb() {
  return client.db('resellHubDB');
}

export async function connectDB() {
  try {
    if (process.env.NODE_ENV === 'development') {
      await clientPromise;
    } else {
      await client.connect();
    }
    console.log("Successfully connected to MongoDB!");
    return client.db('resellHubDB');
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
