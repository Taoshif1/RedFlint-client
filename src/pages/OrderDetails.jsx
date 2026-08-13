import { Link, useParams } from "react-router";
import useOrder from "../hooks/useOrder";

const badgeColor = (status) => {
  switch (status) {
    case "Delivered":
    case "Verified":
      return "badge-success";
    case "Processing":
      return "badge-info";
    case "Shipped":
      return "badge-secondary";
    case "Pending":
    case "Due":
      return "badge-warning";
    case "Cancelled":
      return "badge-error";
    default:
      return "badge-neutral";
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const { order, loading } = useOrder(id);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Order Not Found</h2>
        <Link to="/dashboard/recent-orders" className="btn btn-primary mt-5">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-5 sm:space-y-8">
      <div className="rounded-box border border-base-300 bg-base-200 p-4 shadow sm:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <p className="text-primary text-sm uppercase tracking-wider font-semibold">
              {order.orderNumber || "Order"}
            </p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Order Details</h1>
            <p className="opacity-70 mt-2">
              Placed {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start lg:items-end">
            <span className={`badge ${badgeColor(order.orderStatus)} badge-lg`}>
              {order.orderStatus || "Pending"}
            </span>
            <span className={`badge ${badgeColor(order.payment?.status)} badge-lg`}>
              Payment: {order.payment?.status || "Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-base-200 rounded-box shadow border border-base-300">
            <div className="border-b border-base-300 p-4 sm:p-6">
              <h2 className="text-xl font-bold sm:text-2xl">Ordered Products</h2>
            </div>

            <div className="divide-y divide-base-300">
              {order.products?.map((product, index) => (
                <div key={`${product.productId}-${product.size}-${index}`} className="flex min-w-0 gap-3 p-4 sm:gap-5 sm:p-6">
                  <img src={product.image} alt={product.title} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-28 sm:w-28" />

                  <div className="min-w-0 flex-1">
                    <Link to={`/products/${product.productId}`} className="line-clamp-2 text-base font-semibold hover:text-primary sm:text-xl">
                      {product.title}
                    </Link>
                    {product.size && <p>Size: {product.size}</p>}
                    <p>Quantity: {product.quantity}</p>
                    <p className="text-primary font-bold mt-2">
                      ৳{Number(product.lineTotal ?? product.unitPrice ?? product.price ?? 0).toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-box space-y-5 border border-base-300 bg-base-200 p-4 shadow sm:p-6">
            <h2 className="text-2xl font-bold">Shipping</h2>

            <div>
              <p className="font-semibold">{order.customerName}</p>
              <p>{order.phone}</p>
              <p>{order.address}</p>
              {(order.city || order.postalCode) && (
                <p>{[order.city, order.postalCode].filter(Boolean).join(", ")}</p>
              )}
            </div>

            <div className="divider" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{Number(order.subtotal || 0).toLocaleString("en-BD")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳{Number(order.shipping || 0).toLocaleString("en-BD")}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">৳{Number(order.total || 0).toLocaleString("en-BD")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
