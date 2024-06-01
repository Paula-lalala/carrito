"use client"
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(sessionStorage.getItem("carrito")) || [];
    if (storedProducts.length > 0) {
      setCarrito(storedProducts);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <section className="container-fluid">
        <section className="collapse navbar-collapse" id="navbarSupportedContent">
          <button className="btn btn-dark">
            Carrito ({carrito.length})
          </button>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
