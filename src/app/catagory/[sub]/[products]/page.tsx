"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Cart from "@/components/Cart";
import ProductPreview from "../../../../components/ProductPreview";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { actionTocartFunc } from '../../../redux/slices/cartSclice';
import { isLoginModel } from '../../../redux/slices/utilSlice';
import { setOpenCart } from '../../../redux/slices/utilSlice';
import { useParams } from 'next/navigation'
import { Categories, SubCategory, Product } from "../../../../../types/global";
import { toast } from "react-hot-toast"
import { errorToast, successToast } from "@/components/toster";

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data: session, status }: any = useSession();
  const [openPreview, setOpenPreview] = useState(false);
  const [priview, sePriview] = useState < Product > ({} as Product)

  const cart = useAppSelector((state) => state?.cartReducer?.cart?.CartItem) || [];
  const openCart = useAppSelector((state) => state?.utilReducer?.openCart);
  const categories: Categories[] = useAppSelector((state): any => state?.categories?.categories);
  const subCategories: SubCategory[] = categories.filter((item): item is Categories => item?.name === params.sub).flatMap((category) => category?.SubCategory);
  const products: Product[] = subCategories.filter((item): item is SubCategory => item?.name === params.products).flatMap((sub) => sub.products);

  const addToCartFunction = async (id: string) => {
    const payload = { productId: id, action: "add" }
    const data = await dispatch(actionTocartFunc(payload))

    if (data.payload.st) {
      successToast(data?.payload.msg)

    } else {
      errorToast(data.payload.msg)
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-[50px] sm:py-24 md:px-[100px] lg:max-w-7xl lg:px-[130px]">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product: Product, i) => (

              <div key={i} className="" >
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {/* <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />  */}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  {
                    session && cart?.find((item: any) => item?.productId === product.id) ?
                      <button
                        className="border text-xs rounded-full border-lime-400 w-full px-2 py-1 hover:border-rose-800 text-black"
                        onClick={() => {
                          session ? dispatch(setOpenCart(!openCart)) : ""
                        }}
                      >
                        Open cart
                      </button> :
                      <button
                        className="border text-xs rounded-full border-lime-400 w-full px-2 py-1 hover:border-rose-800 text-black"
                        onClick={() => {
                          session ? addToCartFunction(product.id) : dispatch(isLoginModel(true));
                        }}
                      >
                        Add to cart
                      </button>
                  }
                  <button className="border text-xs rounded-full border-green-400 px-2 py-1 hover:border-green-800 text-black">
                    Buy
                  </button>

                  <button
                    className="border rounded-full text-xs border-indigo-400 px-2 py-1 hover:border-amber-800 text-black"
                    onClick={() => {
                      sePriview(product)
                      setOpenPreview(!openPreview)
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
      <Cart />
      <ProductPreview
        openPreview={openPreview}
        product={priview}
        setOpenPreview={setOpenPreview}
      />
    </div >
  );
};

export default Page;
