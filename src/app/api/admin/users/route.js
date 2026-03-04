import { dbConnect, collections } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const users = await usersCollection.find({}).toArray();
    return Response.json(users);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}