import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { useProducts } from "../context/ProductsContext";
import type { Product } from "../context/ProductsContext";
import Navbar from "../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function SearchPage() {
  const {filteredProducts,setFilters} = useProducts();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")
  useEffect( () => {
    setFilters( (prev: any) => ({
      ...prev, category:category ?? ""
    })

    )
  },[category])

  return (
    <div className="p-10">
      <Navbar></Navbar>
      <div className="flex flex-row ">
        <SearchBar />
        <Filters />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {filteredProducts.map((product: Product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
  <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

    <div className="bg-gray-100 h-60 flex items-center justify-center">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain group-hover:scale-105 transition"
      />
    </div>

    <div className="p-4">
      <h3 className="text-sm font-medium line-clamp-2">
        {product.title}
      </h3>

      <p className="mt-2 text-lg font-bold text-gray-900">
        ${product.price}
      </p>
    </div>
  </div>
</Link>
        ))}
      </div>
    </div>
  );
}
