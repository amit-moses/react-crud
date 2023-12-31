// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Edit from "./editor/Edit";
import Home from "./home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Cart from "./checkout/Cart";

function App() {
  const [cartData, setCartData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPay, setTotalPay] = useState(0);

  const api_url = "https://shop-rest.onrender.com/"
  function setMyCart(data){
      setCartList(data.cartitem); 
      setTotalPay(data.total);
      setCartData((({ cartitem, ...rest }) => rest)(data));
  }
  useEffect(() => {
    if(Cookies.get("cart_id")){
      axios.get(api_url + "cart/" + Cookies.get("cart_id") + "/").then((res) => {
        setMyCart(res.data)
    });
    }
  }, []);
  
  return (
    <Router>
      <Routes>
          <Route index element={<Home set_cart={setMyCart} api_url={api_url} cartList={cartList} />} />
          <Route path="/edit" element={<Edit api_url={api_url} />} />
          <Route path="/mycart" element={<Cart api_url={api_url} set_cart={setMyCart} cartList={cartList} total_to_pay={totalPay} cart_data={cartData} />} />
      </Routes>
    </Router>


 
  );
}

export default App;
