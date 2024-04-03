
'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { useParams } from 'next/navigation'
import CategoryCard from '../../../components/frontside/CategoryCard';
import { Categories, SubCategory } from "../../../../types/global";
import Breadcrumb from "@/components/admin/breadcrumb";

import Makeupnailscard from "@/components/frontside/makeup_nails_card/Makeupnailscard";
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

const Page = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const products: any[] = useAppSelector((state): any => state?.categories?.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentpage = products.slice(firstPostIndex, lastPostIndex);
  const nopage = Math.ceil(products.length / postPerPage);
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className=" pt-5 border-l-2  ">
        <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 pt-5  justify-center items-center">
          {products.length > 0
            ? currentpage.map((item, index) => (
              <Makeupnailscard
                key={index}
                item={item}
              />
            ))
            : ""}
        </div>
        <div className="flex mt-10 justify-center items-center border-t-2">
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
                    className={`flex justify-center items-center w-8 h-8 rounded-full hover:bg-black hover:text-white ${isCurrentPage ? "bg-black  text-white" : ""
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
            <span className="text-lg font-bold roboto uppercase bg-[#ece7e7] w-[320px] py-6 flex justify-center items-center"
              onClick={() => nextpage()}            >
              Next
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
