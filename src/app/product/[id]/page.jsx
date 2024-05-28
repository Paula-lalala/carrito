import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default async function ProductPage({ params }) {
  console.log(params);

  const response = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );
  const product = await response.json();

  return (
    <>

      <div className="d-flex justify-content-center">
        <div className="card my-5 py-5" style={{ height: "calc(100% + 20px)" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                height="250px"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    {product.description}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>      
      <div className="d-flex justify-content-end my-5 me-3">
        <Link href="/" className="btn btn-outline-dark">
          Volver
        </Link>
      </div>
    </>
  );
}

