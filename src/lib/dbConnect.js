import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Ensure MongoDB is connected before returning collection
export const dbConnect = async (collectionName) => {
  // Simple check to ensure client is connected
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

export const collections = {
  USERS: "users",
  JOBS: "jobs",
  APPLICATIONS: "applications",
};
