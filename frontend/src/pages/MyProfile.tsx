import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { History, ShoppingBasket } from "lucide-react";

const MyProfile = () => {
  const [userData, setUserData] = useState({ email: "" });
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const raw = sessionStorage.getItem("userInfo");
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.loggedIn) setUserData(data.userData);
    }
  };
  const clearSession = () => {
    sessionStorage.clear();
    setUserData({ email: "" });
    navigate("/");
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://png.pngtree.com/background/20250109/original/pngtree-abstract-background-black-and-white-simple-modern-elegant-premium-picture-image_15505127.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Navbar Shouldhover={false}></Navbar>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",

          borderRadius: "15px",
          marginLeft: "10%",
          marginRight: "10%",
          padding: "1%",
        }}
      >
        <p
          style={{
            fontSize: "170%",
            fontWeight: "inherit",
            display: "flex",
            justifyContent: "center",
          }}
        >
          It's good to see you again
        </p>
        <p
          style={{
            fontSize: "170%",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {userData.email}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "5%",
          }}
        >
          <Link to="/History">
            <div className="box">
              My History
              <History
                style={{
                  width: "8vw",
                  height: "8vw",
                  justifySelf: "center",
                  margin: "10%",
                }}
              />
            </div>
          </Link>
          <Link to="/cart">
            <div className="box">
              My Cart{" "}
              <ShoppingBasket
                style={{
                  width: "8vw",
                  height: "8vw",
                  justifySelf: "center",
                  margin: "10%",
                }}
              />
            </div>
          </Link>
          <div className="box">tu sie jeszcze cos wymysli</div>
        </div>

        <button
          style={{ justifySelf: "center" }}
          className="accept-bt"
          onClick={() => clearSession()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
export default MyProfile;
