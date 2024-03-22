"use client";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { BsBucket } from "react-icons/bs";
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { TbHeart } from "react-icons/tb";
import Image from "next/image";
import Hamburger from "/public/resources(17).png";
import Logo from "/public/Logo.png";
import Search from "/public/resources(19).png";
import Cart from "/public/resources(18).png";
import Profile from "/public/resources(16).png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast"
import { usePathname, redirect } from "next/navigation";
import { useAppSelector, useAppDispatch } from '../../app/redux/hooks';
import { isLoginModel, setOpenCart } from '../../app/redux/slices/utilSlice'
import { fetchCart } from '../../app/redux/slices/cartSclice';
import { baseUrl } from "../../../env";

const Header = () => {


  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const isLoginModelOpen = useAppSelector((state) => state.utilReducer.isLoginModelOpen);
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const openCart = useAppSelector((state) => state?.utilReducer?.openCart);

  useEffect(() => {
    if (session) {
      dispatch(fetchCart());
    }
  }, [session, dispatch]);
  return (
    <div className="px-16">
      <div className="pt-4 pb-2 flex justify-between border-b border-black">
        <p>MOODY STUDIO</p>
        <div className="flex gap-5">
          <Iconbtn icon={<FaSearch className="w-6 h-6" />} />
          <Iconbtn icon={<FaRegUser className="w-6 h-6" />} />
          <span>
            <Image src={Cart} width={20} height={20} alt="" onClick={() => {
              if (!session) {
                toast.error("Please Login First")
                return
              }
              dispatch(setOpenCart(!openCart))
            }} />
          </span>
          <Iconbtn icon={<TbHeart className="w-6 h-6" />} />

          {session ? (
            <>
              <span className="fontFamily">
                {session.user.name}
              </span>
              {
                session?.user?.isAdmin ?
                  <div className="fontFamily" onClick={() => signOut({ callbackUrl: baseUrl })}>
                    Logout
                  </div> :
                  <>
                    <div className="fontFamily" >
                      <Link href="/order">
                        <span>orders</span>
                      </Link>
                    </div>
                    <div className="fontFamily" onClick={() => signOut({ redirect: false, })}>
                      Logout
                    </div>
                  </>
              }
            </>
          ) : (
            <button onClick={() => dispatch(isLoginModel(!isLoginModelOpen))} className="fontFamily" >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center px-20 border-b border-black py-3">
        <Nav_Link url="/" label="Home" />
        <Nav_Link url="/" label="BRAND" />
        <Nav_Link url="/" label="ABOUT US" />
        <Nav_Link url="/" label="NEWS" />
        <Nav_Link url="/" label="CONTACT US " />
      </div>
    </div>
  );
};

export default Header;

const Iconbtn = ({ icon }) => {
  return (
    <button className="">
      <div className="">{icon}</div>
    </button>
  );
};
function Nav_Link({ url, label }) {
  return (
    <Link href={url}>
      <p className="font-bold text-lg uppercase">{label}</p>
    </Link>
  );
}
