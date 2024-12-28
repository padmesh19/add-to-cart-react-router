import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

const CartPage = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const goToHome = true;
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart]);

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? (item.quantity<10 ? { ...item, quantity: item.quantity + 1 } : {...item} ): item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const discountPrice = totalPrice * 0.9; // 10% discount
   

  return (
    <>
      <Navbar goToHome={goToHome} />
        <div className="container bg-gray-800 px-8 pt-24 pb-8 min-h-screen h-full max-h-screen min-w-full flex flex-col transition-all ease-in-out">
          <div className="bg-slate-300 py-4 px-4 rounded-md flex flex-col sm:flex-row justify-between sticky top-24 w-full items-center">
            <p className="text-xl font-semibold">
              Total Price : ${totalPrice.toFixed(2)}
            </p>
            <div className="flex gap-2 items-center relative">
              <span className="material-symbols-outlined discount">info</span>
              <p className="discount-open hidden">
                Get discount of 10% for all products
              </p>
              <p className="text-xl font-semibold">
                Discounted Price : ${discountPrice.toFixed(2)}
              </p>
            </div>
          </div>
          {cart == 0 ? (
            <>
              <div className="flex justify-center items-center max-h-full h-fit min-h-[70vh] ">
                <h1 className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-semibold">
                  - Your Cart is Empty -
                </h1>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 mt-8 max-h-full h-fit overflow-y-scroll pr-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border bg-white p-4 rounded-md shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 object-contain"
                      />
                      <div className="flex flex-col items-start gap-2">
                        <h2 className="text-xl">{item.title}</h2>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="border border-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white font-bold px-2 rounded"
                          >
                            -
                          </button>
                          <p className="mx-2">{item.quantity}</p>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="border border-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white font-bold px-2 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between h-full w-full sm:w-fit sm:items-end gap-2 sm:text-nowrap">
                      <p className="font-semibold px-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 mt-2 py-2 px-4 text-center sm:text-right w-full hover:bg-red-500 hover:text-white rounded-md"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
    </>
  );
};

export default CartPage;
