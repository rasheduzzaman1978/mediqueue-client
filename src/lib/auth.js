import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("mediqueue");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  // 🔥 ADD THIS (MOST IMPORTANT)
  trustedOrigins: [
    "http://localhost:3000",
    
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  // 🔥 recommended
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

// optional
process.on('SIGTERM', async () => {
  await client.close();
});