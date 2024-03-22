"use client";

import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import { isLoginModel, setOpenCart } from '../app/redux/slices/utilSlice'
import { createTempOrderFunc, createOrderFunc } from '../../redux/slices/orderSlices';
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast"
import { errorToast, successToast } from '@/components/toster';
// import { successToast, errorToast } from './toster';

export default function Checkout() {
    const { data: session, status }: any = useSession();
    let [subTotal, setSubTotal] = useState(0)
    const dispatch = useAppDispatch();
    const router = useRouter()
    const openCart = useAppSelector((state) => state?.utilReducer?.openCart);
    const cartItem = useAppSelector((state) => state?.cartReducer?.cart?.CartItem) || [];

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        setSubTotal(
            cartItem.reduce((acc, item) => {
                return acc + (item.product.price * item.qty);
            }, 0)
        );
    }, [cartItem, session])
    return (
        <div className="flex flex-col min-h-screen py-12 md:py-24 items-center justify-start space-y-4">
            <div className="w-full max-w-2xl px-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">Order Summary</h3>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-800">
                            {cartItem.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-md overflow-hidden">
                                            <img alt="Product image" className="object-cover w-full h-full" src="/placeholder.svg" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{item?.product?.name}</div>
                                            <div className="text-gray-500 dark:text-gray-400">$60.00 x 2</div>
                                        </div>
                                    </div>
                                    <div className="font-medium">${item?.product?.price}</div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-4">
                                <div>Subtotal</div>
                                <div>${subTotal}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Shipping information</h3>
                            </div>
                            <div className="p-4">
                                <div className="text-sm">
                                    <div className="font-medium">{session?.user?.name}</div>
                                    <div>{session?.user?.address}</div>
                                    <div>{session?.user?.city}</div>
                                    <div>{session?.user?.country}</div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Payment information</h3>
                            </div>
                            <div className="p-4">
                                <div className="text-sm">
                                    <div className="grid gap-2">
                                        <label className="font-medium" htmlFor="name">
                                            Name
                                        </label>
                                        <input className="input" id="name" placeholder="Enter your name" type="text" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="font-medium" htmlFor="card">
                                            Card number
                                        </label>
                                        <input className="input" id="card" placeholder="Enter your card number" type="password" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="grid gap-2">
                                            <label className="font-medium" htmlFor="expiry">
                                                Expiry date
                                            </label>
                                            <input className="input" id="expiry" placeholder="MM/YY" type="text" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label className="font-medium" htmlFor="cvv">
                                                CVV
                                            </label>
                                            <input className="input" id="cvv" placeholder="Enter your CVV" type="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            session &&
                            <button onClick={async () => {
                                const tempData = await dispatch(createTempOrderFunc())
                                if (tempData?.payload.st) {
                                    successToast("fgn")

                                    const data = await dispatch(createOrderFunc(tempData?.payload.temOrdrId))
                                    if (data?.payload.st) {
                                        successToast(data?.payload.msg)
                                    } else {
                                        errorToast(data.payload.msg)
                                    }
                                } else {
                                    errorToast(tempData.payload.msg)
                                }
                            }
                            } className="w-full max-w-xs ml-auto bg-gray-900 text-white py-2 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-900">
                                Place Order
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

