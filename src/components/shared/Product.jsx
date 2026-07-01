import React from 'react';

const Product = ({ product }) => {
  // Destructure properties from the product object
  const { image, title, description, tags, isNew } = product;

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-sm border border-base-200">
      <figure className="px-4 pt-4">
        <img
          src={image || "https://daisyui.com"}
          alt={title}
          className="rounded-xl h-48 w-full object-contain bg-base-200"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          {title}
          {isNew && <div className="badge badge-secondary text-xs">NEW</div>}
        </h2>
        <p className="text-sm text-base-content/70">{description}</p>
        <div className="card-actions justify-end mt-4">
          {tags?.map((tag, index) => (
            <div key={index} className="badge badge-outline text-xs">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Product;