import { useParams } from "react-router";

import ProductList from "../components/ProductList";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import SizeGuide from "../components/product/SizeGuide";
import ProductDescription from "../components/product/ProductDescription";

const ProductDetails = () => {
  const { id } = useParams();

  const product = ProductList.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <p className="mt-2 text-base-content/70">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-base-content/60">
        Home
        <span className="mx-2">/</span>
        Products
        <span className="mx-2">/</span>
        <span className="font-medium text-base-content">
          {product.title}
        </span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ProductGallery
          images={product.images}
          title={product.title}
        />

        <ProductInfo product={product} />
      </div>

      {/* Size Guide */}
      <SizeGuide />

      {/* Product Description */}
      <ProductDescription
        description={product.description}
      />
    </div>
  );
};

export default ProductDetails;