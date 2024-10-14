"use client";
import logo from "../../../public/designImage/imageLogo/logoNoBackground/2.png";
import Image from "next/image";
import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import { ImYoutube2 } from "react-icons/im";
import logoBg from "../../../public/designImage/imageLogo/logoBackground/1.png";
const Footer = () => {
  return (
    <div className="mt-8 pt-9">
      <footer className="lg:container m-auto">
        <Image src={logo} className="w-[200px] m-auto  h-[200px]" />
        <section>
          <div className="flex justify-between">
            <div className="w-[70%]">
              <div className="flex items-baseline justify-between">
                <div className="w-[50%] flex items-baseline justify-between">
                  <div className="mr-5 w-[25%]">
                    <p className="text-[12px] border-spacing-1 text-black">
                      DATN-TEAM-YOUNG-TECH...
                    </p>
                  </div>
                  <div className="w-[25%]">
                    <ul className="block">
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          LinkedIn
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-[50%] flex items-baseline justify-between">
                  <div className="w-[20%]">
                    <p className="text-[12px] border-spacing-1 text-black">
                      WEBSITE-TECH (@2024)
                    </p>
                  </div>
                  <div className="w-[30%]">
                    <ul className="block">
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Website Development BY
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Italy
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Nam
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Thanh
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Diang
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="text-[12px] border-spacing-1 text-gray-700"
                        >
                          Han
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <Image src={logoBg} />
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;

const footerBg = {
  background: "rgb(195,180,217)",
  background:
    "radial-gradient(circle, rgba(195,180,217,1) 11%, rgba(195,180,217,1) 31%, rgba(238,174,202,1) 60%, rgba(195,180,217,1) 77%, rgba(148,187,233,1) 88%)",
};
