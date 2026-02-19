import { dbConnect, collections } from "@/lib/dbConnect";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET() {
  try {
    const user = await getSessionUser(); 
    const applicationsCollection = await dbConnect(collections.APPLICATIONS);

    const apps = await applicationsCollection
      .find({ userId: user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(apps || []);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
