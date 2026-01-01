import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { useProducts } from "../context/ProductsContext";
import type { Product } from "../context/ProductsContext";
import Navbar from "../components/Navbar";

export default function SearchPage() {
  const { filteredProducts } = useProducts();

  return (
    <div className="p-10">
      <Navbar></Navbar>
      <div className="flex flex-row ">
        <SearchBar />
        <Filters />
      </div>

      <div className="flex flex-row flex-wrap gap-6 mt-8">
        {filteredProducts.map((product: Product) => (
          <>
            <div
              key={product.id}
              className="border p-3 rounded flex flex-col w-50 h-50"
            >
              <div className="flex items-center justify-center mt-2.5">
                <img src={product.image} className="w-25 h-35 "></img>
              </div>
              <div className="flex justify-center items-center flex-wrap">{product.title}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
