import { authOptions } from "@/lib/auth";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || session.user.email;

    const collection = await dbConnect(collections.RESUMES);
    const resume = await collection.findOne({ userId });

    if (!resume) {
      return Response.json({ error: "No resume found" }, { status: 404 });
    }

    return Response.json({ success: true, resume });
  } catch (error) {
    console.error("Resume fetch error:", error);
    return Response.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}
