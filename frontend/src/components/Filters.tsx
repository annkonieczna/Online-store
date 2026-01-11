import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Funnel } from "lucide-react";
import { useProducts } from "../context/ProductsContext";

const MAX_PRICE = 1000;

export default function Filters() {
  const { filters, setFilters } = useProducts();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto gap-2 rounded-xl">
          <Funnel className="h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 rounded-xl space-y-4 bg-white text-black shadow-xl border">
        {/* Category */}
        <div>
          <p className="text-sm font-medium mb-2">Category</p>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                category: value === "all" ? "" : value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* price slider */}
        <div>
          <p className="text-sm font-medium mb-2">
            Price range: ${filters.minPrice} – ${filters.maxPrice}
          </p>

          <Slider
            min={0}
            max={MAX_PRICE}
            step={10}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) =>
              setFilters({
                ...filters,
                minPrice: min,
                maxPrice: max,
              })
            }
            className="mt-4"
          />
        </div>

        <Separator />

        {/* sort */}
        <div>
          <p className="text-sm font-medium mb-2">Sort</p>
          <Select
            value={filters.sort || "default"}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                sort: value === "default" ? "" : (value as any),
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price ↑</SelectItem>
              <SelectItem value="price-desc">Price ↓</SelectItem>
              <SelectItem value="title-asc">Name A–Z</SelectItem>
              <SelectItem value="title-desc">Name Z–A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() =>
            setFilters({
              search: "",
              category: "",
              minPrice: 0,
              maxPrice: MAX_PRICE,
              sort: "",
            })
          }
        >
          Reset filters
        </Button>
      </PopoverContent>
    </Popover>
  );
}
