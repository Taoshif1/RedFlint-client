import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  ExternalLink,
  RefreshCw,
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useAdminOrders from "../../../hooks/useAdminOrders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
      };
    case "processing":
      return {
        badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" />,
      };
    case "pending":
      return {
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: <Clock className="w-3.5 h-3.5 mr-1" />,
      };
    case "cancelled":
      return {
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        icon: <XCircle className="w-3.5 h-3.5 mr-1" />,
      };
    default:
      return {
        badge: "bg-base-300 text-base-content border-base-content/10",
        icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />,
      };
  }
};

const getPaymentBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "verified":
    case "pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    default:
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
  }
};

const AdminOrders = () => {
  const { orders = [], loading, refetch } = useAdminOrders();
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const keyword = search.toLowerCase();
  const [updatingId, setUpdatingId] = useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      (order.customerName || "").toLowerCase().includes(keyword) ||
      (order.userEmail || "").toLowerCase().includes(keyword) ||
      String(order._id).toLowerCase().includes(keyword),
  );

  const handleStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axiosSecure.patch(`/admin/orders/${id}/status`, { status });
      toast.success("Order status updated");
      if (refetch) refetch();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePayment = async (id, status) => {
    try {
      await axiosSecure.patch(`/admin/orders/${id}/payment`, { status });
      toast.success("Payment status updated");
      if (refetch) refetch();
    } catch {
      toast.error("Failed to update payment");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm text-base-content/60 animate-pulse">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-base-200/50 rounded-2xl border border-base-300/60 backdrop-blur-sm overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center border-b border-base-300/60 bg-base-100/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide">
              Order Management
            </h2>
            <p className="text-xs text-base-content/60">
              Manage order details and dispatch statuses
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search customer, email..."
              className="input input-sm input-bordered w-full pl-9 bg-base-100/80 focus:border-primary/50 transition-all text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/admin/orders" className="w-full sm:w-auto">
            <button onClick={refetch} className="btn btn-primary btn-sm">
              Refresh
            </button>
          </Link>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-base-300/60 bg-base-200/80 text-xs font-semibold uppercase tracking-wider text-base-content/70">
              <th className="py-4 pl-6">Customer</th>
              <th>Email</th>
              <th>Order Status</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th className="pr-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300/40 text-xs">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-base-content/50"
                >
                  <div className="py-12 flex flex-col items-center gap-3">
                    <ShoppingBag className="w-10 h-10 opacity-30" />

                    <h3 className="font-semibold">No Orders Found</h3>

                    <p className="text-base-content/60">
                      Try changing the search keyword.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const statusMeta = getStatusBadge(order.orderStatus);
                const paymentBadgeClass = getPaymentBadge(
                  order.payment?.status,
                );

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-base-100/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="pl-6 font-semibold text-base-content">
                      {order.customerName || "N/A"}
                    </td>

                    {/* Email */}
                    <td className="text-base-content/70 font-mono">
                      {order.userEmail || "N/A"}
                    </td>

                    {/* Order Status Select */}
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusMeta.badge}`}
                        >
                          {statusMeta.icon}
                          {order.orderStatus || "Pending"}
                        </span>
                        <select
                          disabled={updatingId === order._id}
                          className="select select-bordered select-xs bg-base-100 text-[11px] focus:border-primary focus:outline-none"
                          value={order.orderStatus || "Pending"}
                          onChange={(e) =>
                            handleStatus(order._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="font-semibold text-primary font-mono">
                      ৳{order.total ?? 0}
                    </td>

                    {/* Payment Status Select */}
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${paymentBadgeClass}`}
                        >
                          {order.payment?.status || "Pending"}
                        </span>
                        <select
                          disabled={updatingId === order._id}
                          className="select select-bordered select-xs bg-base-100 text-[11px] focus:border-primary focus:outline-none"
                          value={order.payment?.status || "Pending"}
                          onChange={(e) =>
                            handlePayment(order._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Verified">Verified</option>
                        </select>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="text-base-content/60 font-mono">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )
                        : "N/A"}
                    </td>

                    {/* Action */}
                    <td className="pr-6 text-right">
                      <Link
                        to="/admin/orders"
                        className="btn btn-ghost btn-xs text-primary hover:bg-primary/10 gap-1 border border-primary/20"
                      >
                        Manage <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrders;
