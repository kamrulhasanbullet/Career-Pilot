import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const col = await dbConnect(collections.RESUMES);
    const resume = await col.findOne({ email });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (err) {
    console.error("Resume by-email error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
