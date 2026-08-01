import { useEffect, useState } from "react";
import { Link } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";
import Product from "../components/shared/Product";

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>Products</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
