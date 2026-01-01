import "./index.css";
import Mainpage from "./pages/MainPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Product from "./pages/Product.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import { ProductsProvider } from "./context/ProductsContext.tsx";
function App() {
  return (
    <>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/product" element={<Product id={1} />}></Route>
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </>
  );
}

export default App;
