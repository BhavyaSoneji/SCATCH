import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useHandleSubmit } from "../utils/handleSubmit";
import { Upload, Image as ImageIcon } from "lucide-react";

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    image: null,
    name: "",
    price: "",
    discount: "",
    bgColor: "#ffffff",
    panelColor: "#000000",
    textColor: "#000000",
  });
  const handleSubmit = useHandleSubmit();

  return (
    <div className="h-full w-full flex flex-col p-10 gap-4">
      <h1 className="text-3xl font-semibold">Create New Product</h1>
      <hr className="text-zinc-500 border" />
      <form
        className="flex flex-col justify-between gap-10 p-10"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e, product, "Create Product")}
      >
        {/* Create Product form */}
        <div className="flex gap-10">
          {/* Product Details */}
          <div className=" flex flex-col gap-5 w-1/2">
            <h1 className="text-2xl font-medium">Product Details</h1>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Image
                </label>
                <input
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.files[0],
                    });
                  }}
                  required
                />
              </div>
              <InputBox
                data={product}
                setData={setProduct}
                title="Product Name"
                type="text"
                name={"name"}
                placeholder="Enter Product Name"
              ></InputBox>
              <div className="w-full flex gap-5">
                <InputBox
                  data={product}
                  setData={setProduct}
                  title="Product Price"
                  type={"number"}
                  name={"price"}
                  placeholder="Enter Product Price"
                ></InputBox>
                <InputBox
                  data={product}
                  setData={setProduct}
                  title="Discount Price"
                  type={"number"}
                  name={"discount"}
                  placeholder="Enter Discount Price"
                ></InputBox>
              </div>
            </div>
          </div>

          {/* Product Panel Details */}
          <div className=" flex flex-col gap-5 w-1/2">
            <h1 className="text-2xl font-medium">Panel Details</h1>
            <div className="flex flex-col gap-3 w-full">
              <InputBox
                data={product}
                setData={setProduct}
                title="Background Color"
                type="color"
                name={"bgColor"}
              ></InputBox>
              <div className="w-full flex gap-10">
                <div className="w-1/2">
                  <InputBox
                    data={product}
                    setData={setProduct}
                    title="Panel Color"
                    type="color"
                    name={"panelColor"}
                  ></InputBox>
                </div>
                <div className="w-1/2">
                  <InputBox
                    data={product}
                    setData={setProduct}
                    title="Text Color"
                    type="color"
                    name={"textColor"}
                  ></InputBox>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Product Button */}
        <div className="w-full flex justify-center">
          <div className="w-1/3">
            <Button value="Create Product" className="bg-blue-600 hover:bg-blue-700" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
