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
    <section className="overflow-hidden border-b border-base-300 bg-base-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-9 text-center sm:mb-14">
          <div className="badge badge-primary badge-outline mb-4">
            A Fashion Statement
          </div>

          <h1 className="red-hat text-3xl italic leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
            Crafted For Modern Gentlemen
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-base-content/70 sm:mt-6 sm:text-lg sm:leading-7">
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
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:items-center lg:gap-5 lg:overflow-visible lg:pb-0">
          {shirts.map((shirt, index) => (
            <div
              key={shirt.name}
              className={`
                group min-w-[74%] snap-center overflow-hidden rounded-box sm:min-w-[44%] lg:min-w-0
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
                loading="lazy"
                decoding="async"
                width="640"
                height="800"
                className={`
                  w-full object-cover transition duration-500
                  group-hover:scale-110
                  ${
                    index === 2
                      ? "h-[21rem] sm:h-96 lg:h-[450px]"
                      : "h-[21rem] sm:h-96 lg:h-[380px]"
                  }
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
