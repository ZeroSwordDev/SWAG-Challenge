"use client";

import { X } from "lucide-react";
import "./Wrapper.css";
import { useCart } from "../context/Cart";
import { formatPrice } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

export const CartWrapper = () => {
  const {
    cartItems,
    openCart,
    setOpenCart,
    decreaseFromCart,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!openCart) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="cart-overlay"
        onClick={() => setOpenCart(false)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="cart-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-header">
            <h2 className="">My Cart</h2>
            <X onClick={() => setOpenCart(!cartItems)} />
          </div>

          {/* Items */}
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="item-info">
                      <span className="material-icons item-info-img">
                        image
                      </span>
                      <p className="font-semibold">{item.name}</p>
                      <p className="item-details">
                        Qty: {item.quantity} × {formatPrice(item.basePrice)}
                      </p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="btn btn-secondary cta2"
                      onClick={() => decreaseFromCart(item.id)}
                    >
                      <span className="material-icons">remove</span>
                      Disminuir
                    </button>
                    <button
                      className="btn btn-secondary cta2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <span className="material-icons">remove</span>
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="summary-item">
              <span className="summary-label">Total:</span>
              <span className="summary-value">
                {formatPrice(
                  cartItems.reduce(
                    (total, item) => total + item.basePrice * item.quantity,
                    0
                  )
                )}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-actions">
            <button
              className="btn btn-primary cta1"
              onClick={() => alert("Función de cotización por implementar")}
            >
              <span className="material-icons">sell</span>
              Comprar
            </button>
            <button
              className="btn btn-secondary cta2"
              onClick={() => clearCart()}
            >
              <span className="material-icons">remove</span>
              Remover todo
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
