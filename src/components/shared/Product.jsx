import React from 'react';
import { Link } from "react-router";
const Product = ({ product }) => {
  const { image, title, price, description, tags, isNew } = product;

 return (
  <Link to={`/products/${product.id}`}>
    <div className="card bg-base-100 w-full max-w-sm shadow-sm border border-base-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
      <figure className="overflow-hidden rounded-t-xl">
  <img
    src={image}
    alt={title}
    className="w-full aspect-25/26 object-cover transition-transform duration-500 hover:scale-130"
  />
</figure>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          {title}
          {isNew && <div className="badge badge-secondary text-xs">NEW</div>}
        </h2>
        <p className='text-xl font-bold'>৳{price}</p>
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
  </Link>
  );
}
export default Product;