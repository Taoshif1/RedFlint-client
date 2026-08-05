import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Checkout = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure.get("/cart").then((res) => {
        console.log("Cart API: ", res.data)
      setCart(res.data);
    });
  }, [axiosSecure]);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.offerPrice ?? item.price ?? 0) * Number(item.quantity),
    0,
  );

  const shipping = subtotal > 0 ? 120 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address || !transactionId) {
      return toast.error("Please complete all fields");
    }

    setLoading(true);

    try {
      await axiosSecure.post("/payments", {
        customerName: name,
        phone,
        address,
        transactionId,
        subtotal,
        shipping,
        total,
        products: cart,
      });

      // Clear the cart on successful order creation
      await axiosSecure.delete("/cart");

      toast.success("Order placed successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* LEFT SIDE: 2 Columns Wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Customer Information Card */}
          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <h2 className="card-title mb-4">Customer Information</h2>
              <div className="space-y-4">
                <input
                  className="input input-bordered w-full"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Delivery Address"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Details Card */}
          <div className="card bg-base-100 shadow border">
            <div className="card-body">
              <h2 className="card-title mb-4">Payment Method (bKash)</h2>
              <div className="text-center space-y-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy6ZqvuL9Uzt9JX4X3UaYr-eOJGVjOg-eEmJsGA37Ib_SWBTHkcBYv981G&s=10"
                  className="w-48 rounded-xl mx-auto"
                  alt="bKash QR"
                />
                <div>
                  <p className="font-bold text-gray-500 text-sm">
                    Merchant Number
                  </p>
                  <p className="text-primary text-2xl font-black tracking-wider">
                    01975777949
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <input
                  className="input input-bordered w-full"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>

              <div className="alert mt-4 bg-base-200 border-none">
                <ul className="space-y-1 text-sm list-decimal list-inside">
                  <li>Scan the QR code above or dial *247#</li>
                  <li>Send the full payment amount</li>
                  <li>Copy your Transaction ID (TrxID)</li>
                  <li>Paste the ID into the input field above</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: 1 Column Wide (Order Summary Card) */}
        <div className="card bg-base-100 shadow border sticky top-6">
          <div className="card-body">
            <h2 className="card-title border-b pb-3 mb-4">Order Summary</h2>

            {/* Cart Items List */}
            <div className="max-h-60 overflow-y-auto divide-y mb-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between py-3 text-sm"
                >
                  <span className="font-medium text-base-content/80">
                    {item.title}{" "}
                    <span className="text-xs font-bold text-primary">
                      × {item.quantity}
                    </span>
                  </span>
                  <span className="font-semibold">
                    ৳
                    {Number(item.offerPrice ?? item.price ?? 0) *
                      Number(item.quantity)}
                  </span>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-center text-gray-400 py-4">
                  Your cart is empty
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-2 text-sm border-t">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold">৳{shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-base-content">
                <span>Total</span>
                <span className="text-primary">৳{total}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="btn btn-primary w-full mt-6 text-white font-bold"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
