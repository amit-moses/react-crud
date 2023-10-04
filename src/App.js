import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/editor/Edit";
import Home from "./components/home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<div>no page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
