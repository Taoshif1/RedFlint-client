import useUser from "../../../hooks/useUser";

const WelcomeCard = () => {
  const { user } = useUser();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="card bg-base-200 border border-base-300 shadow">
      <div className="card-body">
        <p className="text-sm text-base-content/60">{today}</p>

        <h2 className="text-3xl font-bold mt-2">Welcome back,</h2>

        <h1 className="text-4xl font-black text-primary">{user?.name}</h1>

        <p className="text-base-content/70">
          Manage your store, orders and customers from one place.
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
