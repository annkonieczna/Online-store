import { useEffect, useState } from "react";
import { UserRound, Menu, Search, ShoppingBasket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Navbar({ Shouldhover }: { Shouldhover: boolean }) {
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
        className={` ${
          Shouldhover
            ? hovered
              ? "bg-white border-t  border-b border-black border-solid transition ease-in-out transform-[3s] "
              : "bg-transparent"
            : ""
        } flex flex-row justify-between mb-2.5`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="navbar-left  flex flex-row ml-5 mt-5 gap-3.75">
          <Popover>
  <PopoverTrigger asChild>
    <button className="button cursor-pointer flex flex-row items-center gap-2 mb-4.25">
      <Menu />
      Menu
    </button>
  </PopoverTrigger>

  <PopoverContent
    side="bottom"
    align="start"
    className="w-48 p-2 rounded-2xl shadow-lg"
  >
    <div className="flex flex-col gap-1">
      <Link
        to="/search?category=women"
        className="px-3 py-2 rounded-xl hover:bg-muted transition"
      >
        Women
      </Link>

      <Link
        to="/search?category=men"
        className="px-3 py-2 rounded-xl hover:bg-muted transition"
      >
        Men
      </Link>

      <Link
        to="/search?category=kids"
        className="px-3 py-2 rounded-xl hover:bg-muted transition"
      >
        Kids
      </Link>
    </div>
  </PopoverContent>
</Popover>

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
          <Link to={!userData ? "/SignIn" : "/MyProfile"}>
            <button className=" flex flex-row cursor-pointer">
              <UserRound />
              Profile
            </button>
          </Link>
          <Link to={userData ? "/cart" : "/SignIn"}>
            {" "}
            <button className="mr-5">
              <ShoppingBasket className="cursor-pointer flex flex-row" />
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
