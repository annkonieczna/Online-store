import { useEffect, useState } from "react";
import { UserRound, Menu, Search, ShoppingBasket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    getData();
  }, [location]);
  const getData = async () => {
    const raw = sessionStorage.getItem("userInfo");
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.loggedIn) setUserData(data.userData);
    }
  };

  return (
    <>
      <nav
        className={`navbar ${
          hovered
            ? "bg-white border-t  border-b border-black border-solid transition ease-in-out transform-[3s] "
            : "bg-transparent"
        } flex flex-row justify-between mb-2.5`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="navbar-left  flex flex-row ml-5 mt-5 gap-3.75">
          <button className="button cursor-pointer  flex flex-row ">
            <Menu /> Menu
          </button>
          <Link to="/search">
            <button className="button cursor-pointer flex flex-row">
              <Search /> Search
            </button>
          </Link>
        </div>
        <Link to={"/"}>
          <div className="font-bold text-[40px]">ANONYMOUS</div>
        </Link>
        <div className="navbar-right flex flex-row mr-5 mt-5 gap-3.75">
          <Link to={"/ContactUs"}>
            <div>
              <button className="cursor-pointer">Contact us </button>
            </div>
          </Link>
          <Link to={!userData ? "/SignIn" : "/MyProfile"}>
            <button>
              <UserRound className="cursor-pointer" />
            </button>
          </Link>
          <Link to={userData ? "/cart" : "/SignIn"}>
            {" "}
            <button>
              <ShoppingBasket className="cursor-pointer flex flex-row" />
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
