import axios from "axios";
import Cookies from "js-cookie";

function CartRow({cartitem, on_cart, api_url}) {
    function update_cart(to_change){
        const urlm = Cookies.get("cart_id")?Cookies.get("cart_id"):'0'
        const product_to_add = {
          product: cartitem.product.id,
          quantity: to_change,
        };
        axios
          .put(api_url + "cart/"+urlm+"/", product_to_add)
          .then((res) => {
            Cookies.set('cart_id', res.data.id, { expires: 7 });
            on_cart()
          });
      }
      const totalfor = cartitem.product.price * cartitem.quantity;
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img
            alt="..."
            className="img-fluid"
            src={cartitem.product.image}
          />
        </div>
        <div className="col">
          <div className="row">{cartitem.product.name}</div>
          <div className="row">$ {cartitem.product.price}</div>
        </div>

        <div className="col">
        <button style={{marginRight: "7px"}} onClick={() => update_cart(1)} className="btn btn-outline-dark mt-auto text-center">+</button>
            {cartitem.quantity}
            <button style={{marginLeft: "7px"}} onClick={() => update_cart(-1)} className="btn btn-outline-dark mt-auto text-center">-</button>
        </div>

        <div className="col">
          $ {totalfor.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartRow;
