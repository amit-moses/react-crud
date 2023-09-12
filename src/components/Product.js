import axios from "axios";
import { useState } from "react";


function Product({ product, onDelete }) {
  const [editor, setEditor] = useState(false);
  const [ed_name, setEditorName] = useState(product.name);
  const [ed_price, setEditorPrice] = useState(product.price);
  const [ed_cat, setEditorCat] = useState(product.category);
  const [ed_stock, setEditorStock] = useState(product.stock);


function setSaveOrEditor(){
  if(editor){
    const product_to_update = {
      id: product.id,
      name: ed_name,
      price: ed_price,
      stock: ed_stock,
      category: ed_cat,
    };
    axios.put(`http://127.0.0.1:8000/product/${product.id}/`, product_to_update)
      .then(function (response) {
        const mok = !editor;
        setEditor(mok);
    });
  }
  else{
    console.log(`http://127.0.0.1:8000/product/${product.id}/`)
    const mok = !editor;
    setEditor(mok);
  }
  
}

  function del_func(){
    axios.delete('http://127.0.0.1:8000/product/'+product.id).then(res => {
    onDelete()
      });
  }
  return (
    <>
      <tr>
        <td><input type="text" onChange={(e) => setEditorName(e.target.value)} disabled={editor ? (false) : (true)} className=  {editor ? ("form-control") : ("form-control-plaintext")} value={ed_name}></input></td>
        <td><input type="number" step="0.01" onChange={(e) => setEditorPrice(e.target.value)} disabled={editor ? (false) : (true)} className=  {editor ? ("form-control") : ("form-control-plaintext")} value={ed_price}></input> </td>
        <td><input type="number" onChange={(e) => setEditorStock(e.target.value)} disabled={editor ? (false) : (true)} className=  {editor ? ("form-control") : ("form-control-plaintext")} value={ed_stock}></input></td>
        <td><input type="number" onChange={(e) => setEditorCat(e.target.value)} disabled={editor ? (false) : (true)} className=  {editor ? ("form-control") : ("form-control-plaintext")} value={ed_cat}></input></td>

        <td><button onClick={() => setSaveOrEditor()} type="button" className="btn btn-primary">{editor ? ("Save") : ("Edit")}</button></td>
        <td><button onClick={del_func} type="button" className="btn btn-danger">Delete</button></td>
      </tr>
    </>
  );
}

export default Product;
