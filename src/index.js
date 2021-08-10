// FRAMEWORK LAYER (Nr. 4)
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
const admin = require("firebase-admin");
const port = process.env.PORT || 5000;
dotenv.config();

// firebase init
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_PROVIDER_X509_CERT_URL,
  }),
  databaseURL:
    process.env.NODE_ENV === "production"
      ? "saas-production-name.firebaseio.com"
      : `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

// controllers
import { postFirebaseVerifyLogin } from "./auth/controllers";
import { getUser, deleteAccount, putProfilePicture } from "./user/controllers";
import {
  postCustomerPortal,
  postWebhook,
  getSubscription,
} from "./stripe/controllers";
import { getPresignedUrlAwsImage } from "./media/controllers";
import { basic, premium } from "./feautures/controllers";

// helpers
import makeCallback from "./helpers/express-callback";

const app = express();

// CORS
console.log(
  "ORIGIN",
  process.env.NODE_ENV === "production"
    ? "https://yourcompany.com"
    : "http://localhost:3000"
);
const corsOptions = {
  exposedHeaders: "Authorization",
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? "https://yourcompany.com"
      : "http://localhost:3000", // http://localhost:3000
};
app.use(cors(corsOptions));

// BODY PARSER
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.get("/ping", (req, res) => {
  res.send("pong");
});

// auth
app.post("/api/auth/firebase-login", makeCallback(postFirebaseVerifyLogin));

// user
app.get("/api/user", makeCallback(getUser));
app.delete("/api/user/delete-account", makeCallback(deleteAccount));
app.put("/api/user/update-photo-url", makeCallback(putProfilePicture));

// media
app.post("/api/media/aws/image", makeCallback(getPresignedUrlAwsImage)); // awss3

// stripe
app.post(
  "/api/stripe/create-customer-portal-session",
  makeCallback(postCustomerPortal)
);
app.post("/webhook", makeCallback(postWebhook));
app.get("/api/stripe/subscription", makeCallback(getSubscription));

// feautures
app.get("/api/feauture/basic", makeCallback(basic));
app.get("/api/feauture/premium", makeCallback(premium));

app.listen(port, () => console.log(`Listening on port ${port}`));
