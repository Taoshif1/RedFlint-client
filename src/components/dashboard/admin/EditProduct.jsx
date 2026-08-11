import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState({ image1: null, image2: null, image3: null });
  const [previewImages, setPreviewImages] = useState({ image1: "", image2: "", image3: "" });
  const [product, setProduct] = useState({
    title: "",
    description: "",
    brand: "RedFlint",
    category: "",
    season: "",
    price: "",
    offerPrice: "",
    isFeatured: false,
    isSpecial: false,
  });

  const totalStock = useMemo(
    () => sizes.reduce((sum, item) => sum + Number(item.stock || 0), 0),
    [sizes],
  );

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
          price: data.price ?? "",
          offerPrice: data.offerPrice ?? "",
          isFeatured: Boolean(data.isFeatured),
          isSpecial: Boolean(data.isSpecial),
        });

        const rawSizes = Array.isArray(data.sizes) ? data.sizes : [];
        const legacyFallbackStock = Math.max(0, Number(data.totalStock) || 0);

        setSizes(
          rawSizes
            .map((item) => {
              if (typeof item === "string") {
                return { size: item, stock: legacyFallbackStock };
              }

              if (item && typeof item === "object" && item.size) {
                return {
                  size: item.size,
                  stock: Math.max(0, Number(item.stock) || 0),
                };
              }

              return null;
            })
            .filter(Boolean),
        );

        setPreviewImages({
          image1: data.images?.[0] || "",
          image2: data.images?.[1] || "",
          image3: data.images?.[2] || "",
        });
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setProduct((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
          ? { ...item, stock: Math.max(0, Number(stock) || 0) }
          : item,
      ),
    );
  };

  const handleImage = (event) => {
    const { name, files } = event.target;
    const file = files?.[0];

    if (!file) return;

    setImages((current) => ({ ...current, [name]: file }));
    setPreviewImages((current) => ({ ...current, [name]: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!sizes.length) {
      return toast.error("Select at least one size.");
    }

    try {
      setSaving(true);

      const uploadedImages = [];

      for (const key of ["image1", "image2", "image3"]) {
        if (images[key]) {
          uploadedImages.push(await uploadImage(images[key]));
        } else if (previewImages[key]) {
          uploadedImages.push(previewImages[key]);
        }
      }

      await axiosSecure.patch(`/products/${id}`, {
        title: product.title.trim(),
        description: product.description.trim(),
        brand: product.brand.trim(),
        category: product.category,
        season: product.season,
        price: Number(product.price),
        offerPrice: Number(product.offerPrice),
        totalStock,
        sizes,
        images: uploadedImages.filter(Boolean),
        isFeatured: product.isFeatured,
        isSpecial: product.isSpecial,
      });

      toast.success("Product updated successfully.");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update product.");
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
                Update product information, pricing, per-size stock and images.
              </p>
            </div>

            <button type="button" className="btn btn-outline" onClick={() => navigate("/admin/products")}>Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-5">Product Information</h3>

              <div className="grid lg:grid-cols-2 gap-5">
                <input name="title" value={product.title} onChange={handleChange} required className="input input-bordered w-full" placeholder="Product Title" />
                <input name="brand" value={product.brand} onChange={handleChange} required className="input input-bordered w-full" placeholder="Brand" />

                <select name="category" value={product.category} onChange={handleChange} required className="select select-bordered">
                  <option value="">Select Category</option>
                  <option>Signature</option><option>Premium</option><option>Casual</option><option>Formal</option>
                </select>

                <select name="season" value={product.season} onChange={handleChange} required className="select select-bordered">
                  <option value="">Select Season</option>
                  <option>Summer</option><option>Winter</option><option>Spring</option><option>Autumn</option><option>All Season</option>
                </select>
              </div>

              <textarea name="description" value={product.description} onChange={handleChange} required rows={5} className="textarea textarea-bordered w-full mt-5" placeholder="Product Description..." />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Pricing & Inventory</h3>

              <div className="grid md:grid-cols-3 gap-5">
                <input name="price" type="number" min="0" value={product.price} onChange={handleChange} required className="input input-bordered" placeholder="Regular Price" />
                <input name="offerPrice" type="number" min="0" value={product.offerPrice} onChange={handleChange} required className="input input-bordered" placeholder="Offer Price" />
                <input type="number" value={totalStock} readOnly className="input input-bordered opacity-80" aria-label="Total stock" />
              </div>
              <p className="text-xs text-base-content/50 mt-2">Total stock is calculated from the size inventory below.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Sizes & Stock</h3>

              <div className="flex flex-wrap gap-3 mb-5">
                {AVAILABLE_SIZES.map((size) => {
                  const selected = sizes.some((item) => item.size === size);
                  return (
                    <button type="button" key={size} onClick={() => handleSize(size)} className={`btn ${selected ? "btn-primary" : "btn-outline"}`}>
                      {size}
                    </button>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sizes.map((item) => (
                  <label key={item.size} className="form-control">
                    <span className="label-text mb-2">{item.size} Stock</span>
                    <input type="number" min="0" value={item.stock} onChange={(event) => handleSizeStock(item.size, event.target.value)} className="input input-bordered w-full" />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Images</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {["image1", "image2", "image3"].map((imageName, index) => (
                  <div key={imageName}>
                    <label className="label"><span>Image {index + 1}</span></label>
                    <div className="border border-base-300 rounded-xl p-3">
                      {previewImages[imageName] && <img src={previewImages[imageName]} alt={`Product ${index + 1}`} className="w-full h-56 object-cover rounded-lg mb-3" />}
                      <input type="file" name={imageName} accept="image/*" onChange={handleImage} className="file-input file-input-bordered w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-5">Product Status</h3>
              <div className="flex flex-wrap gap-8">
                <label className="label cursor-pointer gap-3">
                  <span>Featured Product</span>
                  <input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={handleChange} className="checkbox checkbox-primary" />
                </label>

                <label className="label cursor-pointer gap-3">
                  <span>Special Edition</span>
                  <input type="checkbox" name="isSpecial" checked={product.isSpecial} onChange={handleChange} className="checkbox checkbox-secondary" />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-base-300 pt-6">
              <button type="button" onClick={() => navigate("/admin/products")} className="btn btn-outline">Cancel</button>
              <button type="submit" disabled={saving} className="btn btn-primary min-w-40">
                {saving ? <><span className="loading loading-spinner loading-sm" /> Updating...</> : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
