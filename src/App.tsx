import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import loadable from "@loadable/component";

// layouts
import View from "./layouts/View/View";

// css
import "./App.css";

// view
import Home from "./views/Home";

const Products = loadable(() =>
  import("views").then((module) => ({
    default: module.Products,
  }))
);
const Categories = loadable(() =>
  import("views").then((module) => ({
    default: module.Categories,
  }))
);
const Movements = loadable(() =>
  import("views").then((module) => ({
    default: module.Movements,
  }))
);
const ProductDetailsPage = loadable(() =>
  import("views").then((module) => ({
    default: module.ProductDetailsPage,
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
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movements" element={<Movements />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
