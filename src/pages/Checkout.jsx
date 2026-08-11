import { useEffect, useMemo, useState } from "react";

import { Link, useLocation } from "react-router";

import toast from "react-hot-toast";

import useAxiosSecure from "../hooks/useAxiosSecure";

import useAuth from "../hooks/useAuth";

import useCart from "../hooks/useCart";

import { getGuestCart } from "../utils/guestCart";

// =====================================
// Payment Configuration
// =====================================

// IMPORTANT:
// Replace Nagad and Rocket numbers
// with the client's actual numbers.

const PAYMENT_METHODS = {
  bkash: {
    label: "bKash",
    number: "01975777949",
    description:
      "Pay the full order amount using bKash and enter the Transaction ID below.",
    requiresTransactionId: true,
  },

  nagad: {
    label: "Nagad",
    number: "01611110711",
    description:
      "Pay the full order amount using Nagad and enter the Transaction ID below.",
    requiresTransactionId: true,
  },

  cod: {
    label: "Cash on Delivery",
    number: null,
    description:
      "Pay the full order amount in cash when your order is delivered.",
    requiresTransactionId: false,
  },
};

const Checkout = () => {
  const axiosSecure = useAxiosSecure();

  const location = useLocation();

  const { user, loading: authLoading } = useAuth();

  const { refetch: refetchCart, clearCart } = useCart();

  const buyNowItem = location.state?.buyNowItem || null;

  const [items, setItems] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);

  const [placingOrder, setPlacingOrder] = useState(false);

  const [placedOrderId, setPlacedOrderId] = useState("");

  // =====================================
  // Customer Information
  // =====================================

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] = useState("");

  // =====================================
  // Payment
  // =====================================

  const [paymentMethod, setPaymentMethod] = useState("bkash");

  const [transactionId, setTransactionId] = useState("");

  // =====================================
  // Store Settings
  // =====================================

  const [settings, setSettings] = useState({
    shippingFee: 120,

    freeShipping: 3000,
  });

  // =====================================
  // Load Settings
  // =====================================

  useEffect(() => {
    axiosSecure
      .get("/settings")
      .then((res) => {
        setSettings(res.data);
      })
      .catch((error) => {
        console.error("Settings error:", error);
      });
  }, [axiosSecure]);

  // =====================================
  // Load Checkout Data
  // =====================================

  useEffect(() => {
    if (authLoading) return;

    const loadCheckout = async () => {
      setPageLoading(true);

      try {
        // =================================
        // Buy Now
        // =================================

        if (buyNowItem) {
          setItems([buyNowItem]);
        }

        // =================================
        // Registered Customer
        // =================================

        if (user?.email) {
          setEmail(user.email || "");

          setName(user.displayName || "");

          // Normal cart checkout
          if (!buyNowItem) {
            const cartRes = await axiosSecure.get("/cart");

            setItems(cartRes.data);
          }

          // Get MongoDB profile/address
          try {
            const userRes = await axiosSecure.get(`/users/${user.email}`);

            const userData = userRes.data;

            if (userData?.name) {
              setName(userData.name);
            }

            if (userData?.phone) {
              setPhone(userData.phone === "Not Provided" ? "" : userData.phone);
            }

            const defaultAddress =
              userData?.addresses?.find((item) => item.isDefault) ||
              userData?.addresses?.[0];

            if (defaultAddress) {
              setAddress(defaultAddress.address || "");

              setCity(defaultAddress.city || "");

              setPostalCode(defaultAddress.postalCode || "");

              if (defaultAddress.receiver) {
                setName(defaultAddress.receiver);
              }

              if (defaultAddress.phone) {
                setPhone(defaultAddress.phone);
              }
            }
          } catch (error) {
            console.error("Profile load error:", error);
          }
        }

        // =================================
        // Guest Customer
        // =================================

        if (!user) {
          if (!buyNowItem) {
            setItems(getGuestCart());
          }
        }
      } catch (error) {
        console.error("Checkout load error:", error);

        toast.error("Failed to load checkout");
      } finally {
        setPageLoading(false);
      }
    };

    loadCheckout();
  }, [user, authLoading, buyNowItem, axiosSecure]);

  // =====================================
  // Totals shown to customer
  // Backend recalculates these again.
  // =====================================

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.offerPrice ?? item.price ?? 0) *
            Number(item.quantity || 1),
        0,
      ),
    [items],
  );

  const shipping = useMemo(() => {
    if (subtotal <= 0) {
      return 0;
    }

    const freeShipping = Number(settings?.freeShipping ?? 3000);

    if (freeShipping > 0 && subtotal >= freeShipping) {
      return 0;
    }

    return Number(settings?.shippingFee ?? 120);
  }, [subtotal, settings]);

  const total = subtotal + shipping;

  const selectedPayment = PAYMENT_METHODS[paymentMethod];

  // =====================================
  // Place Order
  // =====================================

  const handlePlaceOrder = async () => {
    if (!name.trim()) {
      return toast.error("Please enter your name");
    }

    const cleanPhone = phone.replace(/\s+/g, "");

    if (!cleanPhone) {
      return toast.error("Please enter your phone number");
    }

    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      return toast.error("Enter a valid Bangladesh phone number");
    }

    if (!address.trim()) {
      return toast.error("Please enter your delivery address");
    }

    if (!city.trim()) {
      return toast.error("Please enter your city");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Enter a valid email address");
    }

    if (
  selectedPayment.requiresTransactionId &&
  !transactionId.trim()
) {
  return toast.error("Please enter the Transaction ID");
}

    if (!items.length) {
      return toast.error("No products selected");
    }

    setPlacingOrder(true);

    try {
      const commonData = {
        customerName: name.trim(),

        phone: cleanPhone,

        address: address.trim(),

        city: city.trim(),

        postalCode: postalCode.trim(),

        transactionId: selectedPayment.requiresTransactionId
  ? transactionId.trim()
  : "",
paymentMethod,
      };

      let res;

      // =================================
      // Registered Customer
      // =================================

      if (user) {
        const orderData = {
          ...commonData,
        };

        // Buy Now sends only the selected
        // product. Normal cart checkout
        // lets backend read MongoDB cart.
        if (buyNowItem) {
          orderData.products = items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          }));
        }

        res = await axiosSecure.post("/orders", orderData);

        if (!buyNowItem) {
          await refetchCart();
        }
      }

      // =================================
      // Guest Customer
      // =================================
      else {
        const orderData = {
          ...commonData,

          email: email.trim(),
          orderSource: buyNowItem ? "buy_now" : "cart",

          products: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
        };

        res = await axiosSecure.post("/orders/guest", orderData);

        // Normal guest-cart checkout
        // should clear localStorage.
        // Buy Now should leave their
        // existing cart untouched.
        if (!buyNowItem) {
          await clearCart();
        }
      }

      const orderReference =
        res.data?.orderNumber || res.data?.insertedId?.toString() || "";

      setPlacedOrderId(orderReference);

      setItems([]);

      toast.success("Order placed successfully");
    } catch (error) {
      console.error("Order error:", error);

      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  // =====================================
  // Loading
  // =====================================

  if (authLoading || pageLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // =====================================
  // Successful Guest/User Order
  // =====================================

  if (placedOrderId) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body text-center items-center">
            <div className="text-6xl">✓</div>

            <h1 className="text-3xl font-bold">Order Confirmed</h1>

            <p className="text-base-content/70">
              Your order has been submitted successfully.
            </p>

            <div className="bg-base-200 rounded-xl p-4 w-full mt-3">
              <p className="text-sm text-base-content/60">Order Number</p>

              <p className="font-mono break-all font-semibold">
                {placedOrderId}
              </p>
            </div>

            <p className="text-sm text-base-content/60">
              Payment verification is pending. RedFlint can confirm the order
              after checking your transaction.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link
                to="/track-order"
                state={{
                  orderNumber: placedOrderId,
                  phone,
                }}
                className="btn btn-outline"
              >
                Track Order
              </Link>

              {user && (
                <Link to="/dashboard/recent-orders" className="btn btn-outline">
                  My Orders
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // Empty Checkout
  // =====================================

  if (!items.length) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Nothing to checkout</h1>

        <p className="text-base-content/60 mb-6">Your cart is empty.</p>

        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Checkout</h1>

        {!user && (
          <p className="text-base-content/60 mt-2">
            Checking out as guest. No account is required.
          </p>
        )}

        {buyNowItem && <div className="badge badge-primary mt-3">Buy Now</div>}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* ================================= */}
        {/* LEFT */}
        {/* ================================= */}

        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}

          <div className="card bg-base-100 shadow border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Customer Information</h2>

              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <label className="form-control">
                  <span className="label-text mb-2">Full Name *</span>

                  <input
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <span className="label-text mb-2">Phone Number *</span>

                  <input
                    className="input input-bordered w-full"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="form-control md:col-span-2">
                  <span className="label-text mb-2">
                    Email {!user && "(Optional)"}
                  </span>

                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="example@email.com"
                    value={email}
                    disabled={!!user}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Delivery */}

          <div className="card bg-base-100 shadow border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Delivery Address</h2>

              <div className="space-y-4 mt-3">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="House, road, area, landmark"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="input input-bordered w-full"
                    placeholder="City *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <input
                    className="input input-bordered w-full"
                    placeholder="Postal Code (Optional)"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* Payment */}
          {/* ================================= */}

          <div className="card bg-base-100 shadow border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Payment Method</h2>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setPaymentMethod(key);

                      setTransactionId("");
                    }}
                    className={`btn ${
                      paymentMethod === key
                        ? "btn-primary text-white"
                        : "btn-outline"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              <div className="bg-base-200 rounded-xl p-5 mt-5">
                <p className="text-sm text-base-content/60">Pay with</p>

                <h3 className="text-xl font-bold mt-1">
                  {selectedPayment.label}
                </h3>

                {selectedPayment.number && (
  <>
    <p className="mt-4 text-sm">
      Payment Number
    </p>

    <p className="text-2xl font-black text-primary tracking-wide mt-1">
      {selectedPayment.number}
    </p>
  </>
)}

                <p className="text-sm text-base-content/70 mt-4">
                  {selectedPayment.description}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-base-100">
                  <p className="text-sm">Amount to pay</p>

                  <p className="text-2xl font-bold">
                    ৳{total.toLocaleString("en-BD")}
                  </p>
                </div>
              </div>

              {selectedPayment.requiresTransactionId && (
  <label className="form-control mt-5">
    <span className="label-text mb-2">
      {selectedPayment.label} Transaction ID *
    </span>

    <input
      className="input input-bordered w-full"
      placeholder="Enter Transaction ID"
      value={transactionId}
      onChange={(e) =>
        setTransactionId(e.target.value)
      }
    />
  </label>
)}

              <div className="alert mt-4 bg-base-200 border-none">
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Select your payment method.</li>

                  <li>Pay the full amount shown above.</li>

                  <li>Copy the transaction ID.</li>

                  <li>Enter the transaction ID above.</li>

                  <li>Submit your order.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================= */}

        <div className="card bg-base-100 shadow border border-base-300 lg:sticky lg:top-6">
          <div className="card-body">
            <h2 className="card-title border-b border-base-300 pb-3">
              Order Summary
            </h2>

            <div className="max-h-72 overflow-y-auto divide-y divide-base-300">
              {items.map((item) => {
                const price = Number(item.offerPrice ?? item.price ?? 0);

                return (
                  <div
                    key={item._id || `${item.productId}-${item.size}`}
                    className="flex gap-3 py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold line-clamp-1">{item.title}</p>

                      <p className="text-xs text-base-content/60 mt-1">
                        {item.size && `Size: ${item.size} • `}
                        Qty: {item.quantity}
                      </p>

                      <p className="font-semibold mt-1">
                        ৳
                        {(price * Number(item.quantity)).toLocaleString(
                          "en-BD",
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-4 border-t border-base-300">
              <div className="flex justify-between">
                <span className="text-base-content/60">Subtotal</span>

                <span>৳{subtotal.toLocaleString("en-BD")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-base-content/60">Shipping</span>

                <span>
                  {shipping === 0
                    ? "Free"
                    : `৳${shipping.toLocaleString("en-BD")}`}
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold pt-3 border-t border-base-300">
                <span>Total</span>

                <span className="text-primary">
                  ৳{total.toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || !items.length}
              className="btn btn-primary w-full mt-5 text-white"
            >
              {placingOrder ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Placing Order...
                </>
              ) : (
                `Place Order • ৳${total.toLocaleString("en-BD")}`
              )}
            </button>

            {!user && (
              <p className="text-xs text-center text-base-content/50">
                No account required.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
