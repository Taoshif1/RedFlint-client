import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";

const AddProduct = () => {
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  const [sizes, setSizes] = useState([]);

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const handleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((item) => item !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleImage = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = e.target;

      const uploadedImages = await Promise.all([
        uploadImage(images.image1),
        uploadImage(images.image2),
        uploadImage(images.image3),
      ]);

      const product = {
        title: form.title.value,
        description: form.description.value,
        brand: form.brand.value,

        category: form.category.value,
        season: form.season.value,

        price: Number(form.price.value),
        offerPrice: Number(form.offerPrice.value),

        totalStock: Number(form.stock.value),

        sizes,

        images: uploadedImages,

        isFeatured: form.featured.checked,
        isSpecial: form.special.checked,
      };

      await axiosSecure.post("/products", product);

      toast.success("Product added successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold mb-8">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Product Information */}

            <div>
              <h3 className="text-xl font-semibold mb-5">
                Product Information
              </h3>

              <div className="grid lg:grid-cols-2 gap-5">
                {/* Title */}

                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Product Title"
                  className="input input-bordered w-full"
                />

                {/* Brand */}

                <input
                  name="brand"
                  type="text"
                  required
                  placeholder="Brand"
                  defaultValue="RedFlint"
                  className="input input-bordered w-full"
                />

                {/* Category */}

                <select
                  name="category"
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Category</option>
                  <option>Signature</option>
                  <option>Premium</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>

                {/* Season */}

                <select
                  name="season"
                  required
                  className="select select-bordered"
                >
                  <option value="">Season</option>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Autumn</option>
                  <option>All Season</option>
                </select>
              </div>

              <textarea
                name="description"
                required
                rows={5}
                placeholder="Product Description..."
                className="textarea textarea-bordered w-full mt-5"
              />
            </div>

            {/* Pricing & Stock */}
            <div>
              <h3 className="text-xl font-semibold mb-5">
                Pricing & Inventory
              </h3>

              <div className="grid md:grid-cols-3 gap-5">
                <input
                  name="price"
                  type="number"
                  required
                  placeholder="Regular Price"
                  className="input input-bordered"
                />

                <input
                  name="offerPrice"
                  type="number"
                  required
                  placeholder="Offer Price"
                  className="input input-bordered"
                />

                <input
                  name="stock"
                  type="number"
                  required
                  placeholder="Total Stock"
                  className="input input-bordered"
                />
              </div>
            </div>

            {/* Sizes */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Available Sizes</h3>

              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <label
                    key={size}
                    className={`btn ${
                      sizes.includes(size) ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={sizes.includes(size)}
                      onChange={() => handleSize(size)}
                    />

                    {size}
                  </label>
                ))}
              </div>
            </div>
            {/* Images */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Images</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {["image1", "image2", "image3"].map((image) => (
                  <div key={image} className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      name={image}
                      onChange={handleImage}
                      className="file-input file-input-bordered w-full"
                    />

                    <div className="border rounded-xl overflow-hidden h-64 bg-base-300 flex items-center justify-center">
                      {images[image] ? (
                        <img
                          src={URL.createObjectURL(images[image])}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm opacity-60">No Image</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Product Options */}

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Options</h3>

              <div className="flex flex-wrap gap-10">
                <label className="label cursor-pointer gap-3">
                  <span className="label-text font-medium">
                    Featured Product
                  </span>

                  <input
                    type="checkbox"
                    name="featured"
                    className="toggle toggle-primary"
                  />
                </label>

                <label className="label cursor-pointer gap-3">
                  <span className="label-text font-medium">
                    Special Edition
                  </span>

                  <input
                    type="checkbox"
                    name="special"
                    className="toggle toggle-secondary"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary min-w-48"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Uploading...
                  </>
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
