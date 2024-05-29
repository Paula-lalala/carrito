import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Navbar.module.css'; // Importar el CSS modularizado

const Navbar = () => {
  return (
    <section className={styles.navSection}>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container">
          <a className={`navbar-brand fw-bold fs-3 ${styles.navBrand}`} href="#">
            ROPITAS Y ROPAS
          </a>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;

