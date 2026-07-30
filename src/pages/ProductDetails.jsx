import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import SizeGuide from "../components/product/SizeGuide";
import ProductDescription from "../components/product/ProductDescription";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Loading...</h2>
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

      {/* Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ProductGallery
          images={product.images}
          title={product.title}
        />

        <ProductInfo product={product} />
      </div>

      <SizeGuide />

      <ProductDescription
        description={product.description}
      />
    </div>
  );
};

export default ProductDetails;