"use client";
import React from "react";

interface Props {
  id: number;
  title: string;
  description: string;
  category: string;
  inventory: number;
  color: string;
  price: number;
  images: string;
}

const Info: React.FC<Props> = ({ title, description, id, price, color }) => {
  const colors = color.split(",");

  return (
    <div className="relative info">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-12 mt-4">
        <span className="flex items-start space-x-3"></span>
      </div>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">Price: {price}€</h3>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">Description</h3>
      <div>{description}</div>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">Colour Available</h3>
      {colors.map((color, index) => (
        <div
          key={index}
          className="relative w-[35px] h-[35px] border-[1px] border-neutral-400 m-1"
          style={{
            borderRadius: "100%",
            backgroundColor: color,
            display: "inline-block",
          }}
        >
          <span
            className="w-[30px] h-[30px] rounded-full flex top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute border-[1px]"
            style={{ backgroundColor: color }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default Info;
