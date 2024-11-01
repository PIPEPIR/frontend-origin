"use client";

import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Toolbar from "./components/Toolbar";
import AddBtn from "./components/AddBtn";
import Link from "next/link";

export interface Product {
  id?: string;
  name: string;
  price: number | undefined;
  quantity: number | undefined;
  description?: string;
  thumbnail?: string | null;
}

export async function getProducts(
  order: "asc" | "desc" = "asc"
): Promise<Product[]> {
  try {
    const res = await fetch(`http://localhost:3001/products?order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Not found");
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts(sortOrder);
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    };

    fetchProducts();
  }, [sortOrder]);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Banner />
      <section
        className="flex flex-col justify-center mx-auto my-10 gap-4 md:gap-8"
        style={{ maxWidth: 900 }}
      >
        <h2 className="text-center text-md:text-xl">NEW ARRIVALS</h2>
        <Toolbar
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 container px-4 md:px-0 ">
            {filteredProducts.map((p: Product) => (
              <Link href={`/${p.id}`} key={p.id} className="flex">
                <Card
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  thumbnail={p.thumbnail ?? undefined}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
        <AddBtn />
      </section>
    </>
  );
}
