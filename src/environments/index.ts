import { config } from "dotenv";

config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || "development";

// author
const AUTHOR: string = process.env.AUTHOR || "Chnirt";

// application
const DOMAIN: string = process.env.DOMAIN || "localhost";
const PORT: number = +process.env.PORT || 3000;
const END_POINT: string = process.env.END_POINT || "graphql";
const FE_URL: string = process.env.FE_URL || "xxx";
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;

// static
const STATIC: string = process.env.STATIC || "static";

// jsonwebtoken
const ISSUER: string = process.env.ISSUER || "Chnirt corp";
const AUDIENCE: string = process.env.AUDIENCE || "http://chnirt.github.io";
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || "access-token";
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || "access-token-key";
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || "refresh-token";
const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-key";
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || "email-token";
const EMAIL_TOKEN_SECRET: string =
  process.env.EMAIL_TOKEN_SECRET || "email-token-key";
const RESETPASS_TOKEN: string =
  process.env.RESETPASS_TOKEN || "resetpass-token";
const RESETPASS_TOKEN_SECRET: string =
  process.env.RESETPASS_TOKEN_SECRET || "resetpass-token-key";

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

// nodemailer
const NODEMAILER_USER: string = process.env.NODEMAILER_USER || "xxx";
const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || "xxx";

// pubsub
const NOTIFICATION_SUBSCRIPTION = "newNotification";
const USER_SUBSCRIPTION = "newUser";
const MESSAGES_SUBSCRIPTION = "newMessages";

// passport
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || "xxx";
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || "xxx";
const GOOGLE_CALLBACK_URL: string =
  process.env.GOOGLE_CALLBACK_URL || "auth/google/callback";

const FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID || "xxx";
const FACEBOOK_APP_SECRET: string = process.env.FACEBOOK_APP_SECRET || "xxx";
const FACEBOOK_CALLBACK_URL: string =
  process.env.FACEBOOK_CALLBACK_URL || "auth/facebook/callback";

// google cloud
const GOOGLE_APPLICATION_CREDENTIALS: string =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "xxx";

// stripe
const STRIPE_PUBLIC_KEY: string = process.env.STRIPE_PUBLIC_KEY || "xxx";
const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || "xxx";
const STRIPE_PLAN: string = process.env.STRIPE_PLAN || "xxx";

// jwt
const JWT_SECRET: string = process.env.JWT_SECRET || "duydeptrai";
const ACCESS_TOKEN_EXP: string = process.env.ACCESS_TOKEN_EXP || "30d";
const REFRESH_TOKEN_EXP: string = process.env.REFRESH_TOKEN_EXP || "7d";

// cloudinary
const CLOUDINARY = "Cloudinary";
const CLOUDINARY_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUD_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUD_API_SECRET;
// pagination
const PAGE_MAX_OFFSET = 20;

export {
  NODE_ENV,
  AUTHOR,
  DOMAIN,
  PORT,
  END_POINT,
  FE_URL,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
  STATIC,
  ISSUER,
  AUDIENCE,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SECRET,
  RESETPASS_TOKEN,
  RESETPASS_TOKEN_SECRET,
  EMAIL_TOKEN,
  EMAIL_TOKEN_SECRET,
  BCRYPT_SALT,
  NODEMAILER_USER,
  NODEMAILER_PASS,
  USER_SUBSCRIPTION,
  NOTIFICATION_SUBSCRIPTION,
  MESSAGES_SUBSCRIPTION,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_APPLICATION_CREDENTIALS,
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_PLAN,
  JWT_SECRET,
  ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_EXP,
  CLOUDINARY,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PAGE_MAX_OFFSET,
};
