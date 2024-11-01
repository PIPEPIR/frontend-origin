import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  name: string;
}
const Breadcrumb = ({ name }: BreadcrumbProps) => {
  return (
    <div>
      <Link href="/">
        <span className="body-2">
          {"Home"}{" "}
          <Image
            className="inline"
            src="/next.png"
            alt="next-icon"
            width={10}
            height={10}
          />{" "}
        </span>
      </Link>
      <span className="body-2 opacity-45">{name}</span>
    </div>
  );
};

export default Breadcrumb;
