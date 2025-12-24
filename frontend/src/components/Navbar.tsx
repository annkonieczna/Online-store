import { useState } from "react";
import { UserRound, Menu, Search,  ShoppingBasket  }  from 'lucide-react';

export default function Navbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <nav
        className={`navbar ${hovered ? "navbar--active" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="navbar-left">
          <button>
            <Menu /> Menu
          </button>
          <button>
            {" "}
            <Search /> Search
          </button>
        </div>
        <div>Anonimowi Alkoholicy</div>
        <div className="navbar-right">
          <button>Contact us </button>
          <button><UserRound/></button>
          <button><ShoppingBasket/></button>
        </div>
        
      </nav>
    </>
  );
}
