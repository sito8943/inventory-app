import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import View from "./layouts/View/View";

// view
import Home from "./views/Home";

// css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
