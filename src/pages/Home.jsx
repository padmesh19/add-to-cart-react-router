import React, { useState, useEffect } from "react";
import { fetchProducts } from "../utils/fakeStoreApi.js";
import Product from "../components/Product";
import Loader from "../components/loadingBar.jsx";
import Navbar from "../components/NavBar.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: product.quantity = 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar cartLength={cart.length}/>
      {isLoading ? (
        <div className="h-[100vh] bg-gray-800 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="container bg-gray-800 px-8 pt-28 pb-8 h-full min-w-full flex justify-center transition-all ease-in-out">
            <div className="grid w-fit grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
