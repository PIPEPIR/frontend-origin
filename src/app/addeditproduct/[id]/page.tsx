"use client";

import React from "react";
import AddEditProduct from "../page";
import { useParams } from "next/navigation";

const EditPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <AddEditProduct productId={id as string} />
    </>
  );
};

export default EditPage;
