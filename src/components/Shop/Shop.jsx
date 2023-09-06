import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    // এখানে cart একটি এ্যারে রিটার্ন করে। useState -এর এই এ্যারে যেহেতু immutable তাই এটানে চেঞ্জ করা যায় না। তাই এখানে Array.push এর বদলে ...cart (Spread operator) ব্যবহার করা হয়েছে।

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=>setProducts(data))
    },[])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product =><Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
                <h5>product added: {cart.length}</h5>
            </div>
        </div>
    );
};

export default Shop;