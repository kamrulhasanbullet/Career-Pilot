"use server";

import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/lib/dbConnect";

// Register user
export const postUser = async ({ name, email, photoUrl, password }) => {
  if (!email || !password) throw new Error("Email & password required");

  const users = await dbConnect(collections.USERS);

  const exists = await users.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    provider: "credentials",
    name,
    email,
    photoUrl: photoUrl || null,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(newUser);

  if (!result.acknowledged) return null;

  // Fetch the inserted user from DB
  const createdUser = await users.findOne({ _id: result.insertedId });

  // Convert to plain object for Client Components
  const plainUser = {
    id: createdUser._id.toString(),
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
    image: createdUser.photoUrl || null,
    createdAt: createdUser.createdAt.toISOString(),
    updatedAt: createdUser.updatedAt.toISOString(),
  };

  return { success: true, user: plainUser };
};
