import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const home = props.goToHome;
  return (
    <nav className="max-w-screen-2xl bg-gradient-to-tr from-blue-500 to-blue-800 py-4 px-8 flex justify-between z-50 items-center shadow fixed top-0 min-w-screen w-full text-white">
      <div className="flex items-center gap-2 px-4 py-2 rounded-sm shadow-lg text-nowrap bg-slate-100">
        <img src={"/game.png"} className="h-8 w-8 inline" />
        <h1 className="text-2xl text-blue-600 font-semibold">Fake Store</h1>
      </div>
      <div>
        {home ? (
          <Link to="/" className="bg-emerald-600 text-white py-2 px-4 font-semibold shadow-lg rounded text-nowrap mt-4">
            Back to Products
          </Link>
        ) : (
          <Link to="/cart" className="bg-blue-500 text-white py-2 px-4 font-semibold rounded shadow-lg text-nowrap mt-4">
            Go to Cart ({props.cartLength})
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
