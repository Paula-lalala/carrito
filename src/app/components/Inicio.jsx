"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import Productos from "./Productos";
import styles from './Inicio.module.css';

const Inicio = () => {
  return (
    <section className={styles.hero}>
      <section className={`card text-bg-dark text-white border-0 ${styles.heroCard}`}>
        <img src="/recursos/comp.jpg" className={`card-img ${styles.heroImage}`} alt="Background" height="560px" />
        <section className={`card-img-overlay d-flex flex-column justify-content-center ${styles.heroContent}`}>
          <h5 className={`card-title display-3 fw-bolder mb-0 ${styles.heroTitle}`}>!VEN Y COMPRA!</h5>
          <p className={`card-text lead fs-2 ${styles.heroText}`}>
            Descuentos del 20% en toda la tienda
          </p>
        </section>
      </section>
      <Productos />
    </section>
  );
};

export default Inicio;

