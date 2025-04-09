import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient>;

async function connectToMongo() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB.");
    return client;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectToMongo();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = connectToMongo();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 