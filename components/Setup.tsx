import React from "react";
import { ApiContext, TProps } from "@/context/ApiProvider";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nicknameType, nicknameValidation } from "@/lib/validation";
import $axios from "@/lib/api";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  setShowSetUp: any;
};

const Setup = ({ setShowSetUp }: Props) => {
  const { data: session } = useSession();
  const { user } = React.useContext(ApiContext) as TProps;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<nicknameType>({
    resolver: zodResolver(nicknameValidation),
  });

  const onSubmit = async ({ nickname, jobtype, bio }: nicknameType, e: any) => {
    e.preventDefault();
    const body = { nickname, jobtype, bio };
    try {
      const response = await $axios.post(
        `/api/userothers/${session?.user?.id}`,
        body
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user?.nickname || !user?.bio || !user?.jobtype) {
    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          <form
            className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-7 bg-white shadow-lg outline-none focus:outline-none"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between">
              <h1 className="text-black text-[25px] font-semibold">
                {user?.username && user?.username} {user?.username && ","} Set
                up your profile!
              </h1>
              <IoCloseOutline
                className="text-neutral-500 text-[20px] cursor-pointer text-right "
                onClick={() => setShowSetUp(false)}
              />
            </div>
            <div className=" flex gap-2 mt-10 w-full flex-col items-center">
              {user?.image ? (
                <Image
                  src={user?.image}
                  width={1000}
                  height={1000}
                  className="w-[90px] h-[90px] rounded-full"
                  alt={user?.username}
                />
              ) : (
                <div className="min-w-[120px] min-h-[120px] border border-neutral-300 bg-white rounded-full"></div>
              )}
              <div>
                <h1 className="text-[20px] text-black ">{user?.username}</h1>
              </div>
            </div>
            <label className="flex flex-col gap-2">
              Enter nickname
              <input
                {...register("nickname")}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                placeholder="Your Nickname..."
              />
            </label>

            <label className="flex flex-col gap-2">
              Enter Bio
              <input
                {...register("bio")}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                placeholder="Your Bio..."
              />
            </label>

            <label className="flex flex-col gap-2">
              Enter Job type
              <select
                className="w-full p-2 rounded border-neutral-300 border text-neutral-400 outline-[#407ef1]"
                {...register("jobtype")}
              >
                <option>Select Category...</option>
                <option>Frontend developer</option>
                <option>UI/UX designer</option>
                <option>Backend developer</option>
                <option>Software engineer</option>
                <option>Cyber Security expert</option>
              </select>
            </label>
            <button className="text-white p-3 rounded-full bg-[#407ef1]">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    null;
  }
};

export default Setup;
