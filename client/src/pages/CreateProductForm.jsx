import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useHandleSubmit } from "../utils/handleSubmit";
import { X } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import useAllProducts from "../context/useAllProducts";
const CreateProductForm = () => {
  const defaultProduct = {
    frontImage: null,
    otherImages: [],
    name: "",
    price: "",
    discountPrice: "",
    bgColor: "#ffffff",
    panelColor: "#000000",
    textColor: "#000000",
  };
  const [product, setProduct] = useState(defaultProduct);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [multipleImagesPreview, setMultipleImagesPreview] = useState([]);

  const handleSubmit = useHandleSubmit();
  const frontImageRef = useRef(null);
  const otherImagesRef = useRef(null);

  const navigate = useNavigate();

  const { addProduct } = useAllProducts();

  const handleMultipleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, otherImages: files });

    // Cleanup old Previews
    multipleImagesPreview.forEach((url) => {
      return URL.revokeObjectURL(url);
    });

    // Created New URLs fro files
    const previreImages = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setMultipleImagesPreview(previreImages);
  };

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cleanup old preview
    if (frontImagePreview) {
      URL.revokeObjectURL(frontImagePreview);
    }

    setFrontImagePreview(URL.createObjectURL(file));
    setProduct({ ...product, frontImage: file });
  };

  const removeFrontImage = () => {
    if (frontImagePreview) {
      URL.revokeObjectURL(frontImagePreview);
    }

    setFrontImagePreview(null);
    setProduct({ ...product, frontImage: null });
    if (frontImageRef.current) {
      frontImageRef.current.value = "";
    }
  };

  const removeFromMultipleImages = (url, index) => {
    URL.revokeObjectURL(url);
    setMultipleImagesPreview((prev) => {
      return prev.filter((_, i) => i !== index);
    });

    setProduct({
      ...product,
      otherImages: product.otherImages.filter((_, i) => i !== index),
    });

    console.log(product);
  };

  useEffect(() => {
    if (multipleImagesPreview.length == 0) {
      otherImagesRef.current.value = "";
    }
  }, [multipleImagesPreview]);

  // Reset Form Helper
  const resetForm = () => {
    // cleanup all the preview URLs
    if (frontImagePreview) {
      URL.revokeObjectURL(frontImagePreview);
    }
    multipleImagesPreview.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    // Reset State
    setProduct(defaultProduct);
    setFrontImagePreview(null);
    setMultipleImagesPreview([]);

    // Reset File Inputs
    if (frontImageRef.current) {
      frontImageRef.current.value = "";
    }
    if (otherImagesRef.current) {
      otherImagesRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const createProduct = await handleSubmit(e,product,"Create Product");
      
      if(createProduct){
        addProduct(createProduct);
      }
      resetForm();
    } catch (err) {
      console.error("Error Creating Product", err);
    }finally{
      navigate("/admin/allproducts");
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-10 gap-4">
      <h1 className="text-3xl font-semibold">Create New Product</h1>
      <hr className="text-zinc-500 border" />
      <form
        className="flex flex-col justify-between gap-10 p-10"
        encType="multipart/form-data"
        onSubmit={(e) => {
          onSubmit(e);
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
                {/* Front Image Input Box */}
                <input
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  type="file"
                  name="frontImage"
                  accept="image/*"
                  onChange={handleFrontImageChange}
                  ref={frontImageRef}
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
                  ref={otherImagesRef}
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
                  name={"discountPrice"}
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
