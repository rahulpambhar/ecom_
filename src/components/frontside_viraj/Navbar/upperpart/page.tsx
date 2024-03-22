import Image from "next/image";
import React from "react";

const Uppernav = () => {
  return (
    <div className="h-[80px]  bg-black flex flex-grow items-center justify-between lg:px-10 md:px-5 px-2 ">
      <div className="">
        <Image src={"/image/logo.svg"} alt="" width={150} height={150} />
      </div>
      <div className="flex items-center md:gap-5 lg:gap-10 ">
        <div className="lg:w-[650px] md:w-[300px] h-[40px] bg-white hidden  rounded-md justify-center lg:pl-5 items-center md:flex invisible md:visible lg:visible">
          {" "}
          Everyone loves!
        </div>
        <div className=" relative flex gap-3 lg:gap-5">
          <Image src={"/image/heart.svg"} alt="" width={28} height={100} />
          <Image
            src={"/image/ShoppingCartSimple.svg"}
            alt=""
            width={28}
            height={50}
          />
          <div className="absolute -top-2 right-9  bg-white rounded-full px-2">
            0
          </div>
          <Image src={"/image/UserCircle.svg"} alt="" width={28} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Uppernav;
