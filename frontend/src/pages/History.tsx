import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Order {
  orderId: number;
  createdAt: string;
  total: number;
  items: OrderItem[];
}
interface OrderItem {
  productId: number;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}
export default function History() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userData, setUserData] = useState<{ id: number; name?: string }>({
    id: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem("userInfo");
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.loggedIn) setUserData(data.userData);
    }
  }, []);

  useEffect(() => {
    if (userData.id !== 0) fetchOrders();
  }, [userData.id]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/order/history/${userData.id}`
      );
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load order history");
    }
  };

  return (
    <div>
      <Navbar Shouldhover={false} />
      <div style={{ minHeight: "100vh" }}>
        <div className="cart-container">
          <div className="leftpart">
            <p>
              <b>{userData.name ?? "My"} Orders</b> ({orders.length})
            </p>

            {orders.length === 0 && (
              <p className="no-products">You haven’t placed any orders yet</p>
            )}

            {orders.map((order) => (
              <div key={order.orderId} className="order-box">
                {/* header*/}
                <div className="order-header">
                  <div>
                    <b>Order #{order.orderId}</b>
                    <p className="comments">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Products*/}
                {order.items.map((item) => (
                  <Link to={`/product/${item.productId}`}>
                    <div className="product" key={item.productId + item.size}>
                      <div className="smallImage">
                        <img src={item.image} alt={item.title} />
                      </div>

                      <div className="product-info">
                        <p
                          className="product-title"
                          onClick={() => navigate(`/product/${item.productId}`)}
                        >
                          {item.title}
                        </p>

                        <p>Size: {item.size}</p>

                        <div className="price-quantity-row">
                          <p className="product-price">
                            {Number(item.price).toFixed(2)} $
                          </p>
                          <p>x {item.quantity}</p>
                        </div>

                        <p className="product-total">
                          Total:{" "}
                          {(Number(item.price) * item.quantity).toFixed(2)} $
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="order-footer">
                  <b>Total:</b> {Number(order.total).toFixed(2)} $
                </div>
              </div>
            ))}
          </div>

          <div className="right">
            <button
              className="continue-btn"
              onClick={() => navigate("/Search")}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
