import { useState } from "react";
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";

const Code128Barcode = () => {
  const [generatedCode, setGeneratedCode] = useState(""); // For the generated barcode
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value); // Input will be a string
  };

  const handleGenerate = () => {
    let randomDigits = [];
    for (let i = 0; i < 10; i++) {
      // Generate a random alphanumeric string
      const charSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let char = charSet[Math.floor(Math.random() * charSet.length)];
      randomDigits.push(char);
    }

    const generatedValue = randomDigits.join("");
    setGeneratedCode(generatedValue);
  };

  return (
    <div className="w-full">
      <h1>Code 128 Barcode Generator</h1>

      <input
        type="text"
        placeholder="Enter Number of Barcodes"
        className="outline-none border border-black rounded-md"
        onChange={handleChange}
      />
      <button
        onClick={handleGenerate}
        className="ml-[5px] py-[10px] px-[20px] text-[16px] text-white cursor-pointer bg-slate-400 hover:bg-slate-500 rounded-md"
      >
        Generate
      </button>

      <div className="mt-[5px] grid grid-cols-5 text-center gap-14 justify-start">
        {Array.from({ length: parseInt(input || 0) }, (_, i) => (
          <div className="mt-[10px] w-[47.5mm] h-[39mm]" key={i}>
            {generatedCode && (
              <>
                <p className="text-start mb-2 text-[12px]">{`BLACK CARDAMOM 25 GM`}</p>
                <div className="flex justify-between">
                  <p className="text-start text-[12px]">Size: {BarcodeData.size}</p>
                  <p className="text-start text-[12px]">Net Qty: {BarcodeData.net_qty}</p>
                </div>

                <Barcode value={generatedCode} format="CODE128" />
                <p className="text-[14px] font-extrabold text-center">{`MRP ₹ ${BarcodeData.mrp}`}</p>
                <p className="text-[12px] text-center font-semibold">(Inclusive of All Taxes)</p>
                <p className="text-[14px] text-start font-extrabold">{`OFFER ₹ ${BarcodeData.offer}`}</p>

                <p className="text-center pl-4 text-[12px] underline font-bold">
                  {BarcodeData.company_name}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Code128Barcode;
