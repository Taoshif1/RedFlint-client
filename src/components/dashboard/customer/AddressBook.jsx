import { useState } from "react";

import useAddresses from "../../../hooks/useAddresses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const emptyAddress = {
  label: "",
  receiver: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  isDefault: false,
};

const AddressBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { addresses, loading, refetch } = useAddresses();

  const [formData, setFormData] = useState(emptyAddress);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post(`/addresses/${user.email}`, formData);

      setFormData(emptyAddress);

      refetch();

      document.getElementById("add_address_modal").close();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/addresses/${user.email}/${id}`);

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Address Book</h2>

        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_address_modal").showModal()
          }
        >
          + Add Address
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {addresses.length === 0 && (
          <div className="alert">No Address Added Yet.</div>
        )}

        {addresses.map((address) => (
          <div
            key={address._id}
            className="card bg-base-200 shadow border border-base-300"
          >
            <div className="card-body">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{address.label}</h3>

                {address.isDefault && (
                  <div className="badge badge-primary">Default</div>
                )}
              </div>

              <p>{address.receiver}</p>

              <p>{address.phone}</p>

              <p>{address.address}</p>

              <p>
                {address.city}, {address.postalCode}
              </p>

              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDelete(address._id)}
                  className="btn btn-error btn-outline btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="add_address_modal" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="text-2xl font-bold mb-6">Add New Address</h3>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              className="input input-bordered"
              name="label"
              placeholder="Home / Office"
              value={formData.label}
              onChange={handleChange}
              required
            />

            <input
              className="input input-bordered"
              name="receiver"
              placeholder="Receiver Name"
              value={formData.receiver}
              onChange={handleChange}
              required
            />

            <input
              className="input input-bordered"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <textarea
              className="textarea textarea-bordered"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="input input-bordered"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                className="input input-bordered"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            <label className="label cursor-pointer">
              <span>Default Address</span>

              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
            </label>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("add_address_modal").close()
                }
              >
                Cancel
              </button>

              <button className="btn btn-primary" type="submit">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default AddressBook;
