import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, googleSignIn, resetPassword, syncSession } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const from = location.state?.from?.pathname;

  const redirectUser = async (userEmail) => {
    const res = await axiosSecure.get(`/users/${userEmail}`);

    if (res.data?.isBlocked) {
      toast.error("This account is blocked. Contact RedFlint support.");
      return;
    }

    if (res.data?.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }

    navigate(from || "/dashboard", { replace: true });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const password = form.password.value;

    try {
      const result = await signIn(email.trim(), password);
      const firebaseUser = result.user;

      await syncSession(firebaseUser);
      await axiosSecure.patch(`/users/login/${firebaseUser.email}`);

      toast.success("Login successful!");
      await redirectUser(firebaseUser.email);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
          break;
        case "auth/user-disabled":
          toast.error("This account has been disabled.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);

    try {
      const result = await googleSignIn();
      const firebaseUser = result.user;

      await syncSession(firebaseUser);

      await axiosSecure.post("/users", {
        name: firebaseUser.displayName || "",
        phone: firebaseUser.phoneNumber || "",
        photoURL: firebaseUser.photoURL || "",
      });

      await axiosSecure.patch(`/users/login/${firebaseUser.email}`);

      toast.success("Logged in with Google!");
      await redirectUser(firebaseUser.email);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      return toast.error("Enter your email address first.");
    }

    setResetting(true);

    try {
      await resetPassword(cleanEmail);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body">
          <h2 className="text-4xl text-center text-primary red-hat">
            Welcome Back
          </h2>

          <p className="text-center text-base-content/70">
            Sign in to your RedFlint account
          </p>

          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetting}
                className="text-sm text-primary hover:underline disabled:opacity-50"
              >
                {resetting ? "Sending reset email..." : "Forgot Password?"}
              </button>
            </div>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full flex items-center gap-2"
            disabled={loading}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center mt-5">
            Don't have an account?
            <Link to="/register" className="ml-2 text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
