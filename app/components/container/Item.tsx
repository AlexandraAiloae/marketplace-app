import React from "react";
import Link from "next/link";
import prisma from "@/app/prismadb";

type Props = {};

const Item = async (props: Props) => {
  const products = await prisma.product.findMany();
  if (products.length === 0) {
    return <div>We Can&apos;t Find Any Products Here! 🕵️‍♂️</div>;
  }
  return (
    <div className="py-5">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 ">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/dashboard/${product.id}`}>
              <div className="relative rounded-lg">
                <img
                  src={product.images.split(",")[0]}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                    {product.title}
                  </h1>
                </div>
                <span className="px-2 font-medium bg-gray-100 rounded-lg">
                  ${product.price}.00 RON
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
