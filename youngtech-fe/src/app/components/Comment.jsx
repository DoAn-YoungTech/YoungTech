"use client";
import React from "react";
import avatar from "../../../public/designImage/imageLogo/logoBackground/1.png";
import Image from "next/image";
import { CiFaceSmile } from "react-icons/ci";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
const Comment = () => {
  const [showComment, setShowComment] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleComment = () => {
    setShowComment(!showComment);
  };
  return (
    <section style={text} id="comment" className=" mt-[50px]">
      <h1 className="font-semibold flex items-center  mb-[20px] text-[20px]">
        <span className="mr-[10px]">Xem bình luận</span>

        {isShow ? (
          <LuEye
            onClick={() => setIsShow(!isShow)}
            className="cursor-pointer text-[23px]"
          />
        ) : (
          <LuEyeOff
            onClick={() => setIsShow(!isShow)}
            className="cursor-pointer text-[23px]"
          />
        )}
      </h1>
      {isShow === true ? (
        <>
          <div className="comment-dialog flex mb-[20px] items-start ">
            <div className="avatar w-[3%] mr-[20px]">
              <Image src={avatar} className="rounded-full w-[40px] h-[40px]" />
            </div>
            <div className="main w-[60%]">
              <div className="create-box pb-3 border-b-2 w-full border-b-gray-600">
                <input
                  type="text"
                  className="text-[15px] capitalize outline-none  border-none pr-2 font-sans font-semibold"
                  placeholder="Thêm comment..."
                />
              </div>
              <div className="footer flex items-center justify-between mt-[20px]">
                <div className="buttonEmoji font-bold">
                  <CiFaceSmile className="text-[2rem]" />
                </div>
                <div className="buttonEmoji">
                  <button className="bg-gray-300 text-gray-500 ml-3 hover:bg-gray-800 hover:text-white py-2 px-4 rounded-2xl text-[14px]">
                    cancel
                  </button>
                  <button className="bg-gray-300 text-gray-500 ml-3 hover:bg-gray-800 hover:text-white py-2 px-4 rounded-2xl text-[14px]">
                    comment
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-dialog flex items-start ">
            <div className="avatar w-[3%] mr-[20px]">
              <Image src={avatar} className="rounded-full w-[40px] h-[40px]" />
            </div>
            <div className="main w-[60%]">
              <div className="create-box pb-2 w-full flex items-center ">
                <span
                  className="name font-bold text-[15px] mr-[10px]"
                  style={text}
                >
                  Tran van y
                </span>
                <span className="time text-gray-600 text-[12px]">
                  1 months ago
                </span>
              </div>
              <p className="content text-[18px] font-[400]" style={text}>
                Hello everyone my name is Y ..
              </p>
              <div className="footer flex items-center mt-[10px]">
                <div className="flex items-center mr-4">
                  <AiOutlineLike className="text-[1.1rem] cursor-pointer mr-4" />
                  <span className="text-[14px]">120</span>
                </div>
                <AiOutlineDislike className="text-[1.1rem] cursor-pointer mr-4" />
                <button
                  onClick={() => handleComment()}
                  className="p-2 bg-gray-300 rounded-2xl capitalize text-[14px]"
                >
                  reply
                </button>
              </div>
              {showComment === true ? (
                <div className="comment-dialog flex mt-3 mb-[20px] items-start ">
                  <div className="avatar w-[5%] mr-[20px]">
                    <Image
                      src={avatar}
                      className="rounded-full w-[40px] h-[40px]"
                    />
                  </div>
                  <div className="main w-[95%]">
                    <div className="create-box pb-3 border-b-2 w-full border-b-gray-600">
                      <input
                        type="text"
                        className="text-[15px] capitalize outline-none  border-none pr-2 font-sans font-semibold"
                        placeholder="Thêm comment..."
                      />
                    </div>
                    <div className="footer flex items-center justify-between mt-[20px]">
                      <div className="buttonEmoji font-bold">
                        <CiFaceSmile className="text-[2rem]" />
                      </div>
                      <div className="buttonEmoji">
                        <button
                          onClick={() => setShowComment(false)}
                          className="bg-gray-300 text-gray-500 ml-3 hover:bg-gray-800 hover:text-white py-2 px-4 rounded-2xl text-[14px]"
                        >
                          cancel
                        </button>
                        <button className="bg-gray-300 text-gray-500 ml-3 hover:bg-gray-800 hover:text-white py-2 px-4 rounded-2xl text-[14px]">
                          comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Comment;
const text = {
  fontFamily: "Roboto , sans-serif",
};
