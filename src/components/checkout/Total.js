import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';


function Total({price, api_url, refresh}) {
  const [ed_promo, setPromo] = useState("");

  function update_promo(){
    axios.post(api_url + "updatepromo/" + Cookies.get("cart_id") + "/", {promocode: ed_promo})
    .then((res) => {
        if(res.data.res){refresh()}
        else {console.log('not')}
    });
  }
  return (
    <div className="col-md-3 summary navbar-light bg-light">
      <div>
        <h5>
          <b>Summary</b>
        </h5>
      </div>
      <hr></hr>

      <form>
        <p>SHIPPING</p>
        <select>
          <option className="text-muted">Standard-Delivery- $ 5.00</option>
        </select>
        <p>GIVE CODE</p>
        <div class="input-group">
          <input id="code" placeholder="Enter your code" className="form-control rounded-0" onChange={(e) => setPromo(e.target.value)} />
          <div class="input-group-append">
            <button onClick={() => update_promo()} class="btn btn-outline-dark rounded-0" type="button">update</button>
          </div>
        </div>
      </form>

      <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">$ {price + 5} </div>
      </div>
      <button className="btn btn-outline-dark">CHECKOUT</button>
    </div>
  );
}

export default Total;
