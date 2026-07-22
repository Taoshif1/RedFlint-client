import Product from "../components/shared/Product";
import ProductList from "../components/ProductList";

const Products = () => {
  
  return (
    <div className="max-w-4xl mx-auto px-0.5 py-0.5">
      <div className="mb-6">
        <p className="text-sm text-base-content/60">
          Home
          <span className="mx-2">/</span>
          <span className="font-medium text-base-content">Products</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {ProductList.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};
export default Products;