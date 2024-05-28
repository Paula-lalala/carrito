"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Link from 'next/link';

const Productos = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]); // Estado para categorías

  useEffect(() => {
    let componentMounted = true;

    const getProductos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        if (componentMounted) {
          setData(products);
          setFilter(products);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    getProductos();

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;

    const getCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        if (componentMounted) {
          setCategorias(categories);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    getCategorias();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <div className="buttons d-flex justify-content-center mb-5 pb-5">Loading...</div>
    );
  };

  const filterProductsByCategory = (category) => {
    if (category === 'all') {
      setFilter(data);
    } else {
      const filteredProducts = data.filter(product => product.category === category);
      setFilter(filteredProducts);
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <section className="buttons d-flex justify-content-center mb-5 pb-5">
          <button 
            className="btn btn-outline-dark ms-2" 
            onClick={() => filterProductsByCategory('all')}
          >
            All
          </button>
          {categorias.map((categoria) => (
            <button 
              key={categoria} 
              className="btn btn-outline-dark ms-2" 
              onClick={() => filterProductsByCategory(categoria)}
            >
              {categoria}
            </button>
          ))}
        </section>
        {filter.map((product) => (
          <section className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
              <div className="card-body">
                <h5 className="card-title mb-0">{product.title.substring(0,12)}...</h5>
                <p className="card-text lead fw-bold">
                  $ {product.price}
                </p>
                <Link className="btn btn-outline-dark ms-2" href="./product/[id]" as={`/product/${product.id}`}>Compra ahora</Link>
              </div>
            </div>
          </section>
        ))}
      </>
    );
  };

  return (
    <section className="container my-5 py-5">
      <section className="row">
        <section className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">ÚLTIMOS PRODUCTOS</h1>
          <hr />
        </section>
      </section>
      <section className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </section>
    </section>
  );
};

export default Productos;

