import NavbarCart from "../navbar/NavbarCart";
import CartRow from "./CartRow";
import Total from "./Total";

function Cart({ refresh_cart, cartList, total_to_pay }) {
  return (
    <>
      <NavbarCart />
      <div className="mycart">
        <div className="">
          <div className="row">
            <div className="col-md-9 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                  <div className="col align-self-center text-right text-muted">
                    {cartList.length} items
                  </div>
                </div>
              </div>
              {cartList.map((cartitem, index) => (
                <CartRow
                  key={index}
                  cartitem={cartitem}
                  on_cart={refresh_cart}
                />
              ))}
            </div>
            {cartList.length && <Total price={total_to_pay} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
