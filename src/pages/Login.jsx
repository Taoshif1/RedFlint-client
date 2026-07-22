import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { signIn, googleSignIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
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

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
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
