import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;

  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</div>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit price: ${item.cost}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${itemTotal(item)}</p>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping} style={{ marginLeft: '12px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
