"use client";
import Homebar from "@/components/Homebar";
import { ApiContext, TProps } from "@/context/ApiProvider";
import useCommentModal from "@/hooks/zustand/useCommentModal";
import useModal from "@/hooks/zustand/useModal";
import $axios from "@/lib/api";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

const YourProfile = () => {
  const { data: session } = useSession();
  const { userBlogs, user } = React.useContext(ApiContext) as TProps;
  const [link, setLink] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [jobtype, setJobtype] = React.useState<string>("");
  const modal = useModal();
  const secondmodal = useCommentModal();
  const openModal = () => {
    modal.onOpen();
  };
  const closeModal = () => {
    modal.onClose();
  };

  const openSecondModal = () => {
    secondmodal.onOpen();
  };

  const closeSecondModal = () => {
    secondmodal.onClose();
  };

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    const date = new Date(user?.createdAt);
    return formatDistanceToNowStrict(date);
  }, [user?.createdAt]);

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await $axios.post(`/api/link/${session?.user?.id}`, {
        link,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await $axios.patch(`/api/link/${session?.user?.id}`, {
        link,
      });
      secondmodal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getUserInfo = () => {
      setUsername(user?.username);
      setNickname(user?.nickname as string);
      setBio(user?.bio as string);
      setJobtype(user?.jobtype as string);
      setLink(user?.link as string);
    };

    if (user) getUserInfo();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      console.log("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      setImage(result);
    };
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await $axios.patch(`/api/user/${session?.user?.id}`, {
        image,
        username,
      });
      modal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const editOthers = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await $axios.patch(`/api/userothers/${session?.user?.id}`, {
        jobtype,
        nickname,
        bio,
      });
      secondmodal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const detectUserDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  return (
    <div>
      <Homebar />
      <div className="md:px-[15%] p-5 md:py-[10%] py-[25%]">
        <div className="border border-neutral-300 rounded-[10px] md:px-20 p-5 py-10">
          <div className="flex md:flex-row flex-col items-center gap-4 pb-10">
            {user?.image ? (
              <Image
                src={user?.image}
                width={100}
                height={100}
                alt=""
                className="w-[200px] h-[200px] rounded-full"
              />
            ) : (
              <div className="min-w-[200px] min-h-[200px] rounded-full border border-neutral-300"></div>
            )}
            <div className="md:text-start text-center">
              <h1 className="font-bold text-[30px]">
                {detectUserDay()}, {user?.username}
              </h1>
              <div className="flex gap-7 items-center flex-row md:text-start text-center">
                <p className=" text-[17px] text-neutral-600 text-center ">
                  {user?.nickname}
                </p>
                <AiOutlineEdit
                  onClick={openModal}
                  className=" text-[17px] text-neutral-600"
                />
              </div>
            </div>
          </div>

          <div className="border border-neutral-300 rounded-[10px] py-5 text-center">
            {createdAt && `Joined ${createdAt} ago`}
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 mt-10 gap-3">
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-bold text-[20px]">About Me</h1>
              <p className="text-neutral-500 text-[14px] pt-5">{user?.bio}</p>
            </div>
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-bold text-[20px]">My Tech Stack</h1>
              <p className="text-neutral-500 text-[14px] pt-5">
                {user?.jobtype}
              </p>
            </div>
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-extrabold text-[20px]">Link</h1>
              {user?.link ? (
                <p className="text-neutral-500 text-[14px] pt-5 text-center underline">
                  <a href={user?.link}>{(user?.link).slice(0, 20)}...</a>
                </p>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <input
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter any link"
                    className="outline-none p-2"
                    type="url"
                  />
                  <button
                    onClick={addLink}
                    className="px-4 py-2 w-full rounded-full bg-[#407ef1] text-white"
                  >
                    Add Link
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center text-center mt-5">
            <button
              onClick={openSecondModal}
              className="px-10 py-2  rounded-full bg-[#407ef1] text-white text-center "
            >
              Edit Others
            </button>
          </div>
        </div>
      </div>

      {modal.isOpen === true && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
          <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-5 bg-white shadow-lg outline-none focus:outline-none">
              <IoCloseOutline
                className="text-neutral-500 text-[20px] cursor-pointer text-right "
                onClick={closeModal}
              />
              <h1 className="text-[20px] font-bold">Edit Profile</h1>

              <div className="flex flex-col items-center gap-5">
                {!image ? (
                  <Image
                    src={user?.image}
                    width={100}
                    height={100}
                    alt=""
                    className="w-[200px] h-[200px] rounded-full"
                  />
                ) : (
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt=""
                    className="w-[200px] h-[200px] rounded-full"
                  />
                )}

                <input type="file" onChange={handleImageChange} />
                <input
                  value={username}
                  className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <button
                className="text-white p-3 rounded-full bg-[#407ef1]"
                onClick={editProfile}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {secondmodal.isOpen === true && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
          <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-5 bg-white shadow-lg outline-none focus:outline-none">
              <IoCloseOutline
                className="text-neutral-500 text-[20px] cursor-pointer text-right "
                onClick={closeSecondModal}
              />
              <h1 className="text-[20px] font-bold">Edit Others</h1>

              <input
                value={nickname}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                onChange={(e) => setNickname(e.target.value)}
              />
              <input
                value={bio}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                onChange={(e) => setBio(e.target.value)}
              />
              <select
                value={jobtype}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                onChange={(e) => setJobtype(e.target.value)}
              >
                <option>Select Category...</option>
                <option>Frontend developer</option>
                <option>UI/UX designer</option>
                <option>Backend developer</option>
                <option>Software engineer</option>
                <option>Cyber Security expert</option>
              </select>

              <button
                className="text-white p-3 rounded-full bg-[#407ef1]"
                onClick={editOthers}
              >
                Edit Others
              </button>

              <h1 className="text-[20px] font-bold">Edit Link</h1>

              <input
                value={link}
                className="w-full p-2 rounded border-neutral-300 border outline-[#407ef1]"
                onChange={(e) => setLink(e.target.value)}
              />
              <button
                className="text-white p-3 rounded-full bg-[#407ef1]"
                onClick={editLink}
              >
                Edit Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;
