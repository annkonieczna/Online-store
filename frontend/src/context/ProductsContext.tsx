import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  _id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
};

type Filters = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: "price-asc" | "price-desc" | "title-asc" | "title-desc" | "";
};

const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    sort: "",
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

  const filteredProducts = [...products]
    .filter((p) => {
      return (
        p.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category === "" || p.category === filters.category) &&
        p.price >= filters.minPrice &&
        p.price <= filters.maxPrice
      );
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;

        case "price-desc":
          return b.price - a.price;

        case "title-asc":
          return a.title.localeCompare(b.title);

        case "title-desc":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
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
