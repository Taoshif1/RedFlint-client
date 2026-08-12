import { useState } from "react";

const ProductGallery = ({
  images = [],
  title,
  season,
  category,
  isFeatured,
  isSpecial,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      {/* Main Image */}
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-base-200 bg-base-100">
        <img
          src={selectedImage}
          alt={title}
          fetchPriority="high"
          decoding="async"
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="mt-4 flex max-w-xl flex-wrap justify-center gap-2">
        {season ? <span className="badge badge-outline">{season}</span> : null}
        {category ? <span className="badge badge-primary">{category}</span> : null}
        {isFeatured ? (
          <span className="badge badge-success">Featured</span>
        ) : null}
        {isSpecial ? (
          <span className="badge badge-secondary">Special Edition</span>
        ) : null}
      </div>

      {/* Thumbnail Images */}
      <div className="hide-scrollbar mt-5 flex w-full max-w-xl snap-x gap-3 overflow-x-auto pb-2 sm:justify-center">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setSelectedImage(image)}
            aria-label={`View ${title} image ${index + 1}`}
            aria-pressed={selectedImage === image}
            className={`shrink-0 snap-start overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              selectedImage === image
                ? "border-primary"
                : "border-transparent hover:border-base-300"
            }`}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-18 w-18 object-cover sm:h-20 sm:w-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
