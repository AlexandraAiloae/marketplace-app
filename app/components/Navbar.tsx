"use client";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between py-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <a href="/">AHomeToBe.</a>
          </div>
          <nav className="max-md:hidden">
            <ul className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
              <li>
                <a className="py-3 inline-block w-full">Filters</a>
              </li>
              <li>
                <a className="py-3 inline-block w-full">Products</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
