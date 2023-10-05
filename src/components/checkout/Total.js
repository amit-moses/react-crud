function Total({price}) {
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
        <input id="code" placeholder="Enter your code" />
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
