import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import loadable from "@loadable/component";

// layouts
import View from "./layouts/View/View";

// css
import "./App.css";

// view
import Home from "./views/Home";

const Products = loadable(() => import("./views/Products/Products"));
const Categories = loadable(() => import("./views/Categories/Categories"));
const Movements = loadable(() => import("./views/Movements/Movements"));
const ProductDetailsPage = loadable(() =>
  import("components").then((module) => ({
    default: module.HtmlInput,
  }))
);

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movements" element={<Movements />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
