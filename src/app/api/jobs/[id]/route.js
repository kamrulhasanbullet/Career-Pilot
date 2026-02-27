import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";

// ─── PATCH  /api/jobs/[id] ────────────────────────────────────────────────────
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const body = await request.json();

    const allowedFields = [
      "position",
      "companyName",
      "location",
      "salary",
      "type",
      "description",
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    updateData.updatedAt = new Date();

    const jobsCollection = await dbConnect(collections.JOBS);
    const result = await jobsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Also update on applications collections
    const applicationsCollection = await dbConnect(collections.APPLICATIONS);
    await applicationsCollection.updateMany(
      { jobId: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } },
    );

    return NextResponse.json({ success: true, updated: updateData });
  } catch (err) {
    console.error("PATCH /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── DELETE  /api/jobs/[id] ───────────────────────────────────────────────────
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const jobsCollection = await dbConnect(collections.JOBS);
    const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Also remove all applications tied to this job
    const applicationsCollection = await dbConnect(collections.APPLICATIONS);
    await applicationsCollection.deleteMany({ jobId: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── GET  /api/jobs/[id] ──────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const jobsCollection = await dbConnect(collections.JOBS);
    const job = await jobsCollection.findOne({ _id: new ObjectId(id) });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (err) {
    console.error("GET /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
