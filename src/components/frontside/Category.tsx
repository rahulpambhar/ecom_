"use client";
import Image from "next/image";
import Title from "./Title";
import Search from "/public/resources(19).png";
import Link from "next/link";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/app/redux/slices/categorySlice';

const Category = () => {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (

    <>
      <div className="px-5 pt-20 pb-10 ssm:px-[50px] md:px-[100px] lg:px-[150px]">
        <Title title="Explore by Category" />
        <div className="flex justify-between items-center my-5">
          <div className="bg-[#F0F0F0] flex justify-start items-center gap-1 rounded-lg overflow-hidden pl-2">
            <Image src={Search} width={20} height={20} alt="" />
            <input
              className=" p-2  bg-[#F0F0F0] min-w-[110px] focus:outline-none"
              placeholder="Search"
            />
          </div>
          {/* <Image src={Hamburger} width={20} height={20} alt="" /> */}
        </div>
        <div className="grid grid-cols-1 gap-y-5 py-10 ssm:grid-cols-2 ssm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {/* {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))} */}

          {categories?.map((ele) => (
            <div
              className="bg-[#D9D9D9] relative w-[288px] h-[211px] rounded-lg flex justify-center items-center cursor-pointer hover:bg-[#ADADAD] ssm:w-auto "
              key={ele.id}
            >
              <Link href={`catagory/${ele.name}`} className="">
                <p className="text-[var(--primary5)] text-center">
                  <Title title={ele.name} />
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};

export default Category;
