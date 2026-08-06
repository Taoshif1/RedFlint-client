import { Link } from "react-router";

const shirts = [
  {
    image: "https://i.ibb.co.com/rGTKGQGs/Blue-Plaid-1.webp",
    name: "Blue Plaid Shirt",
  },
  {
    image: "https://i.ibb.co.com/szmC5Xn/Indigo-Blue-1.webp",
    name: "Indigo Blue Shirt",
  },
  {
    image: "https://i.ibb.co.com/r2y0F1H3/Mint-pattern-2.webp",
    name: "Mint Pattern Shirt",
  },
  {
    image: "https://i.ibb.co.com/5XpJvgzX/Desert-Sand-1.webp",
    name: "Desert Sand Shirt",
  },
  {
    image: "https://i.ibb.co.com/B2W22cs8/Stone-gray-1.webp",
    name: "Stone Gray Shirt",
  },
];

const FashionBanner = () => {
  return (
    <section className="bg-base-100 border-b border-base-300 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge badge-primary badge-outline mb-4">
            A Fashion Statement
          </div>

          <h1 className="red-hat text-4xl md:text-6xl lg:text-7xl italic">
            Crafted For Modern Gentlemen
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-base-content/70 text-lg">
            Precision tailoring, premium fabrics, timeless silhouettes.
            Discover the newest REDFLINT collection designed for men who value
            confidence, elegance and craftsmanship.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/products" className="btn btn-primary">
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Product Images */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 items-center">
          {shirts.map((shirt, index) => (
            <div
              key={shirt.name}
              className={`
                overflow-hidden rounded-box group
                ${
                  index === 2
                    ? "lg:scale-110 border-2 border-primary shadow-2xl shadow-primary/30"
                    : ""
                }
              `}
            >
              <img
                src={shirt.image}
                alt={shirt.name}
                className={`
                  w-full object-cover transition duration-500
                  group-hover:scale-110
                  ${index === 2 ? "h-[450px]" : "h-[380px]"}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionBanner;