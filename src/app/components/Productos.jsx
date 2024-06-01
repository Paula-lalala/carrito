"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from './Productos.module.css';

const Productos = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let componentMounted = true;

    const getProductos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        if (componentMounted) {
          setData(result);
          setFilter(result);
          const uniqueCategories = [...new Set(result.map((producto) => producto.category))];
          setCategorias(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProductos();

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categoriasData = await response.json();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategorias();
  }, []);

  const saveItem = (producto) => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito.push(producto);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.reload();
  };

  const filtrarPorCategoria = (categoria) => {
    if (categoria === "all") {
      setFilter(data);
    } else {
      setFilter(data.filter(producto => producto.category === categoria));
    }
  };

  return (
    <section className={styles.productosContainer}>
      <section className="mb-3">
        <h4>Selecciona una categoría:</h4>
        <section className="btn-group" role="group">
          <button type="button" className="btn btn-secondary" onClick={() => filtrarPorCategoria("all")}>All</button>
          {categorias.map((categoria, index) => (
            <button key={index} type="button" className="btn btn-secondary" onClick={() => filtrarPorCategoria(categoria)}>
              {categoria}
            </button>
          ))}
        </section>
      </section>
      {loading ? (
        <section className={styles.loading}>Loading...</section>
      ) : (
        <section className="row">
          {filter.map((producto) => (
            <section className={`col-md-3 ${styles.producto}`} key={producto.id}>
              <section className={`card h-100 text-center p-4 ${styles.productCard}`}>
                <img src={producto.image} className={`card-img-top ${styles.productImage}`} alt={producto.title} />
                <section className={`card-body ${styles.productBody}`}>
                  <h5 className={`card-title ${styles.productTitle}`}>{producto.title}</h5>
                  <p className={`card-text ${styles.productPrice}`}>${producto.price}</p>
                  <Link href="#">
                  <button onClick={() => saveItem(producto)} className={`btn btn-primary ${styles.backButton}`}>Compra ahora</button>
                  </Link>
                  <Link href={`/product/${producto.id}`}>
                    <button className={`btn ${styles.backButton}`}>Detalles del producto</button>
                  </Link>
                </section>
              </section>
            </section>
          ))}
        </section>
      )}
    </section>
  );
};

export default Productos;
