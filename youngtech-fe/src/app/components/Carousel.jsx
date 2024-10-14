"use client";
import React from "react";
import banner3 from "../../../public/designImage/imageBanner/Banner/3.png";
import banner2 from "../../../public/designImage/imageBanner/Banner/2.png";
import banner1 from "../../../public/designImage/imageBanner/Banner/1.png";
import banner4 from "../../../public/designImage/imageBanner/Banner/4.png";
import Image from "next/image";
import { useState, useEffect } from "react";
const listImage = [
  { id: 1, imageBanner: banner1, alt: "banner1" },
  { id: 2, imageBanner: banner2, alt: "banner2" },
  { id: 3, imageBanner: banner3, alt: "banner3" },
  { id: 4, imageBanner: banner4, alt: "banner4" },
];

const Carousels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % listImage.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, listImage.length]);

  return (
    <>
      <section className="category">
        <div className="w-full">
          <div className="relative h-[800px]">
            {listImage.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full  h-full transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={item.imageBanner}
                  alt={item.alt}
                  className="h-[800px] object-cover object-center w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousels;
