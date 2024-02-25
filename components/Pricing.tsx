import { ApiContext, TProps } from "@/context/ApiProvider";
import $axios from "@/lib/api";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const Pricing = () => {
  const { user } = React.useContext(ApiContext) as TProps;
  const [priceId, setPriceId] = React.useState("");
  const [customer, setCustomer] = React.useState(undefined);

  const handleSubscriptionClick = async (priceId: string) => {
    setPriceId(priceId);
    const response = await $axios.post("/api/customer", {
      name: user?.username,
      email: user?.email,
    });
    setCustomer(response.data.data?.id);
  };
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-10 bg-white shadow-lg outline-none focus:outline-none">
          <h1 className="font-bold text-center text-[20px]">
            Subscribe to hashnode
          </h1>
          <p className="text-center text-[13px]">
            Subscribe to create and cutomise your own personal blogs!
          </p>
          <p className="font-bold text-center text-[17px]">$1.00/monthly</p>
          <button
            onClick={() => handleSubscriptionClick("price_abc123")}
            className="text-white px-4 py-2 rounded-full bg-[#407ef1] hover:opacity-50"
          >
            Subscibe Now
          </button>
          {customer && <CheckoutForm customerId={customer} priceId={priceId} />}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
