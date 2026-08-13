import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const cleanEnvironmentValue = (value) => {
  if (typeof value !== "string") return value;

  return value.trim().replace(/^(["'])(.*)\1$/, "$2");
};

const firebaseConfig = {
  apiKey: cleanEnvironmentValue(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: cleanEnvironmentValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnvironmentValue(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnvironmentValue(
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  ),
  messagingSenderId: cleanEnvironmentValue(
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  ),
  appId: cleanEnvironmentValue(import.meta.env.VITE_FIREBASE_APP_ID),
};

let app = null;
let auth = null;
let firebaseInitializationError = null;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error("VITE_FIREBASE_API_KEY is missing.");
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  firebaseInitializationError = error;
}

export { app, auth, firebaseInitializationError };
