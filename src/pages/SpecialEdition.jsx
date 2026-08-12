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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:text-4xl">
        Special Edition Collection
      </h1>

      <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
