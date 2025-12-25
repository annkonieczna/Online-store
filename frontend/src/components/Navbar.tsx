import { useState } from "react";
import { UserRound, Menu, Search,  ShoppingBasket  }  from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <nav
        className={`navbar ${hovered ? "bg-white border-t-2  border-b-2 border-black border-solid transition ease-in-out transform-[3s] " : "bg-transparent"} flex flex-row justify-between`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="navbar-left  flex flex-row ml-5 mt-5 gap-3.75"  >
          <button className="button cursor-pointer  flex flex-row ">
            <Menu /> Menu
          </button>
          <Link to="/search">
          <button className="button cursor-pointer flex flex-row" >
            <Search /> Search
          </button>
          </Link>
        </div>
        <div className="font-bold text-[40px]">ANONYMOUS</div>
        <div className="navbar-right flex flex-row mr-5  gap-3.75">
          <button className="cursor-pointer">Contact us </button>
          <button><UserRound className="cursor-pointer"/></button>
          <button><ShoppingBasket className="cursor-pointer"/></button>
        </div>
        
      </nav>
    </>
  );
}
