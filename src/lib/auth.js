import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("mediqueue");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  // 🔥 ADD THIS (MOST IMPORTANT)
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
     "http://localhost:3000",
     "https://mediqueue-client-snowy.vercel.app",
    
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
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      //max 7 days, but you can adjust as needed
       maxAge: 60 * 60 * 24 * 7, // 7 days
    }
  },
  // plugins: [
  //   jwt()
  // ],

  plugins: [
  jwt({
    jwt: {
      definePayload: ({ user }) => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
    },
  }),
],

  // 🔥 recommended
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

// optional
process.on('SIGTERM', async () => {
  await client.close();
});