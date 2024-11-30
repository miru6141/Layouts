import React, { useState, useRef, useEffect } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

export const PrintBarcode = () => {
  const [settings, setSettings] = useState({
    rows: 6,
    cols: 5,
    hspace: 0,
    Vspace: 0,
    Swidth: 151,
    Sheight: 181,
    Pwidth: 793,
    Pheight: 1123,
    mtop: 0,
    mbottom: 0,
    mleft: 0,
    mright: 0,
    units:'px',
    barcode_type:null,
    select_font:null,
    font_size:10,

    blank_space: 0, // Number of blank spaces
    stickers_space: 0, // Number of stickers to print
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value), // Convert input to a number
    }));
  };

  const [generatedCode] = useState("8908124438766");
  const printRef = useRef(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
      <div 
        style="
            display: grid; 
          width: ${settings.Pwidth}${settings.units}; 
          height: ${settings.Pheight}${settings.units}; 
          margin: 2 auto; 
          grid-template-rows: repeat(${settings.rows}, 1fr); 
          grid-template-columns: repeat(${settings.cols}, 1fr);
          transform: scale(1.5); /* Apply 150% scaling */
          transform-origin: top left; /* Adjust origin for scaling */
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
    if (index < settings.blank_space + settings.stickers_space) return generatedCode; // Render filled stickers for the next `page`
    return ""; // Render blank stickers for the remaining slots
  };


  // const calculateDimensions = () => {
  //   const screenWidth = window.innerWidth;
  //   const screenHeight = window.innerHeight;

  //   // Maintain A4 ratio (1:√2)
  //   let width = screenWidth * 0.9; // Use 90% of screen width
  //   let height = width * Math.sqrt(2); // Maintain A4 ratio

  //   // Ensure height doesn't exceed screen height
  //   if (height > screenHeight * 0.9) {
  //     height = screenHeight * 0.9;
  //     width = height / Math.sqrt(2);
  //   }

  //   setSettings((prev) => ({
  //     ...prev,
  //     Pwidth: width,
  //     Pheight: height,
  //   }));
  // };

  // // Call `calculateDimensions` on load and when window resizes
  // useEffect(() => {
  //   calculateDimensions(); // Set initial dimensions
  //   window.addEventListener("resize", calculateDimensions);

  //   // Cleanup listener on unmount
  //   return () => {
  //     window.removeEventListener("resize", calculateDimensions);
  //   };
  // }, []);

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
              name="stickers_space"
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
          className="grid items-center p-4 sc "
          style={{
            gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
            width: `${settings.Pwidth}${settings.units}`,
            height: `${settings.Pheight}${settings.units}`,
            marginLeft: `${settings.mleft}${settings.units}`,
            marginRight: `${settings.mright}${settings.units}`,
            marginTop: `${settings.mtop}${settings.units}`,
            marginBottom: `${settings.mbottom}${settings.units}`,
       
            transition: "all 0.3s ease-in-out",
          }}
        >
          {Array.from({ length: totalStickers }, (_, index) => (
            <div
              key={index}
              className="p-0 border"
              style={{
                height: `${settings.Sheight}${settings.units}`,
                width: `${settings.Swidth}${settings.units}`,
                marginBlock: `${settings.Vspace}${settings.units}`,
                marginInline: `${settings.hspace}${settings.units}`,
                transition: "all 0.3s ease-in-out",
              }}
            >
              {getStickerContent(index) ? (
                <>
                  <p className="text-start mb-0 text-[10px]">{`BLACK CARDAMOM 25 GM`}</p>
                  <div className="flex justify-between">
                    <p className="text-start text-[10px]">
                      Size: {BarcodeData.size}
                    </p>
                    <p className="text-start text-[10px]">
                      Net Qty: {BarcodeData.net_qty}
                    </p>
                  </div>
                  <Barcode value={generatedCode} format="EAN13" />
                  <p className="text-[10x] font-bold text-center">
                    {`MRP ₹ ${BarcodeData.mrp}`}
                  </p>
                 
                  <p className="text-center pl-2 mt-0 text-[10px] underline font-bold">
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
