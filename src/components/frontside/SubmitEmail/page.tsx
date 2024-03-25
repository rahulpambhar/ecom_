import React from "react";

const Submitemail = () => {
  return (
    <div className="  grid md:grid-cols-2 bg-[#f7f5f5] py-16  gap-10 justify-center items-center px-24 ">
      <div className="flex flex-col">
        <p className="font-medium text-[40px] roboto">
          Subscribe to the newslatter
        </p>
        <p className="font-normal text-base roboto pt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sit
          mauris, tristique ultrices mauris. Consectetur eget nunc, dui
          pellentesque ultrices morbi nisl. Iaculis tempor rutrum.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="ENTER YOUR EMAIL"
          className="bg-white font-bold py-2 px-4  border-2 border-black"
        />
        <img src="/image/ArrowRight.svg" alt="" className="bg-black p-[13px]" />
      </div>
    </div>
  );
};

export default Submitemail;
