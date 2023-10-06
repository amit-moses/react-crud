import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Navbar from "../navbar/Navbar";

function Home({refresh_cart, cartList, api_url}) {
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  function help_filter(myproduct){
    let to_return = filter? parseInt(myproduct.category) === parseInt(filter): true;
    if(searchKey) return to_return && myproduct.name.toLowerCase().includes(searchKey.toLowerCase());
    else return to_return;
  }
  useEffect(() => {
    const api = "http://127.0.0.1:8000/"
    axios.get(api + "category/").then((res) => {
      setCategoryList(res.data);
    });
    axios.get(api + "products/").then((res) => {
      setProductsList(res.data);
    });
  }, []);
  
  function quantity_in_cart(id_pro){
    const query = cartList.filter((item)=>parseInt(item.product.id) === parseInt(id_pro));
    if(query.length) return parseInt(query[0].quantity);
    else return 0;
  }
  return (
    <div>
      {/* <!-- Navigation--> */}
      <Navbar cartitems={cartList.length} categories={categoryList} filter_func={setFilter} myfilter={filter} search={setSearchKey}/>

      {/* <!-- Section--> */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {productsList.filter((item)=> help_filter(item)).map((product, index) => (
            <ProductCard api_url={api_url} on_cart={refresh_cart} key={index} product={product} in_cart={quantity_in_cart(product.id)}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
