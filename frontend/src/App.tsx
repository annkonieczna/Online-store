import "./index.css";
import Mainpage from "./pages/MainPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search.tsx";
import Cart from "./pages/Cart.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Product from "./pages/Product.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/product" element={<Product id={1} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
