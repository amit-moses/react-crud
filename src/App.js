import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Cart from "./components/checkout/Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  const api_url = "http://127.0.0.1:8000/"
  const refresh_func = () => {
    setRefresh(refresh + 1);
  };
  
  useEffect(() => {
    if(Cookies.get("cart_id")){
      axios.get(api_url + "cart/" + Cookies.get("cart_id") + "/").then((res) => {
        setCartList(res.data.cartitem); 
        setTotalPay(res.data.total);
        setCartData((({ cartitem, ...rest }) => rest)(res.data));
    });
    }
  }, [refresh]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home api_url={api_url} refresh_cart={refresh_func} cartList={cartList} />} />
        <Route path="/edit" element={<Edit api_url={api_url} />} />
        <Route path="/mycart" element={<Cart api_url={api_url} refresh_cart={refresh_func} cartList={cartList} total_to_pay={totalPay} cart_data={cartData} />} />
        <Route path="*" element={<div>no page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
