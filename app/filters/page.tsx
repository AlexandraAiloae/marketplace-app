"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Link from "next/link";
import Filter from "./filter";

type Props = {};

const Page = (props: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios
          .get("/api/filterproduct", {
            params: {
              categories: selectedCategories,
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setResponse(response.data.products);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchdata();
  }, [selectedCategories]);

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <div>
        <Navbar />
      </div>
      <hr />
      <div className="flex">
        <div>
          <Filter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="px-10">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5">
            {response.map((product: any) => (
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
                      <h1 className="text-[14px] font-medium max-w-[200px] whitespace-nowrap overflow-hidden">
                        {product.title}
                      </h1>
                    </div>
                    <span className="px-2 font-medium bg-gray-100 rounded-lg">
                      {product.price}.00 €
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
