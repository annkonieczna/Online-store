import { useState } from "react";
import { UserRound, Menu, Search,  ShoppingBasket  }  from 'lucide-react';

export default function Navbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <nav
        className={`navbar ${hovered ? "navbar--active" : ""} flex flex-row justify-between`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="navbar-left  flex flex-row"  >
          <button className="button cursor-pointer  flex flex-row">
            <Menu /> Menu
          </button>
          <button className="button cursor-pointer flex flex-row">
            <Search /> Search
          </button>
        </div>
        <div>Anonimowi Alkoholicy</div>
        <div className="navbar-right flex flex-row">
          <button className="cursor-pointer">Contact us </button>
          <button><UserRound className="cursor-pointer"/></button>
          <button><ShoppingBasket className="cursor-pointer"/></button>
        </div>
        
      </nav>
    </>
  );
}
