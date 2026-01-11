import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProducts, type Product } from "../context/ProductsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const { filteredProducts, filters, setFilters } = useProducts();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-250 mt-0.75 ">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
            setOpen(true);
          }}
          placeholder="Search products..."
          className="pl-9 rounded-xl shadow-sm"
        />
      </div>
      {/* When it does not find matching reasults */}
      {open && filters.search && (
        <div className="absolute mt-2 w-full rounded-xl border bg-white shadow-lg z-50">
          {filteredProducts.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              No results found
            </p>
          )}
          {/* Displaying */}
          {filteredProducts.slice(0, 5).map((p: Product) => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted"
            >
              <img src={p.image} className="h-10 w-10 object-contain" />
              <div>
                <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                <p className="text-sm text-muted-foreground">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
