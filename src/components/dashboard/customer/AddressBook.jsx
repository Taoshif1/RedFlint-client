const addresses = [
  {
    id: 1,
    title: "Home",
    address: "House #12, Road #5, Dhanmondi, Dhaka 1209, Bangladesh",
  },
  {
    id: 2,
    title: "Office",
    address: "East West University, Aftabnagar, Dhaka, Bangladesh",
  },
];

const AddressBook = () => {
  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="flex justify-between items-center p-6 border-b border-base-300">
        <h2 className="text-2xl font-bold red-hat">Address Book</h2>

        <button className="btn btn-sm btn-primary">Add Address</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="card bg-base-100 border border-base-300"
          >
            <div className="card-body">
              <h3 className="card-title">{address.title}</h3>

              <p className="text-base-content/70">{address.address}</p>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline btn-primary btn-sm">
                  Edit
                </button>

                <button className="btn btn-outline btn-error btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressBook;
