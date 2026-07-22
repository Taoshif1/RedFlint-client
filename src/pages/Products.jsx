import React from "react";

import Product from "../components/shared/Product";
import BluePlaid from "../assets/Blue_Plaid.png";
import DesertSand from "../assets/Desert_Sand.png";
import IndigoBlue from "../assets/Indigo_Blue.png";
import MintPattern from "../assets/Mint_Pattern.jpg";
import StoneGray from "../assets/Stone_Gray.png";

const Products = () => {
  const productList = [
    {
      id: 1,
      title: "Blue Plaid",
      price:"1200",
      description: "Snap into style. Crafted with precision",
      image: BluePlaid,
      tags: ["Signature", "Full-Sleeve"],
      isNew: true,
    },
    {
      id: 2,
      title: "Desert Sand",
      price:"1200",
      description: "Step into warm sophistication with the Desert Sand shirt",
      image: DesertSand,
      tags: ["Cuban", "Half-Sleeve"],
      isNew: false,
    },
    {
      id: 3,
      title: "Indigo Blue",
      price:"1200",
      description: "Bold in the details. The Indigo Blue Shirt makes its mark with rich color",
      image: IndigoBlue,
      tags: ["Signature", "Full-Sleeve"],
      isNew: false,
    },
    {
      id: 4,
      title: "Mint Pattern",
      price:"1200",
      description: "The Mint Pattern Shirt, where cool tones meet geometric precision.",
      image: MintPattern,
      tags: ["Plaid", "Full-Sleeve"],
      isNew: false,
    },
    {
      id: 5,
      title: "Stone Gray",
      price:"1200",
      description: "Stone Gray Shirt, where understated elegance defines your style.",
      image: StoneGray,
      tags: ["Signature", "Full-Sleeve"],
      isNew: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-0.5 py-0.5">
      <div className="mb-6">
        <p className="text-sm text-base-content/60">
          Home
          <span className="mx-2">/</span>
          <span className="font-medium text-base-content">Products</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {productList.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
