/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

export const BarcodePreview = ({settings,generatedCode}) => {
 

  
  

  // For the generated barcode

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
      
       <div ref={printRef} className=" flex  w-auto  m-0 " >
        {/* <button onClick={handlePrint}></button> */}
       <div
        
        className="grid   p-4"
        style={{
          // eslint-disable-next-line react/prop-types
          gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          width: `${settings.Pwidth}${settings.units}`,
          height: `${settings.Pheight}${settings.units}`,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {Array.from({ length: settings.rows * settings.cols }, (_, index) => (
          <div
            key={index}
            className="border p-1 "
            style={{
              height: `${settings.Sheight}${settings.units}`,
              width: `${settings.Swidth}${settings.units}`,
              marginBlock: `${settings.Vspace}${settings.units}`,
              marginInline: `${settings.hspace}${settings.units}`,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {generatedCode && (
              <>
             <div className='p-2' style={{
                 fontSize:`${settings.font_size}px`
              }}>
              <p className="text-start mb-2 ">{`BLACK CARDAMOM 25 GM`}</p>
             <div className="flex justify-between">
             <p className=" text-start  ">
                Size: {BarcodeData.size} 
              </p>
              <p className=" text-start  ">
                Net Qty: {BarcodeData.net_qty} 
              </p>
             </div>
             
             
             <Barcode value={generatedCode} format={settings.barcode_type} width={settings.barcode_width} height={settings.barcode_height} font={settings.barcode_font} margin={settings.barcode_margin} />
             <p className=" font-extrabold  text-center " style={{
                fontSize:`${settings.font_size}px`
              }}>{`MRP ₹ ${BarcodeData.mrp}`}
          
              </p>
              <p className=" text-center font-semibold">(Inclusive of All Taxes)</p>
              <p className="  text-start font-extrabold"  style={{
                fontSize:`${settings.font_size}px`
              }}>{`OFFER ₹ ${BarcodeData.offer}`}</p>
              <p className="text-center pl-4  underline font-bold ">{BarcodeData.company_name}</p>

              </div>
              </>
            )}
          </div>
        ))}
      </div>

       </div>
     
    </>
  );
};
