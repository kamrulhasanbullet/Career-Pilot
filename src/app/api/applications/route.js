import { ObjectId } from "mongodb";
import { dbConnect, collections } from "@/lib/dbConnect";
import { getSessionUser } from "@/lib/getSessionUser";

export async function POST(req) {
  try {
    const user = await getSessionUser();
    const { jobId } = await req.json();

    const jobs = await dbConnect(collections.JOBS);
    const applications = await dbConnect(collections.APPLICATIONS);

    const job = await jobs.findOne({ _id: new ObjectId(jobId) });
    if (!job) {
      return Response.json({ message: "Job not found" }, { status: 404 });
    }

    // Prevent duplicate apply
    const alreadyApplied = await applications.findOne({
      jobId: new ObjectId(jobId),
      userId: user.id,
    });

    if (alreadyApplied) {
      return Response.json({ message: "Already applied" }, { status: 400 });
    }

    // Insert full data into applications
    await applications.insertOne({
      jobId: new ObjectId(jobId),
      companyId: job.companyId,
      userId: user.id,
      userName: user.name || "",
      userEmail: user.email,
      companyName: job.companyName,
      position: job.position,
      salary: job.salary,
      status: "pending",
      createdAt: new Date(),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
