import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
function Edit() {
  return (
    <>
      <div className="container">
        <Header text="Products app" subtext={3} />
        {/* <Calculator /> */}
        <div className="row col-md-12">
          <Products />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Edit;
