import React from "react";

interface ToolbarProps {
  onSortChange: (order: "asc" | "desc") => void;
  onSearchChange: (query: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSortChange, onSearchChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as "asc" | "desc";
    onSortChange(order);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex justify-center md:justify-between mb-4">
      <div className="hidden md:flex gap-4 items-center">
        <label htmlFor="search">Search</label>
        <input
          className="border p-2"
          type="text"
          id="search"
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="sort">Sort by</label>
        <select className="border p-2" id="sort" onChange={handleSortChange}>
          <option value="asc">Price: Low - High</option>
          <option value="desc">Price: High - Low</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
