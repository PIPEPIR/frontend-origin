import Image from "next/image";
import React from "react";

const AddProduct = () => {
  return (
    <main className="flex items-center justify-center py-8">
      <div className="w-full max-w-lg container px-4 md:px-0">
        <h3 className="text-2xl text-center mb-6">Add/Edit Item</h3>
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block body-2 mb-1">Image</label>
            <button
              type="button"
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
          </div>

          <div>
            <label className="body-2 ">Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-50 mt-2"
            />
          </div>

          <div>
            <label className="body-2 ">Description</label>
            <textarea
              placeholder="Textarea"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-50 mt-2"
            />
          </div>

          <div>
            <label className=" body-2">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-50 mt-2"
            />
          </div>

          <div>
            <label className="block body-2 ">Price (Baht)</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-50 mt-2 "
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-50 text-white body-2 rounded-sm hover:bg-primary-40 mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;
