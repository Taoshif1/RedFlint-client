import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$24,580",
    icon: <FaMoneyBillWave />,
    iconColor: "text-green-400",
    bgColor: "bg-green-500/10",
    trend: "+12.5%",
    description: "Compared to last month",
    trendColor: "text-green-400",
  },
  {
    id: 2,
    title: "Total Orders",
    value: "156",
    icon: <FaShoppingCart />,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    trend: "+18 Today",
    description: "New orders received",
    trendColor: "text-blue-400",
  },
  {
    id: 3,
    title: "Total Products",
    value: "48",
    icon: <FaBoxOpen />,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    trend: "+5 Added",
    description: "Products this week",
    trendColor: "text-yellow-400",
  },
  {
    id: 4,
    title: "Total Customers",
    value: "289",
    icon: <FaUsers />,
    iconColor: "text-red-400",
    bgColor: "bg-red-500/10",
    trend: "+14 New",
    description: "Customers joined",
    trendColor: "text-red-400",
  },
];

const DashboardStats = () => {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-[#181818] border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-red-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
          >
            <div className="flex items-start justify-between">

              {/* Left */}
              <div>
                <p className="text-gray-400 text-base font-medium">
                  {stat.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-4">
                  {stat.value}
                </h2>

                <p
                  className={`mt-5 text-base font-semibold ${stat.trendColor}`}
                >
                  {stat.trend}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {stat.description}
                </p>
              </div>

              {/* Right Icon */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${stat.bgColor} ${stat.iconColor}`}
              >
                {stat.icon}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;