import { useState } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";

import { Check, Package, Search, Truck, XCircle } from "lucide-react";

import useAxiosSecure from "../hooks/useAxiosSecure";

const TRACKING_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();

  const location = useLocation();

  const [orderNumber, setOrderNumber] = useState(
    location.state?.orderNumber || "",
  );

  const [phone, setPhone] = useState(location.state?.phone || "");

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleTrack = async (event) => {
    event.preventDefault();

    if (!orderNumber.trim()) {
      return toast.error("Enter your order number");
    }

    if (!phone.trim()) {
      return toast.error("Enter your phone number");
    }

    setLoading(true);

    setOrder(null);

    try {
      const res = await axiosSecure.post("/orders/track", {
        orderNumber: orderNumber.trim(),

        phone: phone.trim(),
      });

      setOrder(res.data.order);
    } catch (error) {
      console.error("Track order error:", error);

      toast.error(error.response?.data?.message || "Order not found");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = order?.orderStatus || "Pending";

  const currentIndex = TRACKING_STEPS.indexOf(currentStatus);

  const cancelled = currentStatus === "Cancelled";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="max-w-xl mx-auto text-center mb-10">
        <Package size={45} className="mx-auto text-primary mb-4" />

        <h1 className="text-4xl font-bold">Track Your Order</h1>

        <p className="text-base-content/60 mt-3">
          Enter your order number and the phone number used during checkout.
        </p>
      </div>

      {/* Search */}

      <form
        onSubmit={handleTrack}
        className="card bg-base-100 border border-base-300 shadow-xl max-w-2xl mx-auto"
      >
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label-text mb-2">Order Number</span>

              <input
                className="input input-bordered w-full"
                placeholder="RF-20260810-A4C91F"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2">Phone Number</span>

              <input
                className="input input-bordered w-full"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary text-white mt-5"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Tracking...
              </>
            ) : (
              <>
                <Search size={18} />
                Track Order
              </>
            )}
          </button>
        </div>
      </form>

      {/* Result */}

      {order && (
        <div className="mt-10 space-y-6">
          {/* Header */}

          <div className="card bg-base-100 border border-base-300 shadow">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-base-content/60">Order Number</p>

                  <h2 className="font-mono text-xl font-bold">
                    {order.orderNumber}
                  </h2>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="badge badge-outline">
                    {order.customerType}
                  </span>

                  <span className="badge badge-outline">
                    {order.orderSource}
                  </span>

                  <span
                    className={`badge ${
                      cancelled ? "badge-error" : "badge-primary"
                    }`}
                  >
                    {currentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking */}

          <div className="card bg-base-100 border border-base-300 shadow">
            <div className="card-body">
              <h2 className="card-title">Delivery Progress</h2>

              {cancelled ? (
                <div className="alert alert-error mt-4">
                  <XCircle size={20} />

                  <span>This order has been cancelled.</span>
                </div>
              ) : (
                <div className="grid grid-cols-4 mt-8">
                  {TRACKING_STEPS.map((step, index) => {
                    const completed = index <= currentIndex;

                    return (
                      <div
                        key={step}
                        className="relative flex flex-col items-center text-center"
                      >
                        {index > 0 && (
                          <div
                            className={`absolute h-1 w-full right-1/2 top-5 ${
                              index <= currentIndex
                                ? "bg-primary"
                                : "bg-base-300"
                            }`}
                          />
                        )}

                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                            completed
                              ? "bg-primary text-white"
                              : "bg-base-300 text-base-content/50"
                          }`}
                        >
                          {completed ? (
                            <Check size={18} />
                          ) : step === "Shipped" ? (
                            <Truck size={18} />
                          ) : (
                            <Package size={18} />
                          )}
                        </div>

                        <span className="text-xs sm:text-sm mt-3 font-semibold">
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Products */}

          <div className="card bg-base-100 border border-base-300 shadow">
            <div className="card-body">
              <h2 className="card-title">Products</h2>

              <div className="divide-y divide-base-300">
                {order.products?.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${index}`}
                    className="py-4 flex gap-4 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="text-sm text-base-content/60 mt-1">
                        {item.size && `Size: ${item.size} • `}
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ৳{Number(item.lineTotal ?? 0).toLocaleString("en-BD")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment + Total */}

          <div className="card bg-base-100 border border-base-300 shadow">
            <div className="card-body">
              <div className="flex justify-between">
                <span>Payment Method</span>

                <span className="font-semibold capitalize">
                  {order.payment?.method || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>

                <span className="font-semibold">
                  {order.payment?.status || "Pending"}
                </span>
              </div>

              <div className="divider" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-primary">
                  ৳{Number(order.total || 0).toLocaleString("en-BD")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
