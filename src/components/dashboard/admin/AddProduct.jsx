import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];

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

  const totalStock = useMemo(
    () => sizes.reduce((sum, item) => sum + Number(item.stock || 0), 0),
    [sizes],
  );

  const handleSize = (size) => {
    setSizes((current) => {
      const exists = current.some((item) => item.size === size);

      if (exists) {
        return current.filter((item) => item.size !== size);
      }

      return [...current, { size, stock: 0 }];
    });
  };

  const handleSizeStock = (size, stock) => {
    setSizes((current) =>
      current.map((item) =>
        item.size === size
          ? {
              ...item,
              stock: Math.max(0, Number(stock) || 0),
            }
          : item,
      ),
    );
  };

  const handleImage = (event) => {
    setImages((current) => ({
      ...current,
      [event.target.name]: event.target.files?.[0] || null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!sizes.length) {
      return toast.error("Select at least one size.");
    }

    if (totalStock < 1) {
      return toast.error("Add stock to at least one selected size.");
    }

    try {
      setLoading(true);

      const form = event.target;
      const uploadedImages = await Promise.all([
        uploadImage(images.image1),
        uploadImage(images.image2),
        uploadImage(images.image3),
      ]);

      const product = {
        title: form.title.value.trim(),
        description: form.description.value.trim(),
        brand: form.brand.value.trim(),
        category: form.category.value,
        season: form.season.value,
        price: Number(form.price.value),
        offerPrice: Number(form.offerPrice.value),
        totalStock,
        sizes,
        images: uploadedImages.filter(Boolean),
        isFeatured: form.featured.checked,
        isSpecial: form.special.checked,
      };

      await axiosSecure.post("/products", product);

      toast.success("Product added successfully.");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product.");
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
            <div>
              <h3 className="text-xl font-semibold mb-5">Product Information</h3>

              <div className="grid lg:grid-cols-2 gap-5">
                <input name="title" type="text" required placeholder="Product Title" className="input input-bordered w-full" />
                <input name="brand" type="text" required placeholder="Brand" defaultValue="RedFlint" className="input input-bordered w-full" />

                <select name="category" required className="select select-bordered">
                  <option value="">Select Category</option>
                  <option>Signature</option>
                  <option>Premium</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>

                <select name="season" required className="select select-bordered">
                  <option value="">Season</option>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Autumn</option>
                  <option>All Season</option>
                </select>
              </div>

              <textarea name="description" required rows={5} placeholder="Product Description..." className="textarea textarea-bordered w-full mt-5" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Pricing & Inventory</h3>

              <div className="grid md:grid-cols-3 gap-5">
                <input name="price" type="number" min="0" required placeholder="Regular Price" className="input input-bordered" />
                <input name="offerPrice" type="number" min="0" required placeholder="Offer Price" className="input input-bordered" />
                <input type="number" value={totalStock} readOnly className="input input-bordered opacity-80" aria-label="Total stock" />
              </div>

              <p className="text-xs text-base-content/50 mt-2">
                Total stock is calculated automatically from size stock.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Sizes & Stock</h3>

              <div className="flex flex-wrap gap-3 mb-5">
                {AVAILABLE_SIZES.map((size) => {
                  const selected = sizes.some((item) => item.size === size);

                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleSize(size)}
                      className={`btn ${selected ? "btn-primary" : "btn-outline"}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sizes.map((item) => (
                  <label key={item.size} className="form-control">
                    <span className="label-text mb-2">{item.size} Stock</span>
                    <input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(event) => handleSizeStock(item.size, event.target.value)}
                      className="input input-bordered w-full"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Images</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {["image1", "image2", "image3"].map((image) => (
                  <div key={image} className="space-y-3">
                    <input type="file" accept="image/*" name={image} onChange={handleImage} className="file-input file-input-bordered w-full" />

                    <div className="border rounded-xl overflow-hidden h-64 bg-base-300 flex items-center justify-center">
                      {images[image] ? (
                        <img src={URL.createObjectURL(images[image])} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm opacity-60">No Image</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Options</h3>

              <div className="flex flex-wrap gap-10">
                <label className="label cursor-pointer gap-3">
                  <span className="label-text font-medium">Featured Product</span>
                  <input type="checkbox" name="featured" className="toggle toggle-primary" />
                </label>

                <label className="label cursor-pointer gap-3">
                  <span className="label-text font-medium">Special Edition</span>
                  <input type="checkbox" name="special" className="toggle toggle-secondary" />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="btn btn-primary min-w-48">
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
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
