import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import ProductList from "../Presentational/ProductList";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === activeCategory)
      );
    }
  }, [activeCategory, products]);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const getCartQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  return (
    <div className="product-container">
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-button ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : cat.replace(/'/g, "’")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          getCartQuantity={getCartQuantity}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default ProductContainer;
