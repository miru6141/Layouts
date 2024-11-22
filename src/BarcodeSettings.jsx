import  { useState } from "react";

const BarcodeSettings = () => {
  const [gridSettings, setGridSettings] = useState({
    columns: 12,
    rows: 6,
    labelWidth: 70,
    labelHeight: 49.5,
    hSpace: 0,
    vSpace: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGridSettings((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const renderGrid = () => {
    const { columns, rows } = gridSettings;
    const gridItems = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gridItems.push(
          <div
            key={`${i}-${j}`}
            className="border border-gray-300"
            style={{
              width: `${gridSettings.labelWidth}px`,
              height: `${gridSettings.labelHeight}px`,
              marginRight: `${gridSettings.hSpace}px`,
              marginBottom: `${gridSettings.vSpace}px`,
            }}
          ></div>
        );
      }
    }
    return gridItems;
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2 mb-4">
        {["General", "Company", "Product", "Footer"].map((tab) => (
          <button
            key={tab}
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex space-x-6">
        {/* Left Panel */}
        <div className="flex flex-col space-y-4 w-1/3">
          {/* Barcode Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Barcode Type
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option>EN 13</option>
              <option>QR Code</option>
              <option>Code 128</option>
            </select>
          </div>

          {/* Paper Size */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Paper Size
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>A4</option>
                <option>Letter</option>
              </select>
            </div>
            <div className="w-1/2 flex space-x-2">
              <input
                type="number"
                name="width"
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Width"
              />
              <input
                type="number"
                name="height"
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Height"
              />
            </div>
          </div>

          {/* Font */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Font Name
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Poppins</option>
                <option>Arial</option>
                <option>Roboto</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <input
                type="number"
                name="fontSize"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="12"
              />
            </div>
          </div>

          {/* Label Setup */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Label Setup (MM)
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <input
                type="number"
                name="columns"
                value={gridSettings.columns}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Columns"
              />
              <input
                type="number"
                name="rows"
                value={gridSettings.rows}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Rows"
              />
              <input
                type="number"
                name="labelWidth"
                value={gridSettings.labelWidth}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Label Width"
              />
              <input
                type="number"
                name="labelHeight"
                value={gridSettings.labelHeight}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Label Height"
              />
              <input
                type="number"
                name="hSpace"
                value={gridSettings.hSpace}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="H Space"
              />
              <input
                type="number"
                name="vSpace"
                value={gridSettings.vSpace}
                onChange={handleInputChange}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="V Space"
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 border rounded-md p-4">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${gridSettings.columns}, auto)`,
              gap: `${gridSettings.vSpace}px ${gridSettings.hSpace}px`,
            }}
          >
            {renderGrid()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeSettings;
