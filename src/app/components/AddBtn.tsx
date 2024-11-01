"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/addeditproduct");
  };
  return (
    <button
      className="bg-grey-60 bg-opacity-30 p-3 hover:bg-opacity-100 rounded-xl text-lg justify-items-center"
      onClick={handleClick}
    >
      <Image
        src={"/plus-svgrepo-com.svg"}
        width={24}
        height={24}
        alt="plus-icon"
      />
    </button>
  );
};

export default AddBtn;
