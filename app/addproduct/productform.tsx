"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Color from "../components/Color";
import ImageUpload from "../components/ImageUpload";

type Props = {};

const Productform = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    inventory: 0,
    color: "",
    price: 0,
    images: "",
  });

  const [info, updateinfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price =
      e.target.name === "price"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    const inventory =
      e.target.name === "inventory"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: price,
      [e.target.name]: inventory,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleImageChange = () => {
    const stringimages = JSON.stringify(imageUrls);
    console.log(formData);
    setFormData({
      ...formData,
      images: stringimages,
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: imageUrls.toString(),
    }));
  }, [imageUrls]);

  const postData = async () => {
    handleImageChange();
    try {
      const response = await axios.post("/api/addproduct", formData);
      router.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
      </div>
      <h1 className="text-3xl font-semibold py-6">Add your Product</h1>
      <div className="text-black mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="title"
              value={formData.title}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <input
              type="text"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="category"
              value={formData.category}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <label htmlFor="inventory" className="font-medium">
              Inventory
            </label>
            <input
              type="number"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="inventory"
              value={formData.inventory}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
              name="price"
              value={formData.price}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <div>
              <label htmlFor="color" className="font-medium">
                Color
              </label>
              <input
                type="text"
                className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
                name="color"
                value={formData.color}
                onChange={handleTextInputChange}
              />
            </div>
            <Color setFormData={setFormData} Color={formData.color} />
          </div>
        </div>
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Description about your product
        </label>
        <textarea
          className="w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none"
          name="description"
          value={formData.description}
          onChange={handleTextareaChange}
        />
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Upload Images
        </label>
        <ImageUpload
          info={info}
          updateInfo={updateinfo}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={postData}
          className="text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Productform;
