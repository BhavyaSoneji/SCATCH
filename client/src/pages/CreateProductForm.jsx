import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useHandleSubmit } from "../utils/handleSubmit";
import { X } from "lucide-react";
import { useRef } from "react";

const CreateProductForm = () => {
  const defaultProduct = {
    frontImage: null,
    otherImages: [],
    name: "",
    price: "",
    discount: "",
    bgColor: "#ffffff",
    panelColor: "#000000",
    textColor: "#000000",
  };
  const [product, setProduct] = useState(defaultProduct);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [multipleImagesPreview, setMultipleImagesPreview] = useState([]);
  const [isSuccess, setIsSuccess] = useState();

  const handleSubmit = useHandleSubmit();

  const frontImage = useRef(null);

  const handleMultipleImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    setProduct({ ...product, otherImages: files });

    multipleImagesPreview.forEach((url) => {
      return URL.revokeObjectURL(url);
    });

    const previreImages = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setMultipleImagesPreview(previreImages);
  };

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous URL if exists
      if (frontImagePreview) {
        URL.revokeObjectURL(frontImagePreview);
      }
      // Create new preview URL
      const previewUrl = URL.createObjectURL(file);
      setFrontImagePreview(previewUrl);
      setProduct({
        ...product,
        frontImage: file,
      });
      // frontImage.current.value = file;
    }
  };

  const removeFrontImage = () => {
    if (frontImagePreview) {
      URL.revokeObjectURL(frontImagePreview);
    }

    console.log(document.getElementsByTagName(""));
    setFrontImagePreview(null);
    setProduct({ ...product, frontImage: null });
    frontImage.current.value = null;

  };

  const removeFromMultipleImages = (url, index) => {
    URL.revokeObjectURL(multipleImagesPreview[index]);
    const newPrivews = multipleImagesPreview.filter((value) => {
      return value != url;
    });

    setMultipleImagesPreview(newPrivews);
    const otherImages = product.otherImages.filter((_, i) => {
      return i !== index;
    });

    setProduct({ ...product, otherImages });
  };

  useEffect(() => {
    if (isSuccess === true) {
      // Reset product data
      setProduct(defaultProduct);
      setFrontImagePreview(null);
      setMultipleImagesPreview([]);
    
      // Reset success flag
      setIsSuccess(null);
    }
  }, [isSuccess]);

  return (
    <div className="h-full w-full flex flex-col p-10 gap-4">
      <h1 className="text-3xl font-semibold">Create New Product</h1>
      <hr className="text-zinc-500 border" />
      <form
        className="flex flex-col justify-between gap-10 p-10"
        encType="multipart/form-data"
        onSubmit={async (e) => {
          await handleSubmit(e, product, "Create Product");
          setIsSuccess(true);
        }}
      >
        {/* Create Product form */}
        <div className="flex gap-10">
          {/* Product Details */}
          <div className=" flex flex-col gap-5 w-1/2">
            <h1 className="text-2xl font-medium">Product Details</h1>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Front Image
                </label>

                {/* Image Preview */}
                {frontImagePreview && (
                  <div className="mb-3 relative inline-block">
                    <img
                      src={frontImagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-zinc-300"
                    />
                    <button
                      type="button"
                      onClick={removeFrontImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <input
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  type="file"
                  name="frontImage"
                  accept="image/*"
                  onChange={handleFrontImageChange}
                  ref={frontImage}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Other Images
                </label>

                {multipleImagesPreview.length != 0 && (
                  <div className="flex flex-wrap gap-3 h-40 overflow-y-scroll px-2 pt-3">
                    {multipleImagesPreview.map((url, index) => {
                      return (
                        <div
                          className="mb-3 relative inline-block w-fit"
                          key={index}
                        >
                          <img
                            src={url}
                            className="w-30 h-30 object-cover rounded-lg border-2 border-zinc-300"
                            alt="Preview Image"
                          ></img>
                          <button
                            type="button"
                            onClick={() => removeFromMultipleImages(url, index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                            title="Remove image"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <input
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  type="file"
                  multiple={true}
                  name="otherImages"
                  accept="image/*"
                  onChange={(e) => handleMultipleImagesChange(e)}
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
        <div className="w-full flex justify-center ite">
          <div className="w-1/3">
            <Button
              value="Create Product"
              className="bg-blue-600 hover:bg-blue-700 px-3 w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
