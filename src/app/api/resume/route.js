import { authOptions } from "@/lib/auth";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, skills, experience, title } = body;

    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    const collection = await dbConnect(collections.RESUMES);

    const userId = session.user.id || session.user.email;

    // Upsert — same user resume replace will be replaced, otherwise new resume will be created
    const result = await collection.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          name,
          email,
          skills,
          experience,
          title,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Resume save error:", error);
    return Response.json({ error: "Failed to save resume" }, { status: 500 });
  }
}
