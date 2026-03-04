import { collections, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const col = await dbConnect(collections.APPLICATIONS);
    const apps = await col.find({}).sort({ createdAt: -1 }).toArray();
    return Response.json(apps);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
