import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSettings from "../../../hooks/useSettings";

const Settings = () => {
  const axiosSecure = useAxiosSecure();

  const { settings, loading, refetch } = useSettings();

  const [formData, setFormData] = useState({
    storeName: "",
    supportEmail: "",
    supportPhone: "",
    whatsappNumber: "",
    currency: "BDT",
    shippingFee: 0,
    freeShipping: 0,
    maintenanceMode: false,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        storeName: settings.storeName || "",
        supportEmail: settings.supportEmail || "",
        supportPhone: settings.supportPhone || "",
        whatsappNumber: settings.whatsappNumber || "",
        currency: settings.currency || "BDT",
        shippingFee: settings.shippingFee || 0,
        freeShipping: settings.freeShipping || 0,
        maintenanceMode: settings.maintenanceMode || false,
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch("/settings", {
        ...formData,
        shippingFee: Number(formData.shippingFee),
        freeShipping: Number(formData.freeShipping),
      });

      toast.success("Settings updated successfully.");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update settings.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold mb-8">Store Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Store */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Store Information</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Store Name"
                  required
                />

                <input
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Support Email"
                  required
                />

                <input
                  name="supportPhone"
                  value={formData.supportPhone}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Support Phone"
                />

                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="WhatsApp Number"
                />

                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option value="BDT">BDT</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* Shipping */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Shipping</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="number"
                  name="shippingFee"
                  value={formData.shippingFee}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Shipping Fee"
                />

                <input
                  type="number"
                  name="freeShipping"
                  value={formData.freeShipping}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Free Shipping Above"
                />
              </div>
            </div>

            {/* Maintenance */}

            <div>
              <h3 className="text-xl font-semibold mb-5">System</h3>

              <label className="label cursor-pointer justify-start gap-4">
                <span className="font-medium">Maintenance Mode</span>

                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </label>

              <div className="alert alert-warning py-3 px-4 mt-3">
                <div>
                  <h3 className="font-bold">Maintenance Mode</h3>

                  <p className="text-sm">
                    When enabled, customers should not be able to place new
                    orders while you perform store maintenance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary min-w-32"
              >
                {loading ? (
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
      </div>
    </section>
  );
};

export default Settings;
