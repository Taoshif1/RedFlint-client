import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FaBoxOpen,
  FaStar,
  FaGem,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";

import useProducts from "../../../hooks/useProducts";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProducts = () => {
  const { products, loading, refetch } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const axiosSecure = useAxiosSecure();

  const totalProducts = products.length;

  const featuredProducts = products.filter(
    (product) => product.isFeatured,
  ).length;

  const specialProducts = products.filter(
    (product) => product.isSpecial,
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.totalStock <= 10,
  ).length;

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      data = data.filter((product) => product.category === category);
    }

    switch (sortBy) {
      case "Newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "Oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "Price ↑":
        data.sort((a, b) => a.offerPrice - b.offerPrice);
        break;

      case "Price ↓":
        data.sort((a, b) => b.offerPrice - a.offerPrice);
        break;

      case "Stock ↑":
        data.sort((a, b) => a.totalStock - b.totalStock);
        break;

      case "Stock ↓":
        data.sort((a, b) => b.totalStock - a.totalStock);
        break;

      default:
        break;
    }

    return data;
  }, [products, search, category, sortBy]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosSecure.delete(`/products/${id}`);

      if (data.deletedCount > 0) {
        toast.success("Product deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body flex-row justify-between items-center">
          <div>
            <p>Total Products</p>
            <h2 className="text-3xl font-bold">{totalProducts}</h2>
          </div>

          <FaBoxOpen className="text-4xl text-primary" />
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body flex-row justify-between items-center">
          <div>
            <p>Featured</p>
            <h2 className="text-3xl font-bold">{featuredProducts}</h2>
          </div>

          <FaStar className="text-4xl text-warning" />
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body flex-row justify-between items-center">
          <div>
            <p>Special Edition</p>
            <h2 className="text-3xl font-bold">{specialProducts}</h2>
          </div>

          <FaGem className="text-4xl text-secondary" />
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body flex-row justify-between items-center">
          <div>
            <p>Low Stock</p>
            <h2 className="text-3xl font-bold">{lowStockProducts}</h2>
          </div>

          <FaExclamationTriangle className="text-4xl text-error" />
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow xl:col-span-4 md:col-span-2">
        <div className="card-body flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search product..."
              className="input input-bordered"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Price ↑</option>
              <option>Price ↓</option>
              <option>Stock ↑</option>
              <option>Stock ↓</option>
            </select>
          </div>

          <Link to="/admin/products/add">
            <button className="btn btn-primary">
              <FaPlus />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow xl:col-span-4 md:col-span-2">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Special</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id}>
                      {/* Image */}

                      <td>
                        <div className="avatar">
                          <div className="w-14 rounded-lg">
                            <img
                              src={product.images?.[0]}
                              alt={product.title}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Product */}

                      <td>
                        <div>
                          <h2 className="font-semibold">{product.title}</h2>

                          <p className="text-sm opacity-60">{product.brand}</p>
                        </div>
                      </td>

                      {/* Category */}

                      <td>
                        <span className="badge badge-outline">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}

                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">
                            ৳{product.offerPrice}
                          </span>

                          <span className="text-xs line-through opacity-60">
                            ৳{product.price}
                          </span>
                        </div>
                      </td>

                      {/* Stock */}

                      <td>
                        <span
                          className={`badge ${
                            product.totalStock <= 5
                              ? "badge-error"
                              : product.totalStock <= 10
                                ? "badge-warning"
                                : "badge-success"
                          }`}
                        >
                          {product.totalStock}
                        </span>
                      </td>

                      {/* Featured */}

                      <td>
                        {product.isFeatured ? (
                          <span className="badge badge-primary">Featured</span>
                        ) : (
                          <span className="badge badge-outline">Normal</span>
                        )}
                      </td>

                      {/* Special */}

                      <td>
                        {product.isSpecial ? (
                          <span className="badge badge-secondary">Special</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/admin/products/${product._id}`}
                            className="btn btn-xs btn-info"
                          >
                            View
                          </Link>

                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="btn btn-xs btn-warning"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-xs btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
