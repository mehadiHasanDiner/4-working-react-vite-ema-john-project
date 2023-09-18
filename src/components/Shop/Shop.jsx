import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    // এখানে cart একটি এ্যারে রিটার্ন করে। useState -এর এই এ্যারে যেহেতু immutable তাই এটানে চেঞ্জ করা যায় না। তাই এখানে Array.push এর বদলে ...cart (Spread operator) ব্যবহার করা হয়েছে।

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data=>setProducts(data))
    },[])

    // const handleAddToCart = (product) => {
    //     const newCart = [...cart, product]
    //     setCart(newCart);
    // }
    return (
        <div className='shop-container'>
            <div className="products-container">
                <h2>Products coming here: {products.length}</h2>
                {
                    products.map(product =><Product key={product.id} product={product} ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;