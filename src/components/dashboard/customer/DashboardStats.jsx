const stats = [
  {
    title: "Orders",
    value: 12,
    color: "text-primary",
  },
  {
    title: "Wishlist",
    value: 5,
    color: "text-warning",
  },
  {
    title: "Reviews",
    value: 4,
    color: "text-info",
  },
  {
    title: "Reward Points",
    value: 260,
    color: "text-success",
  },
];

const DashboardStats = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-5 red-hat">Dashboard Overview</h2>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="card-body">
              <p className="text-base-content/60 uppercase tracking-widest text-xs">
                {stat.title}
              </p>

              <h3 className={`text-5xl font-black mt-2 ${stat.color}`}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
