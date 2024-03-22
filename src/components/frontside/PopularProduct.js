import Image from "next/image";
import Title from "./Title";
import Background from "/public/Image-container.png";
import PopularCard from "./PopularCard";
import ButtonCustom from "./ButtonCustom";
const PopularProduct = () => {
  return (
    <>
      <div className="py-10 h-screen mb-5">
        {/* <Image
          src={Background}
          width={200}
          height={200}
          alt=""
          className="absolute left-0 top-[20%]"
        /> */}
        <div className="text-center">
          <Title title="Popular Products" />
        </div>
        <div className="p-1 z-50 py-10 backgroundImage flex gap-5 px-20 overflow-x-scroll mb-5">
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
        </div>
        <div className="flex justify-center items-center">
          <ButtonCustom name="Explore all items" />
        </div>
      </div>
    </>
  );
};

export default PopularProduct;
