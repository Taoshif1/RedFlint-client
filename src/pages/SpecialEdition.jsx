import Product from "../components/shared/Product";
import useSpecialProducts from "../hooks/useSpecialProducts";

const SpecialEdition = () => {
  const { products, loading } = useSpecialProducts();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          No Special Edition Products Found
        </h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Special Edition Collection
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialEdition;