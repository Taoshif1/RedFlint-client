import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { user: dbUser, loading: userLoading } = useUser();

  console.log({
    firebaseUser: user,
    dbUser,
    loading,
    userLoading,
    role: dbUser?.role,
  });

  if (loading || userLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    console.log("❌ Redirecting: No Firebase user");
    return <Navigate to="/login" replace />;
  }

  if (!dbUser) {
    console.log("❌ Redirecting: No DB user");
    return <Navigate to="/" replace />;
  }

  if (dbUser.role !== "admin") {
    console.log("❌ Redirecting: Role =", dbUser.role);
    return <Navigate to="/" replace />;
  }

  console.log("✅ Admin Access Granted");

  return children;
};

export default AdminRoute;
