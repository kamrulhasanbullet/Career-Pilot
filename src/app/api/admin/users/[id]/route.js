import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const VALID_ROLES = ["user", "company", "super_admin"];

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { role } = await request.json();

    if (!VALID_ROLES.includes(role)) {
      return Response.json({ message: "Invalid role" }, { status: 400 });
    }

    const usersCollection = await dbConnect(collections.USERS);

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date().toISOString() } },
      { returnDocument: "after" },
    );

    if (!result) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(result);
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
