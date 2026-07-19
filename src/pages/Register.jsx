import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { createUser, updateUser, googleSignIn } = useAuth();

  const [loading, setLoading] = useState(false);

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
      await createUser(email, password);

      await updateUser({
        displayName: name,
        photoURL:
          "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(name) +
          "&background=e50000&color=fff",
      });

      console.log({ name, phone, email });

      toast.success("Registration Successful!");
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

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <input
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              required
            />

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
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