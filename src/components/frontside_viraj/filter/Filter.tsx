import React from "react";

const Filter = () => {
  return (
    <div className="flex  justify-between items-center border-b-2 ">
      <div className="flex justify-center items-center">
        <div className="flex justify-between w-[322px] border-r-2 py-[22px]">
          <div className="text-xl font-bold poppins uppercase pl-16">
            FILTERS :
          </div>
          <div className="flex justify-center items-center text-sm pr-6 font-light poppins uppercase">
            CLEAR ALL
          </div>
        </div>
        <div className="flex gap-5 pl-5">
          <div className="bg-[#CFCFCF] py-2 px-6 rounded-full flex gap-3 ">
            <span>Price</span>
            <button>X</button>
          </div>
          <div className="bg-[#CFCFCF] py-2 px-6 rounded-full flex gap-3 ">
            <span>In Stock</span>
            <button>X</button>
          </div>
        </div>
      </div>
      <div className="flex gap-10 text-base roboto bg-[#F7F7F7] border-l-2 py-6 px-7">
        <div>
          {" "}
          <span className="font-normal pr-3">Sort by:</span>
          <span className="font-bold">Price, High To Low</span>
        </div>
        <img src="/image/downarrow.svg" alt="" />
      </div>
    </div>
  );
};

export default Filter;
