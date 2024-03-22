"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Lowernav = () => {
  const router = useRouter();

  const handleClick = () => {
    // Redirect to the home page
    router.push("/Mackup/Nail");
  };
  return (
    <div className=" h-[60px] flex items-center justify-center md:justify-between md:px-[60px]">
      <div className=" flex pl-3 gap-5 md:gap-10 ">
        <button
          className="w-[80px] h-[30px] font-semibold md:h-[40px] md:w-[119px] uppercase md:font-bold hover:bg-black hover:text-white rounded-full"
          onClick={handleClick}
        >
          nail paint
        </button>
        <button className="w-[80px] h-[30px] font-semibold md:h-[40px] md:w-[119px] uppercase md:font-bold hover:bg-black hover:text-white rounded-full">
          makeup
        </button>
        <button className="w-[80px] h-[30px] font-semibold md:h-[40px] md:w-[119px] uppercase md:font-bold hover:bg-black hover:text-white rounded-full">
          makeup
        </button>
      </div>
      <div className="relatives  hidden md:flex ">
        <Image
          src={"/image/offer.svg"}
          alt=""
          width={130}
          height={110}
          className=" "
        />
        <span className="absolute text-white md:top-[95px] md:right-24 font-bold uppercase">
          OFFERS
        </span>
      </div>
    </div>
  );
};

export default Lowernav;
