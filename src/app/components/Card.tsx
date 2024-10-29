import React, { ReactElement } from "react";
import Image from "next/image";

interface CardsProps {
  thumbnail?: string;
  price: number;
  name: string;
  id: string;
}

const Card = ({
  thumbnail,
  price = 0,
  name = "None",
  id = "0",
}: CardsProps): ReactElement => {
  return (
    <div className="border">
      <div>
        <Image
          src="/No-Image-Placeholder.svg"
          alt={id}
          width={234}
          height={234}
        />
      </div>
      <div className="p-6 flex flex-col gap-2">
        <p className="body-2">{name}</p>
        <p className="title-1">฿ {price}</p>
      </div>
    </div>
  );
};

export default Card;
