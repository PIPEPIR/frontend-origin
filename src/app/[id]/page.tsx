"use client";

import { useParams } from "next/navigation";
import DetailedCard from "../components/DetailedCard";

const DetailPage = () => {
  const { id } = useParams();
  return id && <DetailedCard productId={id as string} />;
};

export default DetailPage;
