import React, { useEffect, useState } from "react";
import { Product } from "../page";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/navigation";

interface DetailedCardsProps {
  productId: string;
}

const DetailedCard = ({ productId }: DetailedCardsProps) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${productId}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      router.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols md:grid-cols-2 items-start justify-center gap-4 mb-28 max-w-screen-lg mt-8 px-4">
      <div className="grid grid-row-2 ">
        <Breadcrumb name={product?.name ?? ""} />
        <Image
          src={product?.thumbnail ?? "/No-Image-Placeholder.svg"}
          alt="placeholder-image"
          width={483}
          height={483}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col gap-6 mt-5">
        <h3>{product?.name}</h3>
        <h1>฿ {product?.price}</h1>
        <p className="body-2">{product?.description}</p>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="flex justify-center items-center bg-primary-50 text-white text-sm py-2 px-4 hover:bg-primary-60 transition duration-200"
            onClick={() => router.push(`/addeditproduct/${productId}`)}
          >
            <Image
              src="/edit.svg"
              alt="edit-icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Edit
          </button>
          <button
            className="flex border border-red-500 text-sm py-2 px-4 text-red-500 hover:bg-red-600 hover:text-white"
            onClick={handleDelete}
          >
            <Image
              src="/trash.svg"
              alt="delete-icon"
              width={16}
              height={16}
              className="mr-2"
            />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
