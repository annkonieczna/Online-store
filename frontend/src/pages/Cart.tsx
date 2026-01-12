import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Quantity from "../components/quantity";

interface CartProduct {
  price: number;
  image: string;
  title: string;
  size: string;
  quantity: number;
  productId: number;
  stock: number;
}

export default function Cart() {
  const [productsInCart, setProductsInCart] = useState<CartProduct[]>([]);
  const [userData, setUserData] = useState({ id: 0 });
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    countTotal();
  }, [productsInCart]);

  useEffect(() => {
    if (userData.id !== 0) {
      fetchProductIds();
    }
  }, [userData.id]);
  const countTotal = () => {
    let suma = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      suma = suma + productsInCart[i].price * productsInCart[i].quantity;
    }
    setTotal(suma);
  };
  const fetchProductIds = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cart/getUsersProducts/${userData.id}`
      );
      console.log("products in cart ", response.data.data);
      if (response.data.success) {
        console.log(response.data);
        setProductsInCart(response.data.data);
      } else console.log(response.data.message || "failed to load data");
    } catch (error: any) {
      console.log(error.response?.data?.message || "error occurred");
    }
  };
  const getData = async () => {
    const raw = sessionStorage.getItem("userInfo");
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.loggedIn) setUserData(data.userData);
    }
  };
  const handleDeleteProduct = async (product: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/cart/remove/${userData.id}/${product.productId}/${product.size}`
      );
      console.log(response.data);
      if (response.data.success) {
        fetchProductIds();
      } else
        toast.error(response.data.message || "Failed to delete an opinion");
    } catch (error: any) {
      console.error("Error during deleting an opinion:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };
  const handleUpdateQuantity = async (
    product: CartProduct,
    newquantity: number
  ) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/cart/UpdateQuantity",
        {
          userId: userData.id,
          productId: product.productId,
          size: product.size,
          quantity: newquantity,
        }
      );
      if (response.data.success) {
        //fetchProductIds();

        setProductsInCart((prev) =>
          prev.map((p) =>
            p.productId === product.productId && p.size === product.size
              ? { ...p, quantity: newquantity }
              : p
          )
        );
      } else toast.error(response.data.message || "Failed to edit quantity");
    } catch (error: any) {
      console.error("Error during editing quantity:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };
  const handleCreatingOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/order/createFromCart/${userData.id}`
      );

      if (response.data.success) {
        toast.success(
          `All items ordered succesfully. Thank you for making an order!`
        );
        fetchProductIds();
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding to cart"
      );
    }
  };

  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <Navbar Shouldhover={false}></Navbar>
        <div className="cart-container">
          <div className="leftpart">
            <p>
              <b>My Selection</b> ({productsInCart.length})
            </p>
            <div hidden={productsInCart.length !== 0}>
              <p className="no-products">
                There are no products in your cart yet
              </p>
            </div>
            {productsInCart.map((product) => (
              <div
                className="product"
                style={{
                  backgroundColor:
                    product.stock === 0 ? "rgba(226, 226, 226, 1)" : "white",
                  //opacity: product.stock === 0 ? "20%" : "0%",
                }}
                key={product.productId + product.size}
              >
                <div className="smallImage">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="product-info">
                  <div className="product-header">
                    <p
                      className="product-title"
                      onClick={() => navigate(`/product/${product.productId}`)}
                    >
                      {product.title}
                    </p>
                    <div
                      className="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product);
                      }}
                    >
                      <Trash2 />
                    </div>
                  </div>

                  {/* <p
                  className="comments"
                  style={{ textDecoration: "underline" }}
                  
                >
                  View Product
                </p> */}
                  <p>Size: {product.size}</p>

                  <div className="price-quantity-row">
                    <p className="product-price">
                      {Number(product.price).toFixed(2)} $
                    </p>
                    <Quantity
                      value={product.quantity}
                      max={product.stock}
                      onChange={(newquantity) =>
                        handleUpdateQuantity(product, newquantity)
                      }
                    />
                  </div>

                  <p className="product-total">
                    {product.stock !== 0
                      ? `Total: ${(product.price * product.quantity).toFixed(
                          2
                        )}$`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="rightpart">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>Total:</b> {total.toFixed(2)} $
            </div>

            <button
              className={
                productsInCart.length > 0 ? "accept-bt" : " accept-bt_nonactive"
              }
              style={{
                width: "60%",
                justifySelf: "center",
                marginBottom: "2%",
              }}
              onClick={() => {
                if (productsInCart.length === 0) return;
                handleCreatingOrder();
              }}
            >
              Order products
            </button>
            <p
              className="comments"
              style={{
                textDecoration: "underline",
                cursor: "pointer",

                margin: "0%",
              }}
              onClick={() => navigate("/Search")}
            >
              Continue shopping
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
