import React from "react";
import { useCart } from "./Context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleQuantityChange = (itemId, amount) => {
    const item = cart.find((i) => i.id === itemId);
    if (item.quantity + amount < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: itemId, amount },
      });
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="section-title">Your Cart ({cart.length})</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <div className="product-list">
            {cart.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                />
                <div className="product-content">
                  <p className="product-category">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                  </p>
                  <h3 className="product-title">{item.title}</h3>
                  <div className="product-footer">
                    <p className="product-price">${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-price">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="clear-cart-button"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Clear All Items
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
