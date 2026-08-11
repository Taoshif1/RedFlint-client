import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";

import useOrders from "../../../hooks/useOrders";
import useWishlist from "../../../hooks/useWishlist";
import useCart from "../../../hooks/useCart";

const DashboardStats = () => {
  const { orders } = useOrders();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const activeOrders = orders.filter((order) => order.orderStatus !== "Cancelled");

  const totalSpent = activeOrders.reduce(
    (sum, order) => sum + (Number(order.total) || 0),
    0,
  );

  const totalCartItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const stats = [
    {
      title: "Orders",
      value: orders.length,
      icon: <FaShoppingBag />,
      color: "text-primary",
    },
    {
      title: "Wishlist",
      value: wishlist.length,
      icon: <FaHeart />,
      color: "text-error",
    },
    {
      title: "Cart Items",
      value: totalCartItems,
      icon: <FaShoppingCart />,
      color: "text-info",
    },
    {
      title: "Order Value",
      value: `৳${totalSpent.toLocaleString("en-BD")}`,
      icon: <FaMoneyBillWave />,
      color: "text-success",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="card bg-base-200 border border-base-300 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base-content/70">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
              </div>
              <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
