import React from "react";

type props = {
  title: string;
};

const Button = ({ title }: props) => {
  return (
    <div>
      <button className="bg-[#407ef1] text-white py-2 px-7 rounded-full">
        {title}
      </button>
    </div>
  );
};

export default Button;
