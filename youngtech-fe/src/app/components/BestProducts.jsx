import React from "react";
import image1 from "../../../public/designImage/imageProducts/Entertainment Devices/Game/Lexibook Power Console.jpg";
import image2 from "../../../public/designImage/imageProducts/Entertainment Devices/Game/My Arcade Atari Pocket Player Pro.jpg";
import image3 from "../../../public/designImage/imageProducts/Entertainment Devices/Game/Nintendo Switch.jpg";
import image4 from "../../../public/designImage/imageProducts/Entertainment Devices/Game/R36S Retro Handheld Game Console.jpg";
import Image from "next/image";
const textTitle = {
  color: "rgb(29, 41, 57)",
};

const listImg = [
  { id: 1, image: image1, price: 200000, name: "Lexibook Power Console" },
  {
    id: 2,
    image: image2,
    price: 200000,
    name: "My Arcade Atari Pocket Player Pro",
  },
  { id: 3, image: image3, price: 200000, name: "Nintendo Switch" },
  {
    id: 4,
    image: image4,
    price: 200000,
    name: "R36S Retro Handheld Game Console",
  },
];
const BestProducts = () => {
  return (
    <section className="lg:container mt-[50px]">
      <h3 style={textTitle} className="capitalize font-bold text-[24px]">
        sản phẩm bán chạy nhất
      </h3>
      <div className="listProBestSale mt-[50px] flex-wrap flex justify-between items-baseline">
        {listImg.map((item) => {
          return (
            <>
              <div
                key={item.id}
                className="box-pro w-[24%] hover:border-b-2 hover:border-b-gray-300   border-b-2 border-b-white duration-300 transition-all p-2 cursor-pointer"
              >
                <Image
                  className="w-[70%] m-auto p-5"
                  src={item.image}
                  alt={item.name}
                />
                <p className="uppercase text-[14px]">{item.name}</p>
                <p className="text-gray-500">Price : {item.price}</p>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default BestProducts;
