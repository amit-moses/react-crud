import { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';


function Total({price, api_url, refresh, cart_data}) {
  const [ed_promo, setPromo] = useState("");
  const [errorMsg, setError] = useState();

  function update_promo(promo){
    setError()
    axios.post(api_url + "updatepromo/" + Cookies.get("cart_id") + "/", {promocode: promo})
    .then((res) => {
        if(res.data.res){
          refresh();}
        else {
          setError(ed_promo);
          console.log('not');
        }
        setPromo("");
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
        <div className="input-group">
          <input value={ed_promo} id="code" placeholder="Enter your code" className="form-control rounded-0" onChange={(e) => setPromo(e.target.value)} />
          <div className="input-group-append">
            <button onClick={() => update_promo(ed_promo)} className="btn btn-outline-dark rounded-0" type="button">update</button>
          </div>
        </div>

        {errorMsg? <div className="alert alert-danger" role="alert">
          {errorMsg} is not availble!
        </div>: ""}
        

        {cart_data.promocode ? 
        <div className="alert alert-success" role="alert">
          <button type="button" className="btn btn-outline-dark" onClick={() => update_promo(-1)}>
              <span aria-hidden="true">&times;</span>
            </button>
            &nbsp;&nbsp;&nbsp;
          {cart_data.promocode.code} &nbsp; {cart_data.promocode.discount + '%'}
          </div> : ""}
      </form>

      <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">{cart_data.promocode ? "PRICE BEFORE": "TOTAL PRICE"} </div>
        <div className="col text-right">$ {cart_data.promocode ? <del>{cart_data.total_before + 5} </del> : cart_data.total_before + 5} </div>  
      </div>

      {cart_data.promocode ? 
        <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">$ {cart_data.total + 5} </div>  
      </div> :""}
      <button className="btn btn-outline-dark">CHECKOUT</button>

    </div>
  );
}

export default Total;
