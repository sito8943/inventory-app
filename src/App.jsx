import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import View from "./layouts/View/View";

// view
import Home from "./views/Home";
import Products from "./views/Products/Products";
import Categories from "./views/Categories/Categories";

// css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
