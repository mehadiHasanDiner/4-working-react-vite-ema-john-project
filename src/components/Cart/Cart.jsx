import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // console.log(cart);
  // const cart = props.cart; //option 1
  // const {cart} = props; // option 2

  let totalPrice = 0;
  let shippingTotalPrice = 0;
  let quantity = 0;
  for (const product of cart) {
    // product.quantity = product.quant || 1;
    // if (product.quantity === 0) {
    //   product.quantity = 1;
    // }
    totalPrice = totalPrice + product.price * product.quantity;
    shippingTotalPrice = shippingTotalPrice + product.shipping;
    quantity = quantity + product.quantity;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + shippingTotalPrice + tax;

  // const cart = props.cart; //option-1
  // const {cart} = props; // option-2
  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping: ${shippingTotalPrice}</p>
      <p>Tax ${tax.toFixed(2)}</p>
      <h6>Grand Total ${grandTotal.toFixed(2)}</h6>
    </div>
  );
};

export default Cart;
