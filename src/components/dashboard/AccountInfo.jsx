import useAuth from "../../hooks/useAuth";

const AccountInfo = () => {
  const { user } = useAuth();

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
            value={user?.displayName || ""}
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
            value={user?.email || ""}
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
            <span className="label-text">Authentication</span>
          </label>

          <input
            type="text"
            value={user?.providerData?.[0]?.providerId || "password"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
