"use client";
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import { isLoginModel, setOpenCart } from '../app/redux/slices/utilSlice'
import { createTempOrderFunc, createOrderFunc, getOrdersFunc } from '../../redux/slices/orderSlices';
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast"
import { errorToast, successToast } from '@/components/toster';
// import { successToast, errorToast } from './toster';

export default function Checkout() {
    const { data: session, status }: any = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter()
    // const openCart = useAppSelector((state) => state?.utilReducer?.openCart);
    // const cartItem = useAppSelector((state) => state?.orderReducer ?) || [];
    // console.log('cartItem::: ', cartItem);

    const orders: any = [
        { id: 1, customer: 'John Doe', total: 500 },
        { id: 2, customer: 'Jane Smith', total: 700 },
        // Add more orders as needed
    ];


    useEffect(() => {
        if (session) {
            const getOrders = async () => {
                const data = await dispatch(getOrdersFunc())
            }
            getOrders()
        }
    }, [])
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Order Listing</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-2 text-gray-900">{order.customer}</h2>
                                <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                                <p className="text-sm text-gray-600">Total: ${order.total}</p>
                                {/* Add more order details */}
                            </div>
                            <div className="bg-gray-100 px-6 py-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

