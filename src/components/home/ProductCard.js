function ProductCard({ product }) {
    const boxstyle = {
        width: "100%",
        height: "180px",
	    objectFit: "cover",
    }
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* <!-- Product image--> */}
        <div style={{position: "relative"}}>
          <img style={boxstyle} className="card-img-top" src={product.image} alt="..." />
        </div>
        {/* <!-- Product details--> */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* <!-- Product name--> */}
            <h5 className="fw-bolder">{product.name}</h5>
            {/* <!-- Product price--> */}$ {product.price}
          </div>
        </div>
        {/* <!-- Product actions--> */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto" href="#!">
              View options
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
