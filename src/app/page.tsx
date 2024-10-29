import Banner from "./components/Banner";
import Card from "./components/Card";
import Toolbar from "./components/Toolbar";
import AddBtn from "./components/AddBtn";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  thumbnail?: string;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3001/products/");
  const data = await res.json();

  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Banner />
      <section
        className="flex flex-col justify-center mx-auto my-10 gap-4 md:gap-8"
        style={{ maxWidth: 900 }}
      >
        <h2 className="text-center text-md:text-xl">NEW ARRIVALS</h2>
        <Toolbar />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 container px-4 md:px-0 ">
          {products &&
            products.map((p: Product) => {
              return (
                <Card id={p.id} name={p.name} price={p.price} key={p.id} />
              );
            })}
        </div>
        <AddBtn />
      </section>
    </>
  );
}
