import React, { useEffect, useState } from "react";
import "../App.css";
import Product from "./Product";
import axios from "axios";

function Products() {
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [pr_name, setProductName] = useState("");
  const [pr_price, setProductPrice] = useState(0);
  const [pr_stock, setProductStock] = useState(0);
  const [pr_cat, setProductCat] = useState(1);
  const [refresh, setRefresh] = useState(0);
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
  }, [refresh]);

  const refresh_func = () => {
    setRefresh(refresh + 1);
  };

  function addProduct() {
    const product_to_add = {
      name: pr_name,
      price: pr_price,
      stock: pr_stock,
      category: pr_cat,
    };
    axios
      .post("http://127.0.0.1:8000/products/", product_to_add)
      .then((res) => {
        console.log(res.data);
        setProductsList([...productsList, product_to_add]);
        setProductName("");
        setProductPrice(0);
        setProductCat(1);
        setProductStock(0);
        refresh_func()
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    addProduct();
  }

  return (
    <>
    <div className="container">
    <select
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Default select example"
            className="form-select col-md-12"
          >
            <option
                value="0"
              >
                all
              </option>
            {categoryList.map((item, index) => (
              <option
                value={item.id}
                key={index}
              >
                {item.name}
              </option>
            ))}
          </select>
    </div>
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="inp1"
              value={pr_name}
              type="text"
              className="form-control"
              onChange={(e) => setProductName(e.target.value)}
            ></input>
            <label htmlFor="inp1">product name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="inp2"
              value={pr_price}
              type="number"
              step="0.01"
              className="form-control"
              onChange={(e) => setProductPrice(e.target.value)}
            ></input>
            <label htmlFor="inp2">product price</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="inp3"
              value={pr_stock}
              type="number"
              className="form-control"
              onChange={(e) => setProductStock(e.target.value)}
            ></input>
            <label htmlFor="inp3">product stock</label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="inp4"
              value={pr_cat}
              type="number"
              className="form-select"
              onChange={(e) => setProductCat(e.target.value)}
            >
              {categoryList.map((item, index) => (
              <option
                value={item.id}
                key={index}
              >
                {item.name}
              </option>
            ))}
            </select>
            <label htmlFor="inp4">category</label>
          </div>

          <br />
          <input
            className="btn btn-primary"
            value={"add"}
            type="submit"
          ></input>
        </form>
      </div>
          
      <div className="col-md-6">
        <table className="table table-striped" border="1">
          <thead className="thead-dark">
            <tr>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">stock</th>
              <th scope="col">product category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="tablebody">
            {filter_cat().map((product, index) => (
              <Product key={index} category={categoryList} product={product} refresh={refresh_func} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
