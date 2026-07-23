import BluePlaid from "../../assets/Blue_Plaid.png";
import StoneGray from "../../assets/Stone_Gray.png";
import DesertSand from "../../assets/Desert_Sand.png";

const wishlist = [
  {
    id: 1,
    name: "Blue Plaid Shirt",
    price: "$89.99",
    image: BluePlaid,
  },
  {
    id: 2,
    name: "Stone Gray Shirt",
    price: "$74.99",
    image: StoneGray,
  },
  {
    id: 3,
    name: "Desert Sand Shirt",
    price: "$84.99",
    image: DesertSand,
  },
];

const Wishlist = () => {
  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="p-6 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-2xl font-bold red-hat">Wishlist</h2>

        <button className="btn btn-sm btn-outline btn-primary">View All</button>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300"
          >
            <figure className="h-60 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>

              <p className="text-primary font-bold">{item.price}</p>

              <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary btn-sm">Add to Cart</button>

                <button className="btn btn-outline btn-error btn-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
