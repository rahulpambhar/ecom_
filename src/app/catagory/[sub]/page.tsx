
'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { useParams } from 'next/navigation'
import CategoryCard from '../../../components/frontside/CategoryCard';
import { Categories, SubCategory } from "../../../../types/global";


const Page = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const categories: Categories[] = useAppSelector((state): any => state?.categories?.categories);
  const subCategories: SubCategory[] = categories.filter((item: any) => item?.name === params.sub).flatMap((category: any) => category.SubCategory);


  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 100 }));
  }, [dispatch]);


  return (
    <>
      <div className="grid grid-cols-1 mt-[60px] gap-10 px-5 sm:grid-cols-2 sm:px-[100px] md:px-[150px] md:grid-cols-4 lg:xl:">

        {subCategories.map((item, key) => (
          <div key={key}>
            <Link href={`/catagory/${params.sub}/${item.name}`} className="">
              <CategoryCard name={item?.name} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
