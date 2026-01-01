import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import type { Product } from "../context/ProductsContext";

export default function SearchBar() {
  const { filteredProducts, filters, setFilters } = useProducts();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative w-150">
        <input
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
            setOpen(true);
          }}
          placeholder="Search for products"
          className="w-full p-3 rounded-full border shadow focus:outline-none"
        ></input>
        {/* When it does not find matching reasults */}
        {open && filters.search && (
          <div className="absolute top-14 w-full bg-white rounded-xl shadow-lg max-h-80 overflow-auto z-50">
            {filteredProducts.length === 0 && (
              <p className="p-4 text-red-500">No results</p>
            )}
            {/* Displaying */}
            {filteredProducts.slice(0, 5).map((p: Product) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                onClick={() => setOpen(false)}
                className="flex gap-4 p-3 hover:bg-gray-100"
              >
                <img src={p.image} className="w-12 h-12 object-contain" />
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.price}$</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
