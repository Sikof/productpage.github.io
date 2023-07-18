"use client";
import { products } from "./dummyData";
import "./app.css";
import { useState } from "react";
import Link from "next/link";

const ProductItem = ({ product, handleSelect, selectedProducts }) => {
  const { name, price, SKU, type } = product;
  const isSelected = selectedProducts.includes(SKU);

  return (
    <div className="productItem">
      <div
        className={isSelected ? "checkBoxSelected" : "checkBox"}
        onClick={() => handleSelect(SKU)}
      ></div>

      <div className="productDetail">{SKU}</div>
      <div className="productDetail">{name}</div>
      <div className="productDetail">${price}</div>
      {type === "DVD" && <div className="productDetail">{product.size}</div>}
      {type === "Furniture" && (
        <div className="productDetail">
          Dimensions: {product.height} x {product.width} x {product.length}
        </div>
      )}
    </div>
  );
};

export default function ProductPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [products, setProducts] = useState([]);

  const handleSelect = (SKU) => {
    if (selectedProducts.includes(SKU)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== SKU));
    } else {
      setSelectedProducts([...selectedProducts, SKU]);
    }
  };
  // const getProducts = async () => {
  //   try {
  //     const response = await fetch("https://your-php-server/api/products", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const products = await response.json();
  //       setProducts(products)
  //       // Handle the received products data
  //       console.log(products);
  //     } else {
  //       // Handle the error case
  //       console.error(
  //         "Failed to fetch products:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching products:", error);
  //   }
  // };

  // const handleMassDelete = async () => {
  //   try {
  //     const response = await fetch("https://your-php-server/api/products", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(selectedProducts),
  //     });

  //     if (response.ok) {
  //       const products = await response.json();
  //       setProducts(products);
  //     } else {
  //       // Handle the error case
  //       console.error(
  //         "Failed to delete products:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while deleting products:", error);
  //   }
  // };

  return (
    <div>
      <div className="header">
        <div id="headerText">Product List</div>
        <div className="headerButtons">
          <Link href="/addProductPage">
            <div className="headerButton">ADD</div>
          </Link>
          <div
            className="headerButton"
            // onClick={() => handleMassDelete()}
          >
            MASS DELETE
          </div>
        </div>
      </div>

      <div id="productsWrapper">
        {products.map((p) => (
          <ProductItem
            product={p}
            handleSelect={handleSelect}
            selectedProducts={selectedProducts}
            key={p.SKU}
          />
        ))}
      </div>
    </div>
  );
}
