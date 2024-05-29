"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from './Productos.module.css'; // Importar el CSS modularizado

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

  return (
    <div className={styles.productosContainer}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className="row">
          {filter.map((producto) => (
            <div className={`col-md-3 ${styles.producto}`} key={producto.id}>
              <div className={`card h-100 text-center p-4 ${styles.productCard}`}>
                <img src={producto.image} className={`card-img-top ${styles.productImage}`} alt={producto.title} />
                <div className={`card-body ${styles.productBody}`}>
                  <h5 className={`card-title ${styles.productTitle}`}>{producto.title}</h5>
                  <p className={`card-text ${styles.productPrice}`}>${producto.price}</p>
                  <Link href={`/product/${producto.id}`}>
                  <button className={`btn btn-primary ${styles.backButton}`}>Comprar ahora</button>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;


