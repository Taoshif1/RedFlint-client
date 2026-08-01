import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const AccountInfo = () => {
  const { user: firebaseUser } = useAuth();

  const { user } = useUser();

  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="p-6 border-b border-base-300">
        <h2 className="text-2xl font-bold red-hat">Account Information</h2>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>

          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input
            type="email"
            value={user?.email || "N/A"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email Verified</span>
          </label>

          <input
            type="text"
            value={user?.emailVerified ? "Verified" : "Not Verified"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>

          <input
            type="text"
            value={user?.phone || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Authentication</span>
          </label>

          <input
            type="text"
            value={firebaseUser?.providerData?.[0]?.providerId || "password"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Role</span>
          </label>

          <input
            type="text"
            value={user?.role || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
