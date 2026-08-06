import { FaUsers, FaUserShield, FaUser, FaBan } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useUsers from "../../../hooks/useUsers";
import useUser from "../../../hooks/useUser";

const Customers = () => {
  const { users, loading, refetch } = useUsers();
  const { user: currentUser } = useUser();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalUsers = users.length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalCustomers = users.filter(
    (user) => user.role === "customer",
  ).length;

  const blockedUsers = users.filter((user) => user.isBlocked).length;

  const handleRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/admin/users/${id}/role`, {
        role,
      });

      toast.success("Role updated successfully.");

      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role.");
    }
  };

  const handleBlock = async (id, isBlocked) => {
    try {
      await axiosSecure.patch(`/admin/users/${id}/block`, {
        isBlocked,
      });

      toast.success(
        isBlocked
          ? "User blocked successfully."
          : "User unblocked successfully.",
      );

      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p>Total Users</p>
              <h2 className="text-3xl font-bold">{totalUsers}</h2>
            </div>

            <FaUsers className="text-4xl text-primary" />
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p>Admins</p>
              <h2 className="text-3xl font-bold">{totalAdmins}</h2>
            </div>

            <FaUserShield className="text-4xl text-info" />
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p>Customers</p>
              <h2 className="text-3xl font-bold">{totalCustomers}</h2>
            </div>

            <FaUser className="text-4xl text-success" />
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p>Blocked</p>
              <h2 className="text-3xl font-bold">{blockedUsers}</h2>
            </div>

            <FaBan className="text-4xl text-error" />
          </div>
        </div>
      </section>

      {/* Search */}

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full md:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Login</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    {/* Avatar + Name */}

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                              }
                              alt={user.name}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="font-bold">{user.name}</div>

                          <div className="text-sm opacity-60">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}

                    <td>{user.phone || "N/A"}</td>

                    {/* Role */}

                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "badge-primary"
                            : "badge-neutral"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={`badge ${
                          user.isBlocked ? "badge-error" : "badge-success"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Joined */}

                    <td>
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Last Login */}

                    <td>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    {/* Actions */}

                    <td>
                      <div className="flex justify-center gap-2">
                        <select
                          disabled={currentUser?.email === user.email}
                          className="select select-bordered select-xs"
                          value={user.role}
                          onChange={(e) => handleRole(user._id, e.target.value)}
                        >
                          <option value="customer">Customer</option>

                          <option value="admin">Admin</option>
                        </select>

                        <select
                          disabled={currentUser?.email === user.email}
                          className="select select-bordered select-xs"
                          value={String(user.isBlocked)}
                          onChange={(e) =>
                            handleBlock(user._id, e.target.value === "true")
                          }
                        >
                          <option value="false">Active</option>

                          <option value="true">Blocked</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
