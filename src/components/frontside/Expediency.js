import Image from "next/image";
import Title from "./Title";
import Expediency1 from "/public/resources(12).png";
import Expediency2 from "/public/resources(25).png";
import Expediency3 from "/public/resources(26).png";

const Expediency = () => {
  return (
    <div className="bg-[#E0EFF6] py-10 flex flex-col justify-center items-center text-center ssm:grid ssm:grid-cols-3 ssm:px-[50px] md:px-[100px] lg:px-[150px]">
      <div className="ssm:col-span-full">
        <Title
          title="Benefits 
        for your expediency"
        />
      </div>
      <div className="flex justify-center items-center  flex-col gap-3 mt-10">
        <div className="bg-[#EEEBFF] flex justify-center items-start p-[20px] w-[110px] rounded-lg ">
          <Image src={Expediency1} width={40} height={40} alt="" />
        </div>
        <p className="text-lg">
          <Title title="Payment Method" />
        </p>
        <p className="text-[var(--primary1)]">
          We offer flexible payment options, to make easier.
        </p>
      </div>

      <div className="flex justify-center items-center  flex-col gap-3 mt-10">
        <div className="bg-[#EEEBFF] flex justify-center items-start p-[20px] w-[110px] rounded-lg ">
          <Image src={Expediency2} width={40} height={40} alt="" />
        </div>
        <p className="text-lg">
          <Title title="Customer Support" />
        </p>
        <p className="text-[var(--primary1)]">Our customer support is 24/7.</p>
      </div>

      <div className="flex justify-center items-center  flex-col gap-3 mt-10">
        <div className="bg-[#EEEBFF] flex justify-center items-start p-[20px] w-[110px] rounded-lg ">
          <Image src={Expediency3} width={40} height={40} alt="" />
        </div>
        <p className="text-lg">
          <Title title="Return policy" />
        </p>
        <p className="text-[var(--primary1)]">
          You can return a product within 30 days.
        </p>
      </div>
    </div>
  );
};

export default Expediency;
