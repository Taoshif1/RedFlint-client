import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

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
    </div>
  );
};

export default ProductDetails;
