import Image from "next/image";
import Title from "./Title";
import { dummyReviews } from "./DummyData";
import Quote from "/public/Quote.png";
const Testimonial = () => {
  return (
    <div className="bg-[##D9D9D9] grid place-items-center  py-20 ">
      <div>
        <Title title="Testimonials" />
        <p>Over 15,000 happy customers.</p>
      </div>
      <div className="flex overflow-x-auto w-[100%] gap-10 px-20">
        {dummyReviews?.map((item) => (
          <div key={item.id}>
            <div className="h-[273px] w-[273px] bg-[#D9D9D9] rounded-lg relative mt-10">
              <Image
                src={Quote}
                width={110}
                height={90}
                alt=""
                className="absolute top-[-20px] left-[-20px]"
              />
            </div>
            <div className="my-5">
              <p className="my-5">&apos;{item.review}&apos;</p>
              <p>{item.author}</p>
              <p>{item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
