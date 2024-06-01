"use client"
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './ProductPage.module.css';

export default async function ProductPage({ params }) {
  console.log(params);

  const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await response.json();

  return (
    <>
      <section className={`d-flex justify-content-center ${styles.productPageContainer}`}>
        <section className={`card my-5 py-5 ${styles.productCard}`}>
          <section className="row g-0">
            <section className={`col-md-6 ${styles.productImageContainer}`}>
              <img src={product.image} className={`img-fluid rounded-start ${styles.productImage}`} alt={product.title} />
            </section>
            <section className={`col-md-6 ${styles.productDetails}`}>
              <section className={`card-body ${styles.productBody}`}>
                <h5 className={`card-title ${styles.productTitle}`}>{product.title}</h5>
                <p className={`card-text ${styles.productDescription}`}>{product.description}</p>
                <p className={`card-text ${styles.productPrice}`}>${product.price}</p>
                <Link href="/" legacyBehavior>
                  <button className={`btn btn-primary ${styles.backButton}`}>Volver</button>
                </Link>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}


