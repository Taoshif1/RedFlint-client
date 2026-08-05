import { useState, useEffect } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Account = () => {
  const { user, loading, refetch } = useUser();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/users/${user.email}`, formData);

      await refetch();

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto bg-base-200 rounded-box shadow-lg border border-base-300">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={formData.photoURL}
            alt={formData.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-primary"
          />

          <h2 className="text-3xl font-bold mt-4">{formData.name}</h2>

          <p className="opacity-70">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Photo URL</label>

            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <button className="btn btn-primary w-full">Save Changes</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Account;
