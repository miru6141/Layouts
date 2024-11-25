import { useState, useRef } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

export const BarcodePreview = ({setting}) => {
  const [settings] = useState({
    rows: 6,
    cols: 5,
    hspace: 1,
    Vspace: 4,
    width: 222,
    height: 270,
    Pwidth: 1400,
    Pheight: 1640,
    mtop: null,
    mbottom: null,
    mleft: null,
    mright: null,
  });
  
  

  const [generatedCode] = useState("123456789101"); // For the generated barcode

  const printRef = useRef(null);

  // const handlePrint = () => {
  //   if (printRef.current) {
  //     const printContent = printRef.current.innerHTML;
  //     const originalContent = document.body.innerHTML;

  //     // Replace body content with the specific `div` content for printing
  //     document.body.innerHTML = `<div style="width: ${settings.Pwidth}px; height: ${settings.Pheight}px; margin: 0 auto;">${printContent}</div>`;
  //     window.print();

  //     // Restore the original body content after printing
  //     document.body.innerHTML = originalContent;
  //     window.location.reload(); // Reload to restore events
  //   }
  // };

  return (
    <>
      
       <div ref={printRef} className=" flex  m-0  justify-center items-center" >
        {/* <button onClick={handlePrint}></button> */}
       <div
        
        className="grid  items-center p-4 justify-center"
        style={{
          gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          width: `${settings.Pwidth}px`,
          height: `${settings.Pheight}px`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {Array.from({ length: settings.rows * settings.cols }, (_, index) => (
          <div
            key={index}
            className="border p-1 "
            style={{
              height: `${settings.height}px`,
              width: `${settings.width}px`,
              marginBlock: `${settings.Vspace}px`,
              marginInline: `${settings.hspace}px`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {generatedCode && (
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
            )}
          </div>
        ))}
      </div>

       </div>
     
    </>
  );
};
