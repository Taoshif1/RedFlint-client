import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  auth,
  firebaseInitializationError,
} from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { axiosSecure } from "../hooks/useAxiosSecure";

const googleProvider = new GoogleAuthProvider();

const requireFirebaseAuth = () => {
  if (auth) return auth;

  const error = new Error(
    "Authentication is temporarily unavailable. Please try again later.",
  );
  error.code = "auth/configuration-error";
  error.cause = firebaseInitializationError;
  throw error;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(auth));

  const syncSession = async (firebaseUser) => {
    if (!firebaseUser) {
      return axiosSecure.post("/auth/logout");
    }

    const idToken = await firebaseUser.getIdToken();

    return axiosSecure.post("/auth/jwt", {
      idToken,
    });
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(
      requireFirebaseAuth(),
      email,
      password,
    );
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(requireFirebaseAuth(), email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(requireFirebaseAuth(), googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(requireFirebaseAuth(), email);
  };

  const updateUser = (profile) => {
    return updateProfile(requireFirebaseAuth().currentUser, profile);
  };

  const logOut = async () => {
    setLoading(true);

    try {
      try {
        await axiosSecure.post("/auth/logout");
      } catch (error) {
        console.error("Server logout error:", error);
      }

      if (auth) {
        await signOut(auth);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      try {
        if (currentUser) {
          // Finish the backend session before exposing the authenticated user
          // to hooks/components that immediately call protected APIs.
          await syncSession(currentUser);
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Session sync error:", error);
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    resetPassword,
    updateUser,
    logOut,
    syncSession,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
