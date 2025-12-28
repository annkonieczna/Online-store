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
      {/* DROPDOWN */}
        {text && (
          <div className="absolute top-12.5 w-225 bg-white border rounded-xl shadow-lg max-h-75 overflow-y-auto">
            {filteredClothes.length > 0 ? (
              filteredClothes.map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => setText("")}
                >
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.category}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400">
                No results found
              </div>
            )}
          </div>
          )}
    </>
  );
}
