import React from "react";
import { useCart } from "../Context/CartContext";

const ProductList = ({ products, getCartQuantity }) => {
  const { dispatch } = useCart();

  const handleQuantityChange = (productId, amount) => {
    const currentQuantity = getCartQuantity(productId);

    // Автоматическое удаление при нулевом количестве
    if (currentQuantity + amount < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: productId });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, amount },
      });
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const quantity = getCartQuantity(product.id);

        return (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <p className="product-category">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </p>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>

              <div className="cart-controls">
                {quantity > 0 ? (
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(product.id, -1)}
                      aria-label="Reduce quantity"
                    >
                      −
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(product.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-to-cart"
                    onClick={() =>
                      dispatch({ type: "ADD_ITEM", payload: product })
                    }
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
