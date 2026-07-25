import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import { auth } from "../firebase/firebase.config";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";
  // const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);

      const firebaseUser = result.user;

      await axiosSecure.patch(`/api/users/login/${firebaseUser.email}`);

      toast.success("Login Successful!");

      navigate(from, { replace: true });
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
          toast.error(error.message);
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

      await axiosSecure.post("/api/users", {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        phone: firebaseUser.phoneNumber || "Not Provided",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });

      await axiosSecure.patch(`/api/users/login/${firebaseUser.email}`);

      toast.success("Logged in with Google!");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <button type="button" href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
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
