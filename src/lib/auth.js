import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  //...other options
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      defaultValue: 'donor'
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: 'donor'
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false
      },
     
      phoneNumber: {
        type: "string"
      },
      bloodGroup: {
        type: "string"
      },
      district: {
        type: "string"
      },
      districtId: {
        type: "string"
      },
      upazila: {
        type: "string"
      },
      upazilaId: {
        type: "string"
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 24 * 30,
    }
  },
  plugins: [
    jwt()
  ]
});