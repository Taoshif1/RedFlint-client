import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaEdit,
  FaExternalLinkAlt,
  FaTrash,
  FaBoxOpen,
  FaStar,
  FaGem,
  FaTag,
} from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useInventoryVersion from "../../../hooks/useInventoryVersion";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const inventoryVersion = useInventoryVersion();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/products/${id}`);

        setProduct(data);
        setSelectedImage(data.images?.[0] || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosSecure, inventoryVersion]);

  const handleDelete = async () => {
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
      await axiosSecure.delete(`/products/${id}`);

      toast.success("Product deleted successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <section className="max-w-5xl mx-auto">
        <div className="alert alert-error">
          <span>Product not found.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto space-y-6">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/products")}
            className="btn btn-ghost btn-sm mb-3"
          >
            <FaArrowLeft />
            Back to Products
          </button>

          <h1 className="text-3xl font-bold">Product Details</h1>

          <p className="text-base-content/60 mt-1">
            Manage and review this product.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to={`/products/${product._id}`} className="btn btn-outline">
            <FaExternalLinkAlt />
            View Store Page
          </Link>

          <Link
            to={`/admin/products/${product._id}/edit`}
            className="btn btn-warning"
          >
            <FaEdit />
            Edit Product
          </Link>

          <button onClick={handleDelete} className="btn btn-error">
            <FaTrash />
            Delete
          </button>
        </div>
      </div>

      {/* Main Product */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gallery */}

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="aspect-square rounded-xl overflow-hidden bg-base-100">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FaBoxOpen className="text-6xl opacity-20" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {product.images?.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === image
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Information */}

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge badge-outline">{product.category}</span>

              <span className="badge badge-outline">{product.season}</span>

              {product.isFeatured && (
                <span className="badge badge-primary">
                  <FaStar />
                  Featured
                </span>
              )}

              {product.isSpecial && (
                <span className="badge badge-secondary">
                  <FaGem />
                  Special Edition
                </span>
              )}
            </div>

            <h2 className="text-3xl font-bold">{product.title}</h2>

            <p className="text-base-content/60">{product.brand}</p>

            <div className="divider" />

            {/* Pricing */}

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ৳{product.offerPrice}
              </span>

              {product.price !== product.offerPrice && (
                <span className="line-through text-base-content/50">
                  ৳{product.price}
                </span>
              )}
            </div>

            {/* Description */}

            <div className="mt-5">
              <h3 className="font-semibold mb-2">Description</h3>

              <p className="leading-7 text-base-content/70">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">Total Stock</p>

                <p className="text-3xl font-bold">{product.totalStock}</p>
              </div>

              <FaBoxOpen className="text-3xl text-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">Regular Price</p>

                <p className="text-3xl font-bold">৳{product.price}</p>
              </div>

              <FaTag className="text-3xl text-warning" />
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">Offer Price</p>

                <p className="text-3xl font-bold text-primary">
                  ৳{product.offerPrice}
                </p>
              </div>

              <FaTag className="text-3xl text-success" />
            </div>
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">Images</p>

                <p className="text-3xl font-bold">
                  {product.images?.length || 0}
                </p>
              </div>

              <FaBoxOpen className="text-3xl opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Size Inventory */}

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Size Inventory</h2>

              <p className="text-sm opacity-60">
                Current stock availability by size.
              </p>
            </div>

            <FaBoxOpen className="text-2xl opacity-50" />
          </div>

          {!product.sizes?.length ? (
            <div className="alert">
              <span>No size inventory configured.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {product.sizes.map((item) => (
                <div
                  key={item.size}
                  className="border border-base-300 rounded-xl p-5 text-center bg-base-100"
                >
                  <p className="text-lg font-bold">{item.size}</p>

                  <p
                    className={`text-2xl font-bold mt-2 ${
                      item.stock <= 5
                        ? "text-error"
                        : item.stock <= 10
                          ? "text-warning"
                          : "text-success"
                    }`}
                  >
                    {item.stock}
                  </p>

                  <p className="text-xs opacity-60">pieces</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}

      <div className="card bg-base-200 border border-base-300 shadow">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Product Metadata</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <p className="text-sm opacity-60">Product ID</p>

              <p className="font-mono text-sm break-all">{product._id}</p>
            </div>

            <div>
              <p className="text-sm opacity-60">Brand</p>

              <p className="font-medium">{product.brand}</p>
            </div>

            <div>
              <p className="text-sm opacity-60">Category</p>

              <p className="font-medium">{product.category}</p>
            </div>

            <div>
              <p className="text-sm opacity-60">Season</p>

              <p className="font-medium">{product.season}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProductDetails;
