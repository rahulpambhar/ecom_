import PopularCard from "./PopularCard";
import Title from "./Title";

function OwnCreation() {
  return (
    <>
      <div className="overflow-x-scroll flex py-20 gap-5 pr-20 mt-48">
        <div className="w-[150px] py-[50px] px-[16px] shrink-0 rounded-r-lg bg-[--primary2] text-[--secondary5]">
          <p className="text-white">
            <Title title="Our Own Creation" />
          </p>
          <p className="text-lg my-3">Designed in our studio</p>
          <p className="text-sm">more..</p>
        </div>
        <PopularCard />
        <PopularCard />
        <PopularCard />
        <PopularCard />
        <PopularCard />
      </div>
    </>
  );
}

export default OwnCreation;
