import  { useState } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

const Ean_13Barcode = () => {
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
    <div className=" w-[4in] justify-items-start ">
      <h1 className="text-[10px]">EAN-13 Barcode Generator</h1>

      <input 
        type="text"
        placeholder="Enter Number of Barcode"
        className="outline-none border border-black rounded-md w-[64px] h-[25px]"
        onChange={handleChange}
      />
      <button
        onClick={handleGenerate}
        className="ml-[10px] py-[5px] px-[8px] text-[8px] text-white cursor-pointer bg-slate-400 hover:bg-slate-500 rounded-md"
      >
        Generate
      </button>
            
        <div className="mt-[2px]  w-[3in] grid grid-cols-2 text-center gap-4">

            

      {Array.from({ length: parseInt(input || 0) }, (_, i) => (
        <div className="mt-[50px]  w-[3in] h-[107px] text-[8px] px-1 py-1  " key={i}>
          {generatedCode && (
            <>
              <div className="flex gap-2 justify-start ">
                <p className="text-[8px] text-start">{`MRP `}<span className="font-bold text-[10px]">  ₹{BarcodeData.mrp}</span></p>
                <p className="text-[8px]  ">{`OFFER `} <span className="font-bold text-[10px]">  ₹{BarcodeData.offer}</span></p>
              </div>
              <p className="border-t border-b border-black w-[130px] text-start text-[10px] font-bold ">
                Size: {BarcodeData.size}
              </p>
              <p className="text-start  text-[10px] font-bold">{`BLACK CARDAMOM 25 GM`}</p>
              <Barcode value={generatedCode} />
              <p className="text-start pl-4 text-[10px]  underline font-bold">{BarcodeData.company_name}</p>
            </>
          )}
        </div>
      ))}

</div>

    </div>
  );
};

export default Ean_13Barcode;
