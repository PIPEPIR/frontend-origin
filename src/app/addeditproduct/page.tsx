"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Product } from "../page";
import { useRouter } from "next/navigation";
import { storage } from "@/app/firebase.config"; // Adjust the path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AddEditProductProps {
  productId?: string;
}

const AddEditProduct = ({ productId }: AddEditProductProps) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    quantity: undefined,
    price: undefined,
    thumbnail: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the image file

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        alert("Please upload a PNG or JPEG image.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `http://localhost:3001/products/${productId}`
          );
          if (!res.ok) {
            throw new Error("Error fetching product data");
          }
          const data = await res.json();
          setFormData(data);

          if (data.thumbnail) {
            setImagePreview(data.thumbnail);
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      quantity:
        formData.quantity !== undefined && formData.quantity > 0
          ? ""
          : "Quantity is required",
      price:
        formData.price !== undefined && formData.price > 0
          ? ""
          : "Price is required",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = null;

      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl);
      }

      const productData = {
        ...formData,
        thumbnail: imageUrl || formData.thumbnail,
      };

      const response = await fetch(
        productId
          ? `http://localhost:3001/products/${productId}`
          : "http://localhost:3001/products/",
        {
          method: productId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      const successMessage = productId
        ? "Product updated successfully"
        : "Product added successfully";
      setSuccessMessage(successMessage);

      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.type !== "number" ? value : parseInt(value),
    }));
  };

  const handleReset = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="flex items-center justify-center py-8">
      <div className="w-full max-w-lg container px-4 md:px-0">
        <h3 className="text-2xl text-center mb-6">
          {productId ? "Edit Item" : "Add Item"}
        </h3>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block body-2 mb-1">Image</label>
            <button
              type="button"
              onClick={handleImageClick}
              className="flex items-center justify-center px-4 py-2 border border-primary-50 text-primary-50 hover:bg-primary-80 mt-2"
            >
              <Image
                src={"/upload.svg"}
                width={15}
                height={15}
                alt="upload-icon"
              />
              <span className="ml-2">Upload</span>
            </button>

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            )}
            {imagePreview && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="body-2">Name</label>
            <span className="text-red-600"> *</span>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Product Name"
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 mt-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="body-2">Description</label>
            <textarea
              name="description"
              placeholder="Textarea"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-50 mt-2"
            />
          </div>

          <div>
            <label className="body-2">Quantity</label>
            <span className="text-red-600"> *</span>
            <input
              name="quantity"
              value={formData.quantity ?? ""}
              onChange={handleChange}
              type="number"
              placeholder="Quantity"
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 mt-2 ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-600 text-sm">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="body-2">Price (Baht)</label>
            <span className="text-red-600"> *</span>
            <input
              type="number"
              name="price"
              value={formData.price ?? ""}
              onChange={handleChange}
              placeholder="Price"
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 mt-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-600 text-sm">{errors.price}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary-50 text-white body-2 rounded-sm hover:bg-primary-40 mt-4"
          >
            {isSubmitting ? "Saving..." : productId ? "Update" : "Save"}
          </button>
        </form>
        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default AddEditProduct;
