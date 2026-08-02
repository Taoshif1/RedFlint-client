import BluePlaid from "../../../assets/Blue_Plaid.png";
import StoneGray from "../../../assets/Stone_Gray.png";
import DesertSand from "../../../assets/Desert_Sand.png";

const products = [
  {
    id: 1,
    name: "Blue Plaid Shirt",
    price: "$89.99",
    sold: 124,
    stock: 32,
    image: BluePlaid,
  },
  {
    id: 2,
    name: "Stone Gray Shirt",
    price: "$74.99",
    sold: 98,
    stock: 18,
    image: StoneGray,
  },
  {
    id: 3,
    name: "Desert Sand Shirt",
    price: "$84.99",
    sold: 86,
    stock: 12,
    image: DesertSand,
  },
];

const TopProducts = () => {
  return (
    <section className="mt-8 bg-[#181818] rounded-2xl border border-zinc-800 shadow-md">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Top Selling Products
        </h2>

        <button className="btn btn-sm btn-outline btn-error">
          View All
        </button>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#242424] border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500 transition-all duration-300"
          >
            <figure className="h-60 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </figure>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                {product.name}
              </h3>

              <p className="text-red-500 font-semibold mt-2">
                {product.price}
              </p>

              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>
                  Sold: <span className="text-white">{product.sold}</span>
                </span>

                <span>
                  Stock: <span className="text-green-400">{product.stock}</span>
                </span>
              </div>

              <button className="btn btn-error btn-sm w-full mt-5">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProducts;