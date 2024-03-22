import Image from "next/image";
import Logo from "/public/Logo.png";
import Social1 from "/public/resources(13).png";
import Social2 from "/public/resources(14).png";
import Social3 from "/public/resources(15).png";

const Footer = () => {
  return (
    <div className="bg-[#F3F6F5] px-5 py-20 grid ssm:grid-cols-2 ssm:px-[50px] md:grid-cols-3 md:px-[100px] lg:px-[150px]">
      <div className="text-[#07484A] mb-5 col-span-full">
        <Image src={Logo} width={120} height={30} alt="" />
        <div className="flex justify-start items-center gap-5 mt-5">
          <Image src={Social1} width={20} height={30} alt="" />
          <Image src={Social2} width={20} height={30} alt="" />
          <Image src={Social3} width={20} height={30} alt="" />
        </div>
      </div>

      <div className="text-[#07484A]">
        <p className=" font-[600] text-lg mb-4">Address</p>
        <p>
          +123 654 987 <br />
          877 The Bronx, NY <br />
          14568, USA
        </p>
      </div>
      <div className="text-[#07484A]">
        <p className=" font-[600] text-lg mb-4">My Account</p>
        <p>Sign in</p>
        <p>Register</p>
        <p>Order status</p>
      </div>
      <div className="text-[#07484A]">
        <p className=" font-[600] text-lg mb-4">My Account</p>
        <p>Sign in</p>
        <p>Register</p>
        <p>Order status</p>
      </div>

      <div className="mt-10 col-span-full">
        <p className="text-sm text-[#07484A]">
          Copyright ©2020 INWOOD. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
