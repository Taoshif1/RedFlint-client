import { useState } from "react";

const ProductGallery = ({ images, title, season, category, isFeatured, isSpecial }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Image */}
      <div className="w-full max-w-md rounded-xl border border-base-200 overflow-hidden bg-base-100">
        <img
          src={selectedImage}
          alt={title}
          className="w-full aspect-square object-cover"
        />
        <div className="flex gap-2 mt-4">
          <span className="badge badge-outline">{season}</span>

          <span className="badge badge-primary">{category}</span>

          {isFeatured && (
            <span className="badge badge-success">Featured</span>
          )}

          {isSpecial && (
            <span className="badge badge-secondary">Special Edition</span>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 mt-5">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === image
                ? "border-primary"
                : "border-transparent hover:border-base-300"
            }`}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
