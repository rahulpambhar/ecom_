"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Makeupnailscard = ({
  image,
  label,
  discription,
}: {
  image: string;
  label: string;
  discription: string;
}) => {
  const [like, setLike] = useState(false);

  const handelike = () => {
    setLike(!like);
  };
  return (
    <>
      <div className="relative  w-[260px] mx-5 my-3 bg-white pb-5  hover:shadow-2xl">
        <div className="flex justify-end absolute top-2 right-0 pr-5 ">
          <button onClick={handelike}>
            {like ? (
              <FaHeart className="w-7 h-7 text-red-500" />
            ) : (
              <FaRegHeart className="w-7 h-7 " />
            )}
          </button>
        </div>

        <div className=" flex justify-center items-center pt-5">
          <img src={image} alt={label} />
        </div>
        <p className="text-lg poppins font-medium pt-5">
          <label
            htmlFor=""
            className=" flex justify-center items-center gap-3 robto"
          >
            {label}
          </label>
        </p>
        <p className="text-sm  flex justify-center items-center gap-1 roboto">
          <FaStar className="w-3 h-3" />
          {discription}
        </p>
        <div className=" justify-center items-center pt-3  relative transition group mx-2">
          <button className=" py-3  border-black border poppins  text-base font-bold w-full">
            ₹263
          </button>
          <button className=" py-3 absolute left-0 border-black border poppins  text-base font-bold opacity-0 group-hover:opacity-100  w-full bg-black text-white">
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default Makeupnailscard;
