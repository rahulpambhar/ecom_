"use client";

import Makeupnailscard from "@/components/frontside_viraj/makeup_nails_card/Makeupnailscard";
import React, { useState } from "react";

const Topselectionitem = [
  {
    id: 1,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 2,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 3,
    image: "/image/makeup_nail.svg",
    label: "Third Item",
    description: "4.4  (57,164)",
  },
  {
    id: 4,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 5,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 6,
    image: "/image/makeup_nail.svg",
    label: "Third Item",
    description: "4.4  (57,164)",
  },
  {
    id: 7,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 8,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 9,
    image: "/image/makeup_nail.svg",
    label: "Third Item",
    description: "4.4  (57,164)",
  },
  {
    id: 10,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 12,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 13,
    image: "/image/makeup_nail.svg",
    label: "Third Item",
    description: "4.4  (57,164)",
  },
  {
    id: 14,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 15,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 16,
    image: "/image/makeup_nail.svg",
    label: "Third Item",
    description: "4.4  (57,164)",
  },
  {
    id: 17,
    image: "/image/makeup_nail.svg",
    label: "Product External",
    description: "4.4  (57,164)",
  },
  {
    id: 18,
    image: "/image/makeup_nail.svg",
    label: "Second Item",
    description: "4.4  (57,164)",
  },
  {
    id: 19,
    image: "/image/makeup_nail.svg",
    label: "Third Item",

    description: "4.4  (57,164)",
  },
];

const Nails = () => {
  const [finds, setFinds] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentpage = Topselectionitem.slice(firstPostIndex, lastPostIndex);
  const nopage = Math.ceil(Topselectionitem.length / postPerPage);
  const numbers = Array.from({ length: nopage }, (_, index) => index + 1);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const prepage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextpage = () => {
    if (currentPage !== nopage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className=" pt-5 border-l-2  ">
      <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 pt-5  justify-center items-center">
        {Topselectionitem.length > 0
          ? currentpage.map((item, index) => (
              <Makeupnailscard
                key={item.id}
                image={item.image}
                label={item.label}
                discription={item.description}
              />
            ))
          : ""}
      </div>
      <div className="flex mt-10 justify-center items-center border-t-2">
        {/* <div className="text-lg font-bold roboto uppercase bg-[#ece7e7] w-[320px] py-6 flex justify-center items-center">
          {" "}
          PREVIOUS
        </div>
        <div className="flex flex-grow gap-5 justify-center items-center text-lg font-bold poppins">
          <p className="bg-black text-white w-8 h-8 rounded-full flex justify-center items-center">
            1
          </p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>.....</p>
          <p>10</p>
        </div>
        <div className="text-lg font-bold roboto uppercase bg-[#ece7e7] w-[320px] py-6 flex justify-center items-center">
          {" "}
          next
        </div> */}

        <button>
          {" "}
          <span
            className="text-lg font-bold roboto uppercase bg-[#ece7e7] w-[320px] py-6 flex justify-center items-center"
            onClick={() => prepage()}
          >
            Previous
          </span>
        </button>
        <div className="flex flex-grow gap-5 justify-center items-center text-lg font-bold poppins">
          {numbers.map((num) => {
            const isCurrentPage = currentPage === num;
            const isWithinRange =
              num >= currentPage - 1 && num <= currentPage + 1;

            if (isWithinRange || isCurrentPage || num === 1 || num === nopage) {
              return (
                <div
                  key={num}
                  onClick={() => paginate(num)}
                  className={`flex justify-center items-center w-8 h-8 rounded-full hover:bg-black hover:text-white ${
                    isCurrentPage ? "bg-black  text-white" : ""
                  }`}
                >
                  {num}
                </div>
              );
            }

            return null;
          })}
        </div>
        <button>
          <span
            className="text-lg font-bold roboto uppercase bg-[#ece7e7] w-[320px] py-6 flex justify-center items-center"
            onClick={() => nextpage()}
          >
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default Nails;
