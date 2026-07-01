import React from "react";

import Product from "../components/shared/Product";

const Products = () => {
  
  const productList = [
    {
      id: 1,
      title: "Running Shoes",
      description: "Comfortable athletic footwear with responsive cushioning.",
      image: "https://daisyui.com",
      tags: ["Fashion", "Sports"],
      isNew: true
    },
    {
      id: 2,
      title: "Casual Sneakers",
      description: "Perfect minimalist everyday footwear choice for daily errands.",
      image: "https://daisyui.com",
      tags: ["Fashion", "Products"],
      isNew: false
    }
  ];

  
  return (
    <div>
      <h2 className="text-2xl font-bold">Products Page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
