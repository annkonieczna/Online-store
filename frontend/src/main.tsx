import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search.tsx";
import Cart from "./Cart.tsx";
import SignIn from "./SignIn.tsx";
import SignUp from "./SignUp.tsx";
import Product from "./Product.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/product" element={<Product id={1} />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
