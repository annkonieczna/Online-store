import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  _id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number };
};

type Filters = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};

const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    fetch("https://fakestoreapiserver.reactbd.org/api/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setProducts([]);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.category === "all" || p.category === filters.category) &&
      p.price >= filters.minPrice &&
      p.price <= filters.maxPrice
    );
  });

  return (
    <>
      <ProductsContext.Provider
        value={{ products, filteredProducts, filters, setFilters }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
};
export const useProducts = () => useContext(ProductsContext);
