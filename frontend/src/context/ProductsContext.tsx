import { Children, createContext, useState } from "react";

export type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating: {rate: number}
}

type Filters = {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
}

const ProductsContext = createContext<any>(null);

export const ProductsProvider = ({Children}: any) => {
    const [products,setProducts] = useState<Product[]>([]);
    const [filters,setFilters] = useState<Filters>({
        search: "",
        category: "all",
        minPrice: 0, 
        maxPrice: 10000
    })

}