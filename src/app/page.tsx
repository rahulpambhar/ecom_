"use client";
import About from "@/components/frontside/Careaboutpage/page";
import Howitwork from "@/components/frontside/HowItWork/page";
import ImageSlider from "@/components/frontside/Imageslider/page";
import Nailslider from "@/components/frontside/Nailsliderpage/page";
import Recentviewed from "@/components/frontside/Recentviewed/page";
import Submitemail from "@/components/frontside/SubmitEmail/page";
import Topselectionpart from "@/components/frontside/Topselectionpage/page";
import Unitedfree from "@/components/frontside/Unitedfreepage/page";
import OfferPage from "@/components/frontside/offer/page";
import Singlenailpaint from "@/components/frontside/singlenailpaint/page";
import { FaCircle, FaStar } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      {/* <ImageSlider />
      <Topselectionpart />
      <About />
      <OfferPage />
      <Singlenailpaint />
      <Nailslider />
      <Unitedfree />
      <Howitwork />
      <Recentviewed />
      <Submitemail />     */}
      <div className="grid grid-cols-2 w-full h-full">
        <div className="bg-red-300">image</div>
        <div className="bg-blue-300 p-5 ">
          <div className="border-gray-400 pb-5  border-b-2">
            <div className="flex items-center gap-5">
              <p className="text-4xl font-medium">Woodie Blake</p>
              <div className="text-xl font-light bg-orange-900 text-white px-3 py-1 rounded-full">
                20% OFF
              </div>
            </div>
            <div className="flex py-2 items-center gap-5">
              <p className="text-2xl">$110.0</p>
              <p>$35.0</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 text-sm text-orange-900">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm">(45)</p>
            </div>
          </div>
          <div className="py-5">
            <div className="font-medium flex items-center gap-3">
              <p>Availability:</p>
              <p className="text-green-300">In Stock</p>
            </div>
            <p className="py-5">
              Versatile, comfortable, and chic! Three words that describe Blake
              by Elyssi.
            </p>
            <div className="grid grid-cols-7 items-center gap-5">
              <p>Color</p>
              <div className="flex gap-1">
                <FaCircle />
                <FaCircle />
                <FaCircle />
                <FaCircle />
              </div>
            </div>{" "}
            <div className="grid grid-cols-7 items-center gap-5 py-5">
              <p>size</p>
              <div className="col-span-3">
                <input type="text" placeholder="small" className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-7 items-center gap-5 py-5">
              <p>Quantity</p>
              <div className="col-span-3">
                <input type="text" placeholder="small" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
