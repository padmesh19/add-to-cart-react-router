import React from "react";

const Product = ({ product, cart, onAddToCart, onRemoveFromCart }) => {
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="border max-w-[450px] flex flex-col justify-between gap-2 p-4 shadow-lg bg-white rounded-md">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-4"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="relative">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-xl font-bold text-gray-800">${product.price}</p>
          <p className="description text-gray-600">View Description</p>
          <p className="text-gray-600 cursor-auto hidden description-open">
            {product.description}
          </p>
        </div>
        <button
          className={`mt-4 p-2 rounded ${
            isInCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() =>
            isInCart ? onRemoveFromCart(product.id) : onAddToCart(product)
          }
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
