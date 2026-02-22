import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { error: "Unauthorized - Please login" },
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 2. Get jobId from params
    const paramsObj = await params;

    let jobId = paramsObj.jobId;

    // 3. Process jobId
    if (!jobId) {
      return Response.json(
        { error: "Job ID is required" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Convert to string if it's an object
    if (typeof jobId === "object") {
      jobId = jobId.$oid || jobId._id || JSON.stringify(jobId);
    }

    // Clean the jobId (remove quotes, spaces)
    jobId = String(jobId).replace(/["']/g, "").trim();

    // 4. Validate ObjectId
    if (!ObjectId.isValid(jobId)) {
      return Response.json(
        {
          error: "Invalid job ID format",
          received: jobId,
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 5. Connect to database
    const applicationsCollection = await dbConnect(collections.APPLICATIONS);
    const jobsCollection = await dbConnect(collections.JOBS);

    const objectId = new ObjectId(jobId);

    // 6. Find the job
    const job = await jobsCollection.findOne({ _id: objectId });

    if (!job) {
      return Response.json(
        { error: "Job not found" },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 7. Check if user owns this job
    if (job.companyId !== session.user.id) {
      return Response.json(
        {
          error: "You don't have permission to view applications for this job",
        },
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 8. Find applications
    const applications = await applicationsCollection
      .find({ jobId: objectId })
      .sort({ createdAt: -1 })
      .toArray();

    // 9. Return JSON response
    return Response.json(applications, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Return JSON error response
    return Response.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
