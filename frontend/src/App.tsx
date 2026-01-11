import "./index.css";
import "leaflet/dist/leaflet.css";

import Mainpage from "./pages/MainPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Product from "./pages/Product.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import History from "./pages/History.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
function App() {
  return (
    <>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/ContactUs" element={<ContactUs />}></Route>
            <Route element={<ProtectedRoute/>}> 
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/MyProfile" element={<MyProfile />}></Route>
            <Route path="/History" element={<History />}></Route>
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            theme="colored"
            closeOnClick
          ></ToastContainer>
        </BrowserRouter>
      </ProductsProvider>
    </>
  );
}

export default App;
