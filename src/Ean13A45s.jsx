
import  { useState } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";


const Ean13A45s = () => {
  const [generatedCode, setGeneratedCode] = useState(""); // For the generated barcode
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value); // Input will be a string
  };

  const handleGenerate = () => {
    let randomDigits = [];
    for (let i = 0; i < 9; i++) {
      let digit = Math.floor(Math.random() * 10);
      randomDigits.push(digit);
    }

    const AllDigits = randomDigits.join("");
    const prefixValue = "890";
    const newVlaue = `${prefixValue}${AllDigits}`;
    const checkDigit = calculateCheckDigit(newVlaue);
    setGeneratedCode(`${newVlaue}${checkDigit}`);
  };

  // Function to calculate the EAN-13 check digit
  const calculateCheckDigit = (number) => {
    const sum = [...number]
      .map((digit, i) => (i % 2 === 0 ? +digit : +digit * 3))
      .reduce((acc, val) => acc + val, 0);
    return (10 - (sum % 10)) % 10; // Calculate the check digit
  };

  return (
    <div className=" w-full ">
      
      <h1>EAN-13 Barcode Generator</h1>

      <input
        type="text"
        placeholder="Enter Number of Barcode"
        className="outline-none border border-black rounded-md"
        onChange={handleChange}
      />
      <button
        onClick={handleGenerate}
        className="ml-[5px] py-[10px] px-[20px] text-[16px] text-white cursor-pointer bg-slate-400 hover:bg-slate-500 rounded-md"
      >
        Generate
      </button>
            
        <div className="mt-[5px] grid grid-cols-5 text-center gap-14 justify-start ">

            

      {Array.from({ length: parseInt(input || 0) }, (_, i) => (
        <div className=" mt-[10px]  w-[47.5mm] h-[39mm]" key={i}>
          {generatedCode && (
            <>
             <p className="text-start mb-2 text-[12px]">{`BLACK CARDAMOM 25 GM`}</p>
             <div className="flex justify-between">
             <p className=" text-start text-[12px] ">
                Size: {BarcodeData.size} 
              </p>
              <p className=" text-start text-[12px] ">
                Net Qty: {BarcodeData.net_qty} 
              </p>
             </div>
             
             
              <Barcode value={generatedCode}  />
              <p className="text-[14px] font-extrabold  text-center ">{`MRP ₹ ${BarcodeData.mrp}`}</p>
              <p className="text-[12px]  text-center font-semibold">(Inclusive of All Taxes)</p>
              <p className="text-[14px] text-start font-extrabold">{`OFFER ₹ ${BarcodeData.offer}`}</p>

              <p className="text-center pl-4 text-[12px]  underline font-bold ">{BarcodeData.company_name}</p>

          
            </>
          )}
        </div>
      ))}

</div>

    </div>
  );
};


export default Ean13A45s