import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./components/Products";
// import Calculator from "./components/Calculator";
function App() {
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

export default App;
