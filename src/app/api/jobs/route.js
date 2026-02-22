import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// company job post 
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "company") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const jobsCollection = await dbConnect(collections.JOBS);

    const job = {
      position: body.position,
      companyName: body.company,
      location: body.location,
      salary: body.salary,
      type: body.type,
      tags: body.tags.split(",").map(t => t.trim()),
      description: body.description,
      companyId: session.user.id, 
      createdAt: new Date(),
    };

    const result = await jobsCollection.insertOne(job);

    return NextResponse.json(
      { ...job, _id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to post job" },
      { status: 500 }
    );
  }
}

// GET: public OR company-wise jobs
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const companyOnly = searchParams.get("company");

  const session = await getServerSession(authOptions);
  const jobsCollection = await dbConnect(collections.JOBS);

  let query = {};

  // company dashboard
  if (companyOnly === "true" && session?.user?.role === "company") {
    query.companyId = session.user.id;
  }

  const jobs = await jobsCollection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(jobs);
}
