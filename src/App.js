import React from "react";
import ProductContainer from "./components/Container/productContainer";
import Cart from "./components/Cart";
import { CartProvider } from "./components/Context/CartContext";
import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <h1 className="app-title">Online Store</h1>
        <ProductContainer />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
