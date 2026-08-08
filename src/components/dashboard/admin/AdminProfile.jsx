import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaUserShield } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const profile = {
        displayName: formData.name.trim(),
        photoURL: formData.photoURL.trim(),
      };

      // Update Firebase profile
      await updateUser(profile);

      // Update MongoDB profile
      await axiosSecure.patch("/admin/profile", {
        name: profile.displayName,
        photoURL: profile.photoURL,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Admin profile update error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto">
      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body">
          {/* Header */}

          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-xl bg-primary/10">
              <FaUserShield className="text-3xl text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Admin Profile</h1>

              <p className="text-base-content/60">
                Manage your administrator account information.
              </p>
            </div>
          </div>

          {/* Profile Preview */}

          <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl bg-base-100 border border-base-300 mb-8">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    formData.photoURL ||
                    "https://ui-avatars.com/api/?name=Admin"
                  }
                  alt={formData.name || "Admin"}
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">
                {formData.name || "Administrator"}
              </h2>

              <p className="text-base-content/60">{user?.email}</p>

              <div className="badge badge-primary mt-3 gap-2">
                <FaUserShield />
                Administrator
              </div>
            </div>
          </div>

          {/* Profile Form */}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-5">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                <label className="form-control">
                  <span className="label">
                    <span className="label-text font-medium">Display Name</span>
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Admin Name"
                    className="input input-bordered"
                    required
                  />
                </label>

                <label className="form-control">
                  <span className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </span>

                  <input
                    type="email"
                    value={user?.email || ""}
                    className="input input-bordered"
                    disabled
                  />
                </label>
              </div>
            </div>

            {/* Profile Image */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Profile Picture</h3>

              <label className="form-control">
                <span className="label">
                  <span className="label-text font-medium">Image URL</span>
                </span>

                <div className="relative">
                  <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    className="input input-bordered w-full pl-11"
                  />
                </div>
              </label>

              <p className="text-sm text-base-content/50 mt-2">
                Use a publicly accessible image URL for your profile picture.
              </p>
            </div>

            {/* Account Information */}

            <div>
              <h3 className="text-xl font-semibold mb-5">
                Account Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-base-100 border border-base-300 rounded-xl p-5">
                  <p className="text-sm text-base-content/50">Account Role</p>

                  <p className="font-semibold mt-1">Administrator</p>
                </div>

                <div className="bg-base-100 border border-base-300 rounded-xl p-5">
                  <p className="text-sm text-base-content/50">Authentication</p>

                  <p className="font-semibold mt-1">Firebase Authentication</p>
                </div>
              </div>
            </div>

            {/* Save */}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary min-w-40"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
