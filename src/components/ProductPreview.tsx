"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../app/redux/hooks";
import { actionTocartFunc } from "../app/redux/slices/cartSclice";
import { errorToast, successToast } from "@/components/toster";
import { useSession } from "next-auth/react";
import { isLoginModel, setOpenCart } from "../app/redux/slices/utilSlice";
import axios from "axios";
import { reviewSubmit, getReviews } from "@/app/redux/slices/reviewSlice";
import { type } from "os";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ openPreview, setOpenPreview, product }: any) {
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('description');
  const [review, setReview] = useState('');
  const [ratings, setRaings] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");

  const openCart = useAppSelector((state) => state?.utilReducer?.openCart);
  const cart = useAppSelector((state) => state?.cartReducer?.cart?.CartItem) || [];
  const cartItem = cart?.find((item: any) => item?.productId === product.id);
  const reviews = useAppSelector((state: any) => state?.reviewReducer?.reViewList) || [];
  const averageRating = useAppSelector((state: any) => state?.reviewReducer?.averageRating) || 0



  const addToCartFunction = async (id: string) => {
    const payload = { productId: id, action: "add" };
    const data = await dispatch(actionTocartFunc(payload));
    data.payload.st
      ? successToast(data?.payload.msg)
      : errorToast(data.payload.msg);
  };

  const actionTocartFunction = async (item: any, action: any) => {
    try {
      const payload = { productId: item?.productId, action };
      if (action === "remove" && item.qty === 1) {
        errorToast("Minimum 1 quantity required");
        return;
      }
      const data = await dispatch(actionTocartFunc(payload));
      data?.payload.st
        ? successToast(data?.payload.msg)
        : errorToast(data.payload.msg);
    } catch (err) {
      errorToast(err);
    }
  };



  const setSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        review, ratings, reviewTitle, id: product.id
      }
      const data = await dispatch(reviewSubmit(payload))
      setReviewTitle("");
      setReview("");
      setRaings(0);
    } catch (error) {
      console.log('error::: ', error);
    }
  }
  useEffect(() => {
    session &&
      (async () => {
        const data = await dispatch(getReviews(product.id));
      })();
  }, [session, product.id]);



  useEffect(() => {
    if (!session) return;
    const myReview = reviews.find((item: any) => item?.userId === session?.user?.id && item?.productId === product.id);
    myReview && openPreview && setReview(myReview?.review);
    myReview && openPreview && setRaings(myReview?.rating);
    myReview && openPreview && setReviewTitle(myReview?.reviewTitle);
  }, [reviews, averageRating, openPreview])

  return (
    <Transition.Root show={openPreview} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={(e) => {
        setOpenPreview(e)
        setReviewTitle("");
        setReview("");
        setRaings(0);
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-600"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity  md:block" />
        </Transition.Child>

      </Dialog>
    </Transition.Root>
  );
}
