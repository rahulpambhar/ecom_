"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../app/redux/hooks";
import LoginModal from "../components/Login/index";
import path from "path";
import { ThemeProvider } from "next-themes";
import Loading from "./loading";
import Header from "@/components/frontside/Header";
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

export default function Template({ children }: any) {
  const pathname = usePathname();
  const { data: session, status }: any = useSession();
  const isLoginModelOpen = useAppSelector(
    (state) => state.utilReducer.isLoginModelOpen
  );

  if (status === "loading") {
    return (
      <ThemeProvider>
        <Loading />
      </ThemeProvider>
    );
  }

  return (
    <div id="root">
      <div>
        <Header />
        {children}
        {status === "authenticated" &&
          session?.user?.isAdmin &&
          pathname.startsWith("/admin") && <Sidebar />}
      </div>
      {isLoginModelOpen && <LoginModal />}
    </div>
  );
}
