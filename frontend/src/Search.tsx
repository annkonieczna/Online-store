import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [text, setText] = useState("");
  const clothes = [
  { id: 1, name: "Black Hoodie", category: "Hoodies" },
  { id: 2, name: "White T-Shirt", category: "T-Shirts" },
  { id: 3, name: "Oversized Jacket", category: "Jackets" },
  { id: 4, name: "Cargo Pants", category: "Pants" },
  { id: 5, name: "Gray Hoodie", category: "Hoodies" },
];
   const filteredClothes = clothes.filter(item =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <div></div>
      <Link to="/">
        <div className="font-bold text-[40px]  flex justify-center items-center">
          ANONYMOUS
        </div>
      </Link>
      <div className=" flex justify-center items-center ">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="   Search for clothes"
          className=" flex justify-center items-center w-225 border rounded-[20px] "
        ></input>
      </div>
      
    </>
  );
}
