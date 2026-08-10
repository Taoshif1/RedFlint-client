import { useEffect, useState } from "react";

import { Link, useParams } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import SizeGuide from "../components/product/SizeGuide";
import ProductDescription from "../components/product/ProductDescription";
import ProductReviews from "../components/product/ProductReviews";

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
  }, [axiosSecure, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="loading loading-spinner loading-lg" />

        <h2 className="text-xl font-semibold mt-4">Loading product...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}

      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/products">Products</Link>
          </li>

          <li>{product.title}</li>
        </ul>
      </div>

      {/* Product */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ProductGallery
          images={product.images}
          title={product.title}
          season={product.season}
          category={product.category}
          isFeatured={product.isFeatured}
          isSpecial={product.isSpecial}
        />

        <ProductInfo product={product} />
      </div>

      <ProductDescription description={product.description} />

      <SizeGuide />

      <ProductReviews productId={product._id} productTitle={product.title} />
    </div>
  );
};

export default ProductDetails;
