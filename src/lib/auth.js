import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/lib/dbConnect";

// Helper function to login user via credentials
async function loginUser({ email, password }) {
  const users = await dbConnect(collections.USERS);
  const user = await users.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || "user",
    image: user.photoUrl || null, // include avatar
  };
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    // Credentials Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        return await loginUser(credentials);
      },
    }),

    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // SignIn callback → Google auto upsert in DB
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const users = await dbConnect(collections.USERS);
        await users.updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name,
              photoUrl: user.image,
              provider: "google",
              role: "user",
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true }
        );
      }
      return true;
    },

    // JWT callback → attach email, role, image
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || "user";
        token.image = user.image || null;
      }
      return token;
    },

    // Session callback → pass token fields to session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.image || null;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
