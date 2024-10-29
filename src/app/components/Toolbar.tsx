"use client";

import React from "react";

const Toolbar = () => {
  return (
    <div className="flex justify-center md:justify-between">
      <div className="hidden md:flex gap-4 items-center">
        <label htmlFor="search">Search</label>
        <input className="border p-2" type="text" />
      </div>
      <div className=" flex gap-4 items-center">
        <label htmlFor="sort">Sort by</label>
        <select className="border p-2">
          <option value="asc">Price: High - Low</option>
          <option value="dsc">Price: Low - High</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
