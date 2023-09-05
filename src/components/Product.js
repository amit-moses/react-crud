import axios from "axios";

function Product({ product, onDelete }) {
  function del_func(){
    axios.delete('http://127.0.0.1:8000/product/'+product.id).then(res => {
    onDelete()
      });
  }
  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.price} $</td>
        <td>{product.stock}</td>
        <td>{product.category}</td>
        <td><button onClick={del_func} type="button" className="btn btn-danger">delete</button></td>
      </tr>
    </>
  );
}

export default Product;
