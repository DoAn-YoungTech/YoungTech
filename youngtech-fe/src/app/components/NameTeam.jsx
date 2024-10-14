"use client";
import React from "react";
import "./NameTeam.css";

const NameTeam = () => {
  return (
    <>
      <article className="">
        <div className="wrapper">
          <ul className="marquee">
            <li style={textColor} className="uppercase text-[10rem]">
              <span className="text-black">Young tech</span>
            </li>
            <li className="uppercase text-[10rem]">
              <span className="bg-gray-500 text-pink-200">
                FE Thanh - han - Quan
              </span>
            </li>
            <li style={textColor} className="uppercase text-[10rem]">
              <span className="bg-black text-pink-200">
                BE Ytaly - nam - giang
              </span>
            </li>
          </ul>
          <ul className="marquee2">
            <li style={textColor} className="uppercase text-[10rem]">
              Young tech
            </li>
            <li className="uppercase text-[10rem]">
              <span className="bg-black text-pink-200">
                FE Thanh - han - Quan
              </span>
            </li>
            <li style={textColor} className="uppercase text-[10rem]">
              BE : Ytaly - nam - giang
            </li>
          </ul>
        </div>
      </article>
    </>
  );
};
export default NameTeam;

const textColor = {
  padding: "0 20px",
};
