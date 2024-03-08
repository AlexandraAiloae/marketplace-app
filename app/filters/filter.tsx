"use client";
import React, { useState } from "react";
import { BsSliders2Vertical } from "react-icons/bs";

type Props = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleCategory = (category: string) => {
    props.setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="relative">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${
          showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-neutral-800">Filters</h1>
          <BsSliders2Vertical size={20} className="text-neutral-600" />
        </div>
        <div className="flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]">
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("Vases") ? "bg-orange-100" : ""
            }`}
            onClick={() => toggleCategory("Vases")}
          >
            Vases
          </span>
          <span
            className={`py-3 px-5 ${
              props.selectedCategories.includes("Candles") ? "bg-orange-100" : ""
            }`}
            onClick={() => toggleCategory("Candles")}
          >
            Candles
          </span>
        </div>
      </div>
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        Filters
      </div>
    </div>
  );
};

export default Filter;
