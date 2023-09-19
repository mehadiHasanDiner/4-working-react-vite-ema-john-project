import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // এখানে cart একটি এ্যারে রিটার্ন করে। useState -এর এই এ্যারে যেহেতু immutable তাই এটানে চেঞ্জ করা যায় না। তাই এখানে Array.push এর বদলে ...cart (Spread operator) ব্যবহার করা হয়েছে।

  const handleAddToCart = (product) => {
    // const newCart = [...cart, product];

    // optional
    let newCart = [];
    // const newCart = [...cart, product];
    // if product does not exist in the cart, then set quantity=1;
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = product.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id of the added product.
    for (const id in storedCart) {
      // step 2: get product from products state using id.
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // step 3: add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: add the added product to the saved cart
        savedCart.push(addedProduct);
      }
      console.log("added product", addedProduct);
    }
    // step 5: set the cart
    setCart(savedCart);
  }, [products]);

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <p>item added : {cart.length}</p>
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
