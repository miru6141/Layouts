import React, { useState, useRef } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

export const PrintBarcode = () => {
  const [settings, setSettings] = useState({
    rows: 6,
    cols: 5,
    hspace: 1,
    Vspace: 4,
    width: 222,
    height: 270,
    Pwidth: 1200,
    Pheight: 1640,
    blank_space: 0, // Number of blank spaces
    page: 0, // Number of stickers to print
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value), // Convert input to a number
    }));
  };

  const [generatedCode] = useState("123456789101");
  const printRef = useRef(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
      <div 
        style="
          display: grid; 
          width: ${settings.Pwidth}px; 
          height: ${settings.Pheight}px; 
          margin: 0 auto; 
          grid-template-rows: repeat(${settings.rows}, 1fr); 
          grid-template-columns: repeat(${settings.cols}, 1fr);
        ">
        ${printContent}
      </div>`;
      window.print();

      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  // Calculate the total number of stickers (rows × columns)
  const totalStickers = settings.rows * settings.cols;

  // Logic to determine whether to render blank or filled stickers
  const getStickerContent = (index) => {
    if (index < settings.blank_space) return ""; // Render blank stickers for the first `blank_space`
    if (index < settings.blank_space + settings.page) return generatedCode; // Render filled stickers for the next `page`
    return ""; // Render blank stickers for the remaining slots
  };

  return (
    <>
      <div className="grid grid-col-2 m-0">
        <div className="border border-black h-40 flex items-center space-x-4 p-4">
          <label htmlFor="" className="text-sm">
            Blank Stickers :
            <input
              type="number"
              name="blank_space"
              onChange={handleChange}
              className="border w-14 h-6 ml-2"
              value={settings.blank_space}
            />
          </label>

          <label htmlFor="" className="text-sm">
            Stickers to Print :
            <input
              type="number"
              name="page"
              onChange={handleChange}
              className="border w-14 h-6 ml-2"
              value={settings.page}
            />
          </label>

          <button
            onClick={handlePrint}
            className="bg-slate-500 text-white px-4 py-1 rounded"
          >
            Print
          </button>
        </div>

        <div
          ref={printRef}
          className="grid items-center p-4 justify-center"
          style={{
            gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
            width: `${settings.Pwidth}px`,
            height: `${settings.Pheight}px`,
            transition: "all 0.3s ease-in-out",
          }}
        >
          {Array.from({ length: totalStickers }, (_, index) => (
            <div
              key={index}
              className="p-2"
              style={{
                height: `${settings.height}px`,
                width: `${settings.width}px`,
                marginBlock: `${settings.Vspace}px`,
                marginInline: `${settings.hspace}px`,
                transition: "all 0.3s ease-in-out",
              }}
            >
              {getStickerContent(index) ? (
                <>
                  <p className="text-start mb-4 text-[12px]">{`BLACK CARDAMOM 25 GM`}</p>
                  <div className="flex justify-between">
                    <p className="text-start text-[12px]">
                      Size: {BarcodeData.size}
                    </p>
                    <p className="text-start text-[12px]">
                      Net Qty: {BarcodeData.net_qty}
                    </p>
                  </div>
                  <Barcode value={generatedCode} />
                  <p className="text-[14px] font-extrabold text-center">
                    {`MRP ₹ ${BarcodeData.mrp}`}
                  </p>
                  <p className="text-[12px] text-center font-semibold">
                    (Inclusive of All Taxes)
                  </p>
                  <p className="text-[14px] text-start font-extrabold">
                    {`OFFER ₹ ${BarcodeData.offer}`}
                  </p>
                  <p className="text-center pl-4 mt-4 text-[12px] underline font-bold">
                    {BarcodeData.company_name}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
