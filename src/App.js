import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Cart from "./components/checkout/Cart";

function App() {
  const [cartList, setCartList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const refresh_func = () => {
    setRefresh(refresh + 1);
  };
  
  useEffect(() => {
    if(Cookies.get("cart_id")){
      axios.get("http://127.0.0.1:8000/cart/" + Cookies.get("cart_id") + "/").then((res) => {
        setCartList(res.data.cartitem); 
        setTotalPay(res.data.total)
    });
    }
  }, [refresh]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home refresh_cart={refresh_func} cartList={cartList} />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/mycart" element={<Cart refresh_cart={refresh_func} cartList={cartList} total_to_pay={totalPay} />} />
        <Route path="*" element={<div>no page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
