import axios from 'axios';
import Cookies from 'js-cookie';

function ProductCard({ product, in_cart, on_cart }) {

  function update_cart(to_change){
    const urlm = Cookies.get("cart_id")?Cookies.get("cart_id"):'0'
    const product_to_add = {
      product: product.id,
      quantity: to_change,
    };
    axios
      .put("http://127.0.0.1:8000/cart/"+urlm+"/", product_to_add)
      .then((res) => {
        Cookies.set('cart_id', res.data.id, { expires: 7 });
        on_cart()
      });
  }
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
            {in_cart? 
            <>
            <button style={{marginRight: "15px"}} onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto">+</button>
            {in_cart}
            <button style={{marginLeft: "15px"}} onClick={() => update_cart(-1)} className="btn btn-outline-dark mt-auto">-</button>
            </>
            : 
            <button onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto">Add to cart</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
