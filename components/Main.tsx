import React from "react";
import Button from "./Button";

const Main = () => {
  return (
    <div className="text-center md:p-20 pt-20 p-5 bg-slate-50 ">
      <button className="bg-black rounded-full p-1.5 text-[12px] px-1.5 text-white w-auto pr-3">
        <span className="w-auto bg-white text-black rounded-full px-2 mr-2">
          New Release
        </span>
        Introducing headless hashnode
      </button>
      <h1 className="font-bold md:text-[60px] text-[35px] mt-5 mb-5">
        Where developer blogs meet community power!
      </h1>
      <p className="md:text-[17px] text-[17px] text-neutral-500  md:mb-5 mb-10 md:px-[20%] text-center">
        Create and grow your developer blog, newsletter, or team engineering
        blog effortlessly with Hashnode. Level up your writing using powerful{" "}
        <span className="text-black font-bold">AI features!</span>
      </p>
      <Button title="Join the community" />
    </div>
  );
};

export default Main;
