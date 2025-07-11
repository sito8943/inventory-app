import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import loadable from "@loadable/component";

// layouts
import View from "./layouts/View/View";

// css
import "./App.css";

// components
import { SplashScreen } from "components";

// view

const Home = loadable(() =>
  import("views").then((module) => ({
    default: module.Home,
  }))
);
const NotFound = loadable(() =>
  import("views").then((module) => ({
    default: module.NotFound,
  }))
);
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
    <Suspense fallback={<SplashScreen />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/products/insert" element={<ProductDetailsPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
