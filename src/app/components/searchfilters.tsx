import React from 'react';

const SearchFilters = () => {
  return (
    <div className="p-6 bg-white shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-bold text-gray-700">Pick-Up</label>
          <input
            type="text"
            placeholder="Select your city"
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Drop-Off</label>
          <input
            type="text"
            placeholder="Select your city"
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
