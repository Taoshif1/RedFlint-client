import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import useAdminOrders from "../../../hooks/useAdminOrders";

const AdminStats = () => {
  const { orders } = useAdminOrders();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.total) || 0),
    0,
  );

  const pending = orders.filter(
    (order) => order.orderStatus === "Pending",
  ).length;

  const delivered = orders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaShoppingBag />,
      color: "text-primary",
    },
    {
      title: "Revenue",
      value: `৳${totalRevenue}`,
      icon: <FaMoneyBillWave />,
      color: "text-success",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "text-warning",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <FaCheckCircle />,
      color: "text-info",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="card bg-base-200 border border-base-300 shadow"
        >
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

export default AdminStats;
