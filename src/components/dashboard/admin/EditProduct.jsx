import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [sizes, setSizes] = useState([]);

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [previewImages, setPreviewImages] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const [product, setProduct] = useState({
    title: "",
    description: "",
    brand: "RedFlint",
    category: "",
    season: "",
    price: "",
    offerPrice: "",
    stock: "",
    isFeatured: false,
    isSpecial: false,
  });

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/products/${id}`);

        setProduct({
          title: data.title || "",
          description: data.description || "",
          brand: data.brand || "RedFlint",
          category: data.category || "",
          season: data.season || "",
          price: data.price || "",
          offerPrice: data.offerPrice || "",
          stock: data.totalStock || "",
          isFeatured: data.isFeatured || false,
          isSpecial: data.isSpecial || false,
        });

        setSizes(data.sizes || []);

        setPreviewImages({
          image1: data.images?.[0] || "",
          image2: data.images?.[1] || "",
          image3: data.images?.[2] || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSize = (size) => {
    setSizes((prev) => {
      const exists = prev.find((item) => item.size === size);

      if (exists) {
        return prev.filter((item) => item.size !== size);
      }

      return [
        ...prev,
        {
          size,
          stock: 0,
        },
      ];
    });
  };

  const handleSizeStock = (size, stock) => {
    setSizes((prev) =>
      prev.map((item) =>
        item.size === size
          ? {
              ...item,
              stock: Number(stock),
            }
          : item,
      ),
    );
  };

  const handleImage = (e) => {
    const { name, files } = e.target;

    const file = files?.[0];

    if (!file) return;

    setImages((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreviewImages((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const uploadedImages = [];

      for (const key of ["image1", "image2", "image3"]) {
        if (images[key]) {
          const uploaded = await uploadImage(images[key]);

          uploadedImages.push(uploaded);
        } else {
          uploadedImages.push(previewImages[key]);
        }
      }

      const updatedProduct = {
        title: product.title,
        description: product.description,
        brand: product.brand,

        category: product.category,
        season: product.season,

        price: Number(product.price),
        offerPrice: Number(product.offerPrice),

        totalStock: Number(product.stock),

        sizes,

        images: uploadedImages,

        isFeatured: product.isFeatured,
        isSpecial: product.isSpecial,

        updatedAt: new Date(),
      };

      await axiosSecure.patch(`/products/${id}`, updatedProduct);

      toast.success("Product updated successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto">
      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Edit Product</h2>

              <p className="text-base-content/60 mt-1">
                Update product information, pricing, stock and images.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Product Information */}

            <div>
              <h3 className="text-xl font-semibold mb-5">
                Product Information
              </h3>

              <div className="grid lg:grid-cols-2 gap-5">
                <input
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Product Title"
                />

                <input
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Brand"
                />

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Category</option>
                  <option>Signature</option>
                  <option>Premium</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>

                <select
                  name="season"
                  value={product.season}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Season</option>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Autumn</option>
                  <option>All Season</option>
                </select>
              </div>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows={5}
                className="textarea textarea-bordered w-full mt-5"
                placeholder="Product Description..."
              />
            </div>

            {/* Pricing */}

            <div>
              <h3 className="text-xl font-semibold mb-5">
                Pricing & Inventory
              </h3>

              <div className="grid md:grid-cols-3 gap-5">
                <input
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                  placeholder="Regular Price"
                />

                <input
                  name="offerPrice"
                  type="number"
                  value={product.offerPrice}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                  placeholder="Offer Price"
                />

                <input
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                  placeholder="Total Stock"
                />
              </div>
            </div>

            {/* Sizes */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Sizes & Stock</h3>

              <div className="flex flex-wrap gap-3 mb-5">
                {["S", "M", "L", "XL", "XXL"].map((size) => {
                  const selected = sizes.some((item) => item.size === size);

                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleSize(size)}
                      className={`btn ${
                        selected ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sizes.map((item) => (
                  <div key={item.size}>
                    <label className="label">
                      <span>{item.size} Stock</span>
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) =>
                        handleSizeStock(item.size, e.target.value)
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Images</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {["image1", "image2", "image3"].map((imageName, index) => (
                  <div key={imageName}>
                    <label className="label">
                      <span>Image {index + 1}</span>
                    </label>

                    <div className="border border-base-300 rounded-xl p-3">
                      {previewImages[imageName] && (
                        <img
                          src={previewImages[imageName]}
                          alt={`Product ${index + 1}`}
                          className="w-full h-56 object-cover rounded-lg mb-3"
                        />
                      )}

                      <input
                        type="file"
                        name={imageName}
                        accept="image/*"
                        onChange={handleImage}
                        className="file-input file-input-bordered w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Flags */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Status</h3>

              <div className="flex flex-wrap gap-8">
                <label className="label cursor-pointer gap-3">
                  <span>Featured Product</span>

                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={product.isFeatured}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                </label>

                <label className="label cursor-pointer gap-3">
                  <span>Special Edition</span>

                  <input
                    type="checkbox"
                    name="isSpecial"
                    checked={product.isSpecial}
                    onChange={handleChange}
                    className="checkbox checkbox-secondary"
                  />
                </label>
              </div>
            </div>

            {/* Submit */}

            <div className="flex justify-end gap-3 border-t border-base-300 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="btn btn-outline"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary min-w-40"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
