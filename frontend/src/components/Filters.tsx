import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { Funnel } from "lucide-react";

export default function Filters() {
  const { filters, setFilters } = useProducts();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative ml-auto">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex cursor-pointer flex-row px-4 py-2 border rounded-md hover:bg-black hover:text-white transition"
        >
          <Funnel className="mr-1.25" /> Filter
        </div>

        {open && (
          <div className="absolute top-full right-0 mt-2 flex gap-6 items-end p-4 border rounded-xl shadow-sm bg-white z-50">
            {/* category */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="border rounded-md p-2"
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            {/* min price */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">
                Min price ($)
              </label>
              <input
                type="number"
                value={filters.minPrice}
                min={0}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: Number(e.target.value) })
                }
                className="border rounded-md p-2 w-28"
              />
            </div>

            {/* max price */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">
                Max price ($)
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                min={0}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="border rounded-md p-2 w-28"
              />
            </div>

            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  category: "all",
                  minPrice: 0,
                  maxPrice: 10000,
                })
              }
              className="px-4 py-2 border rounded-md hover:bg-black hover:text-white transition"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
