import { useState } from 'react';
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";



function BarcodeLayoutSetting() {
  const [settings, setSettings] = useState({
    rows: 0,
    cols: 0,
    hspace: 0,
    Vspace: 0,
    width: null,
    height: null,
    Pwidth: null,
    Pheight: null,
    mtop: null,
    mbottom: null,
    mleft: null,
    mright: null,
  });

  const [generatedCode, setGeneratedCode] = useState(""); // For the generated barcode
 


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

  // Universal change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value), // Convert value to number if not empty
    }));
  };

  

  return (
    <div className="p-4 space-y-4 grid grid-cols-2 ">
      {/* Input for Rows and Columns */}
      <div className="flex flex-col space-x-4 space-y-4 border-r p-4 border-black">

      <h1>EAN-13 Barcode Generator</h1>


<button
  onClick={handleGenerate}
  className="ml-[5px] py-[10px] px-[20px] text-[16px] text-white cursor-pointer bg-slate-400 hover:bg-slate-500 rounded-md"
>
  Generate
</button>
        <div className="flex text-[10px] gap-7 ml-4">
          <div className="flex flex-col">
            <label htmlFor="">Paper Size</label>
            <select id="cars" name="cars" className="border rounded-md" size={1}>
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Letter">Letter</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Width</label>
            <input
              type="number"
              name="Pwidth"
              value={settings.Pwidth || ''}
              onChange={handleChange}
              className="border  p-1   w-[3.5rem] h-[1.25rem]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Height</label>
            <input
              type="number"
              name="Pheight"
              value={settings.Pheight || ''}
              onChange={handleChange}
              className="border  p-1  w-[3.5rem] h-[1.25rem]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">MM</label>
            <input
              type="number"
              name="rows"
              value={settings.rows || ''}
              onChange={handleChange}
              className="border p-1  w-[3.5rem] h-[1.25rem]"
            />
          </div>
        </div>

        <p className="text-sm">Label Setup (MM)</p>
        <div className="flex text-[10px] gap-16">
          <div className="space-y-4">
            <div className="space-x-12">
              <label htmlFor="">Row</label>
              <input
                type="number"
                name="rows"
                value={settings.rows || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-8">
              <label htmlFor="">Column</label>
              <input
                type="number"
                name="cols"
                value={settings.cols || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-8">
              <label htmlFor="">V Space</label>
              <input
                type="number"
                name="Vspace"
                value={settings.Vspace || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-x-9">
              <label htmlFor="">Width</label>
              <input
                type="number"
                name="width"
                value={settings.width || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-8">
              <label htmlFor="">Height</label>
              <input
                type="number"
                name="height"
                value={settings.height || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-7">
              <label htmlFor="">H Space</label>
              <input
                type="number"
                name="hspace"
                value={settings.hspace || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
          </div>
        </div>

        <p className="text-sm">Page Margins (MM)</p>
        <div className="flex text-[10px] gap-2">
          <div className="space-y-4">
            <div className="space-x-10">
              <label htmlFor="">Left</label>
              <input
                type="number"
                name="mleft"
                value={settings.mleft || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-8">
              <label htmlFor="">Right</label>
              <input
                type="number"
                name="mright"
                value={settings.mright || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
          </div>
          <div className="space-y-4 ml-16">
            <div className="space-x-14">
              <label htmlFor="">Top</label>
              <input
                type="number"
                name="mtop"
                value={settings.mtop || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]"
              />
            </div>
            <div className="space-x-10">
              <label htmlFor="">Bottom</label>
              <input
                type="number"
                name="mbottom"
                value={settings.mbottom || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Grid */}
      <div
        className="grid  border   border-black w-[650px] h-[600px] overflow-hidden"
        style={{
          //gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          //gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          marginLeft: `${settings.mleft}px`,
          marginRight: `${settings.mright}px`,
          marginTop: `${settings.mtop}px`,
          marginBottom: `${settings.mbottom}px`,
          position: "relative",
           overflow:'scroll'
        }}
      >
        <div
          className="grid  border "
          style={{
            gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
            position: "absolute",
            width: `${settings.Pwidth}px`,
            height: `${settings.Pheight}px`,
            transition: "all 0.3s ease-in-out",
            
          
          }}
        >
          {Array.from({ length: settings.rows * settings.cols }, (_, index) => (
            <div
              key={index}
              className="border  "
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
             <p className="text-start mb-2 text-[10px]">{`BLACK CARDAMOM 25 GM`}</p>
             <div className="flex justify-between">
             <p className=" text-start text-[10px] ">
                Size: {BarcodeData.size} 
              </p>
              <p className=" text-start text-[10px] ">
                Net Qty: {BarcodeData.net_qty} 
              </p>
             </div>
             
             
              <Barcode value={generatedCode}  />
              <p className="text-[12px] font-extrabold  text-center ">{`MRP ₹ ${BarcodeData.mrp}`}</p>
              <p className="text-[10px]  text-center font-semibold">(Inclusive of All Taxes)</p>
              <p className="text-[12px] text-start font-extrabold">{`OFFER ₹ ${BarcodeData.offer}`}</p>

              <p className="text-center pl-4 text-[10px]  underline font-bold ">{BarcodeData.company_name}</p>

          
            </>
          )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BarcodeLayoutSetting;
