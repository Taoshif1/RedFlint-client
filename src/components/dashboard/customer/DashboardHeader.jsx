import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const DashboardHeader = () => {
  const { logOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Recently";

  const avatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Customer",
    )}&background=e50000&color=ffffff`;

  return (
    <div className="bg-base-200 rounded-box p-8 shadow-md border border-base-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
              <img src={avatar} alt={user?.name || "User"} />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.25em] text-base-content/60">
              Member Since {memberSince}
            </p>

            <h1 className="text-4xl font-black red-hat mt-2">
              {user?.name || "Customer"}
            </h1>

            <p className="mt-2 text-base-content/70">{user?.email}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => toast("Coming Soon")}
            // onClick={() => navigate("/dashboard/profile")}
            className="btn btn-outline btn-primary"
          >
            Edit Profile
          </button>

          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
