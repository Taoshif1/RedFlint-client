import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Account = () => {
  const { user, loading, refetch } = useUser();
  const { updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone === "Not Provided" ? "" : user.phone || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.email) return;

    setSaving(true);

    try {
      await axiosSecure.patch(`/users/${user.email}`, formData);

      await updateUser({
        displayName: formData.name.trim(),
        photoURL: formData.photoURL.trim() || null,
      });

      await refetch();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto bg-base-200 rounded-box shadow-lg border border-base-300">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          {formData.photoURL ? (
            <img src={formData.photoURL} alt={formData.name} className="w-28 h-28 rounded-full object-cover border-4 border-primary" />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-primary bg-base-300 flex items-center justify-center text-4xl font-bold">
              {(formData.name || user?.email || "R").charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="text-3xl font-bold mt-4">{formData.name}</h2>
          <p className="opacity-70">{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="label">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input input-bordered w-full" placeholder="01XXXXXXXXX" />
          </div>

          <div className="md:col-span-2">
            <label className="label">Photo URL</label>
            <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} className="input input-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <button className="btn btn-primary w-full" disabled={saving}>
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Account;
