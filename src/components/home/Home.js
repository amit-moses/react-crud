import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Navbar from "../navbar/Navbar";

function Home({refresh_cart, cartList}) {
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(0);


  function filter_cat(){
    if(parseInt(filter)) return productsList.filter((item)=>parseInt(item.category) === parseInt(filter));
    else return productsList;
  }
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/category/").then((res) => {
      setCategoryList(res.data);
    });
    axios.get("http://127.0.0.1:8000/products/").then((res) => {
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
      <Navbar cartitems={cartList.length} categories={categoryList} filter_func={setFilter} myfilter={filter}/>

      {/* <!-- Section--> */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {filter_cat().map((product, index) => (
            <ProductCard on_cart={refresh_cart} key={index} product={product} in_cart={quantity_in_cart(product.id)}/>
            ))}

           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
