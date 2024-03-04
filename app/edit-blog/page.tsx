"use client";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import React from "react";
import { CiImageOn } from "react-icons/ci";
import $axios from "@/lib/api";
import { useSession } from "next-auth/react";
import { IoCloseOutline } from "react-icons/io5";
import useModal from "@/hooks/zustand/useModal";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const [image, setImage] = React.useState<string>("");
  const [prevImage, setPrevImage] = React.useState("");
  const [title, setTitle] = React.useState<string>("");
  const [firstParagraph, setFirstParagraph] = React.useState<string>("");
  const [firstContent, setFirstContent] = React.useState<string>("");
  const [secondContent, setSecondContent] = React.useState<string>("");
  const [secondParagraph, setSecondParagraph] = React.useState<string>("");
  const [thirdParagraph, setThirdParagraph] = React.useState<string>("");
  const [thirdContent, setThirdContent] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [theme, setTheme] = React.useState<string>("");
  const getParams = useSearchParams();
  const blogId = getParams.get("blogId");
  const modal = useModal();
  const router = useRouter();
  const openModal = () => {
    modal.onOpen();
  };
  const closeModal = () => {
    modal.onClose();
  };

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

  React.useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await $axios.get(`/api/blog/${blogId}`);
        setTitle(response.data.data?.title);
        setPrevImage(response.data.data?.image);
        setFirstParagraph(response.data.data?.firstParagraph);
        setFirstContent(response.data.data?.firstContent);
        setSecondContent(response.data.data?.secondContent);
        setSecondParagraph(response.data.data?.secondParagraph);
        setThirdParagraph(response.data.data?.thirdParagraph);
        setThirdContent(response.data.data?.thirdContent);
        setCategory(response.data.data?.category);
        setTheme(response.data.data?.theme);
      } catch (error) {
        console.log(error);
      }
    };
    if (blogId) getBlog();
  }, [blogId]);

  const editBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title,
      image,
      firstParagraph,
      firstContent,
      secondContent,
      secondParagraph,
      thirdParagraph,
      thirdContent,
      category,
      theme,
    };
    try {
      const response = await $axios.patch(`/api/blog/${blogId}`, body);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:flex gap-5">
      <Sidebar setTheme={setTheme} theme={theme} />
      <div className="md:p-20 p-5">
        <h1 className="text-neutral-500 text-[30px] font-bold mb-5">
          Edit Blog
        </h1>
        {!image ? (
          <div className="min-h-[250px] border border-dotted border-neutral-400 rounded  text-center flex justify-center flex-col items-center">
            <Image
              className="rounded-[10px] max-h-[250px] w-auto"
              width={1000}
              height={1000}
              src={prevImage}
              alt=""
            />
            <input
              type="file"
              className="opacity-0 h-full w-full"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <div className="min-h-[250px] border border-dotted border-neutral-500 rounded text-center flex justify-center items-center p-10">
            <Image
              className="rounded-[10px] max-h-[250px] w-auto"
              width={1000}
              height={1000}
              src={image}
              alt=""
            />
          </div>
        )}
        <div className="py-10 flex gap-8">
          <select
            className="text-neutral-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option>Web development</option>
            <option>Mobile development</option>
            <option>AI & ML</option>
            <option>Data science</option>
            <option>Blockchain</option>
          </select>
        </div>
        <div className="flex flex-col">
          <input
            className="border-none text-neutral-500 text-[40px] font-bold outline-none"
            placeholder="Article Title..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <input
            className="border-none text-neutral-500 text-[20px] font-bold mt-10 outline-none"
            placeholder="First Pargraph..."
            onChange={(e) => setFirstParagraph(e.target.value)}
            value={firstParagraph}
          />

          <textarea
            className="border-none text-neutral-500 text-[15px] font-bold min-h-[300px] mt-10 outline-none"
            placeholder="First Content..."
            onChange={(e) => setFirstContent(e.target.value)}
            value={firstContent}
          ></textarea>

          <div className="mt-20 flex flex-col">
            <input
              className="border-none text-neutral-500 text-[20px] font-bold mt-10 outline-none"
              placeholder="Second Pargraph..."
              onChange={(e) => setSecondParagraph(e.target.value)}
              value={secondParagraph}
            />

            <textarea
              className="border-none text-neutral-500 text-[15px] font-bold min-h-[300px] mt-10 outline-none"
              placeholder="Second Content..."
              onChange={(e) => setSecondContent(e.target.value)}
              value={secondContent}
            ></textarea>
          </div>

          <div className="mt-20 flex flex-col">
            <input
              className="border-none text-neutral-500 text-[20px] font-bold mt-10 outline-none"
              placeholder="Third Pargraph..."
              onChange={(e) => setThirdParagraph(e.target.value)}
              value={thirdParagraph}
            />

            <textarea
              className="border-none text-neutral-500 text-[15px] font-bold min-h-[300px] mt-10 outline-none"
              placeholder="Third Content..."
              onChange={(e) => setThirdContent(e.target.value)}
              value={thirdContent}
            ></textarea>
          </div>
        </div>
      </div>

      <div></div>
      <div className="p-5 flex gap-4 right-0 mr-10 md:fixed ">
        <button
          className="border border-neutral-500 rounded-full text-black p-2 px-4 "
          onClick={() => router.push("/home")}
        >
          Cancel
        </button>
        <button
          className="bg-[#407ef1] rounded-full text-white p-2 px-4 "
          onClick={openModal}
        >
          Edit
        </button>
      </div>

      {modal.isOpen === true && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
          <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-7 bg-white shadow-lg outline-none focus:outline-none">
              <IoCloseOutline
                className="text-neutral-500 text-[20px] cursor-pointer text-right "
                onClick={closeModal}
              />
              <h1 className="text-neutral-500 font-semibold">
                Are you sure you want to edit this article?
              </h1>
              <div className=" flex gap-4 mt-10 w-full">
                <button
                  className="border border-neutral-500 rounded-full text-black p-2 px-4 "
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#407ef1] rounded-full text-white p-2 px-4 "
                  onClick={editBlog}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
