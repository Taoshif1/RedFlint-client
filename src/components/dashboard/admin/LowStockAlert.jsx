import BluePlaid from "../../../assets/Blue_Plaid.png";
import StoneGray from "../../../assets/Stone_Gray.png";
import DesertSand from "../../../assets/Desert_Sand.png";

const lowStock = [
  {
    id: 1,
    name: "Blue Plaid Shirt",
    stock: 3,
    image: BluePlaid,
  },
  {
    id: 2,
    name: "Stone Gray Shirt",
    stock: 5,
    image: StoneGray,
  },
  {
    id: 3,
    name: "Desert Sand Shirt",
    stock: 2,
    image: DesertSand,
  },
];

const LowStockAlert = () => {
  return (
    <section className="mt-8 bg-[#181818] rounded-2xl border border-zinc-800 shadow-md">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Low Stock Alert
        </h2>

        <button className="btn btn-sm btn-outline btn-error">
          Manage Inventory
        </button>
      </div>

      <div className="divide-y divide-zinc-800">
        {lowStock.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-5 hover:bg-[#202020] transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-white">
                  {product.name}
                </h3>

                <p className="text-sm text-red-400">
                  Only {product.stock} left
                </p>
              </div>
            </div>

            <button className="btn btn-sm btn-error">
              Restock
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LowStockAlert;