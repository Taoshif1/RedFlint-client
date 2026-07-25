import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import { auth } from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain one uppercase letter.");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain one lowercase letter.");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error("Password must contain one special character.");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);

      const firebaseUser = result.user;

      const photoURL =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(name) +
        "&background=e50000&color=fff";

      await updateUser({
        displayName: name,
        photoURL: photoURL,
      });

      // Save email/password user to DB
      await axiosSecure.post("/api/users", {
        uid: firebaseUser.uid,
        name,
        phone,
        email,
        photoURL,
      });

      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const firebaseUser = result.user;

      // Sync Google user profile data securely with backend database
      await axiosSecure.post("/api/users", {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        phone: firebaseUser.phoneNumber || "Not Provided",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });

      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-4xl text-center font-black text-primary red-hat">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4 mt-6">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            {/* Password Field */}
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative w-full">
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center mt-5">
            Already have an account?
            <Link to="/login" className="text-primary ml-2 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
