import React, { useState, useEffect } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";

function ProductView({ products }) {
  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(
    localStorage.getItem("sideOpen") || true
  );
  // if(localStorage.getItem("sideOpen")){
  //   setSideOpen(localStorage.getItem("sideOpen"))
  // }
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (sideOpen === "false") setSideOpen(false);
  }, []);

  useEffect(() => {
    console.log("selected item change to ,", selectedItem);
    if (selectedItem) {
      setSideOpen(true);
    }
  }, [selectedItem]);
  useEffect(() => {
    console.log("side open changed to ", sideOpen);
    if (!sideOpen) setSelectedItem("");
    localStorage.setItem("sideOpen", sideOpen);
  }, [sideOpen]);

  console.log("here");
  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => {
                return setSelectedItem(item);
              }}
              isSelected={selectedItem.id === item.id}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => {
              setSideOpen(!sideOpen);
            }}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>
        <ProductDetails product={selectedItem} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
