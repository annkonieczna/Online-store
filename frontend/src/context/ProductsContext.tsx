import { Children, createContext, useEffect, useState } from "react";

export type Product = {
  id: number;
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

export const ProductsProvider = ({ Children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    fetch("https://fakestoreapiserver.reactbd.org/api/products")
        .then(res => res.json())
        .then(setProducts);
    },[]);

    const filteredProducts = products.filter(p => {
        p.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category === "all" || p.category === filters.category) && 
        (p.price >= filters.minPrice && p.price <= filters.maxPrice)
    })
};

