import React from 'react';
import './Cart.css';


const Cart = ({cart}) => {

    let totalPrice =0;
    let totalShippings =0;
    for(const product of cart){
        totalPrice = totalPrice + product.price
        totalShippings=totalShippings + product.shipping
    }

    const tax = totalPrice*7/100;
    const grandTotal = totalPrice+totalShippings+tax;


    // const cart = props.cart; //option-1
    // const {cart} = props; // option-2
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Total Shipping: {totalShippings} </p>
            <p>Tax {tax}</p>
            <h6>Grand Total {grandTotal}</h6>
        </div>
    );
};

export default Cart;