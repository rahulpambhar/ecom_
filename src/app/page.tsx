"use client";
import ButtonCustom from "@/components/frontside/ButtonCustom";
import Category from "@/components/frontside/Category";
import Expediency from "@/components/frontside/Expediency";
import Footer from "@/components/frontside/Footer";
import NewsLetter from "@/components/frontside/NewsLetter";
import OwnCreation from "@/components/frontside/OwnCreation";
import PopularProduct from "@/components/frontside/PopularProduct";
import Testimonial from "@/components/frontside/Testimonial";
import About from "@/components/frontside_viraj/Careaboutpage/page";
import Howitwork from "@/components/frontside_viraj/HowItWork/page";
import ImageSlider from "@/components/frontside_viraj/Imageslider/page";
import Nailslider from "@/components/frontside_viraj/Nailsliderpage/page";
import Navbar from "@/components/frontside_viraj/Navbar/page";
import Recentviewed from "@/components/frontside_viraj/Recentviewed/page";
import Submitemail from "@/components/frontside_viraj/SubmitEmail/page";
import Topselectionpart from "@/components/frontside_viraj/Topselectionpage/page";
import Unitedfree from "@/components/frontside_viraj/Unitedfreepage/page";
import OfferPage from "@/components/frontside_viraj/offer/page";
import Singlenailpaint from "@/components/frontside_viraj/singlenailpaint/page";
import { useStore } from "react-redux";

export default function Home() {
  return (
    <main>
      {/* <div className="flex flex-col justify-center items-center gap-y-5 bg-[#C4C4C4] min-h-screen text-center px-3 rounded-b-[30px] sm:text-start">
        <p className="text-[var(--primary1)] text-3xl font-[600] fontFamily">
          Exclusive Deals of Furniture Collection
        </p>
        <p className="text-[var(--primary2)]">
          Explore different categories. Find the best deals.
        </p>
        <ButtonCustom name="Shop Now" />
      </div>
      <Category />
      <PopularProduct />
      <OwnCreation />
      <Expediency />
      <Testimonial />
      <NewsLetter />
      <Footer /> */}
      <Navbar />
      <ImageSlider />
      <About />
      <Topselectionpart />
      <OfferPage />
      <Singlenailpaint />
      <Nailslider />
      <Unitedfree />
      <Howitwork />
      <Recentviewed />
      <Submitemail />
      <Footer />
    </main>
  );
}
