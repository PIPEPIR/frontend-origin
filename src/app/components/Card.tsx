"use client";

import React, { ReactElement } from "react";
import Image from "next/image";

interface CardsProps {
  thumbnail?: string | undefined;
  price: number | undefined;
  name: string | undefined;
  id: string | undefined;
}

const Card = ({
  thumbnail,
  price = 0,
  name = "None",
  id = "0",
}: CardsProps): ReactElement => {
  return (
    <div className="border flex-grow flex flex-col ">
      <div className="h-[234px]">
        <Image
          src={thumbnail ?? "/No-Image-Placeholder.svg"}
          alt={id}
          width={234}
          height={234}
          className="h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-2 flex-grow justify-between">
        <p className="body-2 ">{name}</p>
        <p className="title-1">฿ {price}</p>
      </div>
    </div>
  );
};

export default Card;
