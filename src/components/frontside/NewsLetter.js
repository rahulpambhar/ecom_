import ButtonCustom from "./ButtonCustom";
import Title from "./Title";

const NewsLetter = () => {
  return (
    <div className="grid grid-cols-1 ssm:grid-cols-2">
      <div className="bg-[#E0F6F1] flex flex-col gap-5 px-5 py-10 ssm:pr-[50px] md:pr-[100px] lg:pr-[150px]">
        <Title title="Join Our Newsletter" />
        <p>Receive exclusive deals, discounts and many offers.</p>
        <input
          className="border-b border-[--primary1] focus:outline-none px-2 py-1 bg-transparent w-full"
          placeholder="Enter your email"
        />
        <ButtonCustom name="Subscribe" />
      </div>
    </div>
  );
};

export default NewsLetter;
