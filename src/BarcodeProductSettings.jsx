import React, { useState } from "react";

const BarcodeProductSettings = () => {
  const [checkedFields, setCheckedFields] = useState({
    productCode: true,
    productName: true,
    description: false,
    brandName: false,
    mrp: true,
    rate: true,
    discount: false,
    unit: false,
    expiryDate: false,
    manufacturingDate: false,
  });

  const handleCheckboxChange = (field) => {
    setCheckedFields({ ...checkedFields, [field]: !checkedFields[field] });
  };

  return (
    <div className="flex flex-col p-4 space-y-4 bg-white max-w-6xl mx-auto rounded shadow-md">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {["General", "Company", "Product", "Footer"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              tab === "Product" ? "border-b-2 border-blue-500 font-bold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Settings */}
      <div className="flex">
        {/* Left Panel: Options */}
        <div className="w-1/3 space-y-4">
          {Object.entries(checkedFields).map(([field, isChecked]) => (
            <div
              key={field}
              className="flex items-center justify-between space-x-4"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(field)}
                  className="rounded text-blue-500"
                />
                <span className="capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
              </label>
              <div className="flex items-center space-x-2">
                {/* Example: Add icons here */}
                <button className="p-1 text-gray-500 hover:text-blue-500">
                  ✓
                </button>
                <button className="p-1 text-gray-500 hover:text-blue-500">
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel: Preview */}
        <div className="w-2/3">
          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Barcode Preview</h3>
            <div className="border p-4 grid grid-cols-4 gap-2">
              {/* Placeholder for barcode grid */}
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="border rounded p-2 text-xs text-center"
                >
                  <div className="h-8 bg-gray-300 mb-2"></div>
                  <p>MRP ₹599.00</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Save Options */}
      <div className="flex items-center justify-between border-t pt-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded text-blue-500" />
          <span>Save as Template</span>
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Barcode Sticker"
            className="border rounded px-2 py-1"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeProductSettings;
