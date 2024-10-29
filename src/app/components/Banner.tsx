import pic from "../../../public/banner.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex justify-center m-4 md:my-8">
      <Image src={pic} alt="image" width={920} />
    </div>
  );
};

export default Banner;
