const shirts = [
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
  "https://images.unsplash.com/photo-1618886614638-80e3c103d31a",
  "https://images.unsplash.com/photo-1622445275576-721325763afe",
];

const FashionBanner = () => {
  return (
    <section className="bg-base-100 border-b border-base-300 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">

          <div className="badge badge-primary badge-outline mb-4">
            NEW ARRIVALS 2026
          </div>

          <h1 className="red-hat text-4xl md:text-6xl lg:text-7xl italic">
            Crafted For Modern Gentlemen
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-base-content/70 text-lg">
            Precision tailoring, premium fabrics, timeless silhouettes.
            Discover the newest REDFLINT collection designed for men
            who value confidence, elegance & craftsmanship.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="btn btn-primary">
              Shop Collection
            </button>

            <button className="btn btn-outline">
              Explore Lookbook
            </button>
          </div>

        </div>

        {/* Images */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 items-center">

          {shirts.map((shirt, index) => (
            <div
              key={index}
              className={`
                overflow-hidden rounded-box group
                ${index === 2
                  ? "lg:scale-110 border-2 border-primary shadow-2xl shadow-primary/30"
                  : ""
                }
              `}
            >
              <img
                src={`${shirt}?auto=format&fit=crop&w=800&q=80`}
                alt={`Premium Shirt ${index + 1}`}
                className={`
                  w-full object-cover transition duration-500
                  group-hover:scale-110
                  ${index === 2
                    ? "h-[450px]"
                    : "h-[380px]"
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