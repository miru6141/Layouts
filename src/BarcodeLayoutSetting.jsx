import { useEffect, useState } from 'react';
import Barcode from "./Barcode";
import BarcodeData from "./assets/BarcodeData.json";
import { BarcodePreview } from './BarcodePreview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BarcodeLayoutSetting() {
  const [settings, setSettings] = useState({
    rows: 0,
    cols: 0,
    hspace: 0,
    Vspace: 0,
    Swidth: null,
    Sheight: null,
    Pwidth: null,
    Pheight: null,
    mtop: 0,
    mbottom: 0,
    mleft: null,
    mright: 0,
    units:'MM',
    barcode_type:"EAN13",
    select_font:null,
    font_size:10,
    barcode_width:1,
    barcode_height:20,
    barcode_font:18,
    barcode_margin:10,


  });

  const [generatedCode, setGeneratedCode] = useState(""); 
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 
  const handleGenerate = () => {




     if( settings.barcode_type==='EAN13'){
      let randomDigits = [];
      for (let i = 0; i < 9; i++) {
        let digit = Math.floor(Math.random() * 10);
        randomDigits.push(digit);
      }
  
      const AllDigits = randomDigits.join("");
      const prefixValue = "890";
      const newVlaue = `${prefixValue}${AllDigits}`;
      const checkDigit = calculateCheckDigitforEAN13(newVlaue);
      setGeneratedCode(`${newVlaue}${checkDigit}`);
     }
     if(settings.barcode_type==='CODE128'){
      let randomDigits = [];
    for (let i = 0; i < 10; i++) {
      // Generate a random alphanumeric string
      const charSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let char = charSet[Math.floor(Math.random() * charSet.length)];
      randomDigits.push(char);
    }

    const generatedValue = randomDigits.join("");
    setGeneratedCode(generatedValue);
     }


if (settings.barcode_type === 'UPC') {
  let randomDigits = [];
  for (let i = 0; i < 11; i++) {
    let digit = Math.floor(Math.random() * 10);
    randomDigits.push(digit);
  }

  const AllDigits = randomDigits.join("");
  const checkDigit = calculateCheckDigitforUPC(AllDigits);
  setGeneratedCode(`${AllDigits}${checkDigit}`);
}
    
   
  };

  // Function to calculate the EAN-13 check digit
  const calculateCheckDigitforEAN13 = (number) => {
    const sum = [...number]
      .map((digit, i) => (i % 2 === 0 ? +digit : +digit * 3))
      .reduce((acc, val) => acc + val, 0);
    return (10 - (sum % 10)) % 10; // Calculate the check digit
  };




  function calculateCheckDigitforUPC(code) {
    let sum = 0;
    for (let i = 0; i < code.length; i++) {
      let digit = parseInt(code[i]);
      if (i % 2 === 0) {
        sum += digit * 3; // Multiply odd-position digits by 3
      } else {
        sum += digit; // Add even-position digits
      }
    }
    const modulo = sum % 10;
    return modulo === 0 ? 0 : 10 - modulo;
  }

     const [widthExceeded, setWidthExceeded] = useState(false);
    const [heightExceeded, setHeightExceeded] = useState(false);
  

    useEffect(() => {
        if (settings.Swidth * settings.cols > settings.Pwidth && !widthExceeded) {
            toast("The size of the sticker exceeds the paper width");
            setWidthExceeded(true);
          
          
        } else if (settings.Swidth * settings.cols <= settings.Pwidth && widthExceeded) {
            setWidthExceeded(false);
        }

        if (settings.Sheight * settings.rows > settings.Pheight && !heightExceeded) {
            toast("The size of the sticker exceeds the paper height");
            setHeightExceeded(true);
        } else if (settings.Sheight * settings.rows <= settings.Pheight && heightExceeded) {
            setHeightExceeded(false);
        }
    }, [settings, widthExceeded, heightExceeded]);
           

  const handleChange = (e) => {
    const { name, value } = e.target;

   

    if (widthExceeded && (name === "Swidth" )) {
    setSettings(prevSettings => ({
        ...prevSettings,
        Swidth: prevSettings.Swidth - 1
    }));
    return  // Exit the function after updating the state
}

    // Prevent changes if height is exceeded
    if (heightExceeded && (name === "Sheight" )) {
            setSettings(prevSettings => ({
        ...prevSettings,
        Sheight: prevSettings.Sheight - 1
    }));
        return; // Do nothing if height is exceeded and trying to update Sheight or rows
    }

       if (widthExceeded && ( name === "cols")) {
    setSettings(prevSettings => ({
        ...prevSettings,
        cols: prevSettings.cols - 1
    }));
    return  // Exit the function after updating the state
}
    if (heightExceeded && ( name === "rows")) {
            setSettings(prevSettings => ({
        ...prevSettings,
        rows: prevSettings.rows - 1
    }));
        return; // Do nothing if height is exceeded and trying to update Sheight or rows
    }
  
    setSettings((prev) => {
      if (name === "papersize") {
        if (value === "A4") {
          return {
            ...prev,
            Pwidth: 210, 
            Pheight: 297,
            Swidth:40,
            Sheight:48,
            rows:6,
            cols:5,
            [name]: value,
          };
        } else if (value === "4in") {
          return {
            ...prev,
            Pwidth: 105, // 4 inches in mm
            Pheight: 123, // 4 inches in mm
            Swidth:50,
            Sheight:38,
            rows:3,
            cols:2,
            [name]: value, // Update the selected paper size
          };
        }  else if (value === "Custom") {
          return {
            ...prev,
            Pwidth: 0, // 4 inches in mm
            Pheight: 0, // 4 inches in mm
            Swidth:0,
            Sheight:0,
            rows:0,
            cols:0,
            [name]: value, // Update the selected paper size
          };
        }
      }
      return {
        ...prev,
        [name]: value === '' ? 0 : value, // Handle other fields
      };
    });
  };
  
       
  // const conversionFactors = {
  //   mm: { mm: 1, CM: 0.1, Inch: 0.0393701, px: 3.78 },
  //   CM: { MM: 10, CM: 1, Inch: 0.393701, Pixels: 37.8 },
  //   Inch: { MM: 25.4, CM: 2.54, Inch: 1, Pixels: 96 },
  //   px: { mm: 0.264583, CM: 0.0264583, Inch: 0.0104167, px: 1 },
  // };

  //console.log(settings.units)

  

  // const handleUnitChange = (e) => {
  //   const newUnit = e.target.value;
  //   const currentUnit = settings.units;

    // Convert all numeric values in `settings` to the new unit
  //   const updatedSettings = Object.fromEntries(
  //     Object.entries(settings).map(([key, value]) => {
  //       if (typeof value === 'number' && !isNaN(value)) {
  //         return [key, value * conversionFactors[currentUnit][newUnit]];
  //       }
  //       return [key, value];
  //     })
  //   );

  //   setSettings({ ...updatedSettings, units: newUnit });
 //  };
        
    
     
    
           

  return (
    <>
<ToastContainer/>

    <div className="p-4  space-y-4 grid md:grid-cols-3 grid-row bg-gray-100 ">
     
      <div className="flex flex-col space-x-4 space-y-4  p-4 gap-5 md:col-span-1 w-full bg-gray-100 ">

      <div className='ml-4'>

      
      <select name="barcode_type" id="" className='border text-[0.6rem] w-[7.5rem] h-[1.25rem]' size={1} value={settings.barcode_type} onChange={handleChange}>
        <option value="EAN13" >EAN 13</option>
        <option value="CODE128">CODE 128</option>
        <option value="UPC">UPC</option>
      </select>

      <button
           onClick={handleGenerate}
           className="ml-[5px] h-[1rem] w-[4rem] text-[8px] text-white cursor-pointer bg-slate-400 hover:bg-slate-500 rounded-md"
           >
           Generate
      </button>

      </div>
    
        <div className="flex  md:flex-row flex-col text-[10px] gap-16 ml-4">

          <div className='flex flex-row gap-11'>
          <div className="flex flex-col">
            <label htmlFor="">Paper Size</label>
            <select id="papersize" name="papersize" className="border  w-[3.5rem] h-[1.25rem]"  onChange={handleChange} >
              
              <option value="Custom">Custom</option>
              <option value="A4">A4</option>
              <option value="4in">4inches</option>
              
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="units">units</label>
            <select id="units"  name="units"   value={settings.units} className="border  w-[3.5rem] h-[1.25rem]"   onChange={handleChange}>
              <option value="mm">MM</option>
              <option value="cm">CM</option>
              <option value="in">Inch</option>
              <option value="px">Pixels</option>
            </select>
          </div>
          </div>

          <div className='flex flex-row gap-11'>
             
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
          

          </div>
         
         
        </div>
          
          <div className='flex gap-8'>


            <div className='flex flex-col text-[10px]'>
            <label htmlFor="">Font Name</label>
        <select
        name="select_font"
        id="select_font"
        className="border"
        size={1}
        value={settings.select_font}
        onChange={ handleChange}
      >
        <option value="Poppins">Poppins</option>
        <option value="Sans-Serif">Sans-Serif</option>
        <option value="Arial">Arial</option>
        <option value="italic">Italic</option>
        <option value="Bold">Bold</option>
      </select>
            </div>

            <div className='flex flex-col text-[10px] '>
            <label htmlFor=""> Font Size</label>
            <input type="numbers"  className='border  p-1  w-[3.5rem] h-[1.25rem]' name='font_size' onChange={handleChange}/>
            </div>

          </div>

        <p className="text-sm">{`Label Setup (${settings.units})`}</p>
        <div className="flex md:flex-row flex-col  text-[10px] gap-16">
             
             <div className='flex  gap-[4rem]'>  
              
             <div className='flex flex-col  gap-6'>
                <label htmlFor="">Row</label>
                <label htmlFor="">Column</label>
                <label htmlFor="">VSpace</label>
           </div>

           <div className='flex flex-col gap-4'>

              

                    <input  type="number"
                name="rows"
                value={settings.rows || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"/>
 
                <input type="number"
                name="cols"
                value={settings.cols || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]" />

                <input  type="number"
                name="Vspace"
                value={settings.Vspace || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]" />
           </div>    
              
             </div>
          

          
          <div className="flex  gap-[4rem]">

          <div className='flex flex-col gap-[1.5rem]'>             
                <label htmlFor="">Width</label>
                <label htmlFor="">Height</label>
                <label htmlFor="">HSpace</label>
           </div>

           <div className='flex flex-col gap-4'>


                    <input type="number"
                name="Swidth"
                value={settings.Swidth || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"/>
 
                <input type="number"
                name="Sheight"
                value={settings.Sheight || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]" />

                <input  type="number"
                name="hspace"
                value={settings.hspace || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]" />
           </div>
            
          </div>
        </div>

        <p className="text-sm">{`Barcode Setup (${('px')})`} </p>

        <div className='flex md:flex-row flex-col gap-[4rem]'>

     <div className="flex gap-[4rem] text-[10px] ">
     <div className='flex flex-col gap-[1.5rem]'>
      <label htmlFor="">B-width</label>
     <label htmlFor="">B-Height</label>
     </div>

  <div className='flex flex-col gap-4'>
             <input  type="number"
                name="barcode_width"
                value={settings.barcode_width || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"/>

              <input type="number"
                name="barcode_height"
                value={settings.barcode_height || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]"/>
          </div>
          </div>
  
        <div className="flex gap-[4rem]  text-[10px] ">

          <div className='flex flex-col gap-[1.5rem]'>
          <label htmlFor="">Font</label>
          <label htmlFor="">Margin</label>
        </div>

       <div className='flex flex-col gap-4'> 
        <input type="number"
         disabled={settings.barcode_type === "EAN13" || settings.barcode_type === "UPC"} 
         name="barcode_font"
         value={settings.barcode_font || ''}
         onChange={handleChange}
         className="border  p-1 w-[3.5rem] h-[1.25rem]"/>
       
      <input  type="number"
       disabled={settings.barcode_type === "EAN13" || settings.barcode_type === "UPC"} 
         name="barcode_margin"
         value={settings.barcode_margin || ''}
         onChange={handleChange}
         className="border  p-1  w-[3.5rem] h-[1.25rem]" />
     </div>

   </div>

  </div>


      

        <p className="text-sm">{`Page Margins (${(settings.units)})`} </p>

    <div className='flex md:flex-row flex-col gap-[4rem]'>

       <div className="flex gap-[5rem] text-[10px] ">
         <div className='flex flex-col gap-[1.5rem]'>
          <label htmlFor="">Left</label>
          <label htmlFor="">Right</label>
         </div>

         <div className='flex flex-col gap-4'>
         <input
                type="number"
                name="mleft"
                value={settings.mleft || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]"/>

          <input type="number"
           name="mright"
           value={settings.mright || ''}
           onChange={handleChange}
           className="border  p-1  w-[3.5rem] h-[1.25rem]" />
         </div>
       </div>

        <div className="flex gap-[4rem]  text-[10px] ">

          <div className='flex flex-col gap-[1.5rem]'>
           <label htmlFor="">Top</label>
           <label htmlFor="">Bottom</label>
          </div>

        <div className='flex flex-col gap-4'> 
          <input type="number"
                name="mtop"
                value={settings.mtop || ''}
                onChange={handleChange}
                className="border  p-1 w-[3.5rem] h-[1.25rem]"/>
         <input  type="number"
                name="mbottom"
                value={settings.mbottom || ''}
                onChange={handleChange}
                className="border  p-1  w-[3.5rem] h-[1.25rem]" />
        </div>

       </div>

     </div>

     

      </div>

      {/* Dynamic Grid */}
      <div
        className="grid md:col-span-2 border  bg-white   border-black overflow-hidden scroll-container "
        style={{
          gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
         
          position: "relative",
           overflow:'scroll'
        }}
      >
        <div
          className="grid  border"
          style={{
            gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
            position: "absolute",
            width: `${settings.Pwidth}${settings.units}`,
            height: `${settings.Pheight}${settings.units}`,
            transition: "all 0.3s ease-in-out",
            marginLeft: `${settings.mleft}${settings.units}`,
            marginRight: `${settings.mright}${settings.units}`,
            marginTop: `${settings.mtop}${settings.units}`,
            marginBottom: `${settings.mbottom}${settings.units}`,
       
          }}
        >
          {Array.from({ length: settings.rows * settings.cols }, (_, index) => (
            <div
              key={index}
              className="border  "
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

              <div className='p-1' style={{
                 fontSize:`${settings.font_size}px`,
                 fontFamily:`${settings.select_font}`
              }}>
              <p className="text-start mb-1 ">{`BLACK CARDAMOM 25 GM`}</p>
             <div className="flex justify-between">
             <p className=" text-start  ">
                Size: {BarcodeData.size} 
              </p>
              <p className=" text-start  ">
                Net Qty: {BarcodeData.net_qty} 
              </p>
             </div>
             
             
              <Barcode value={generatedCode} format={settings.barcode_type} width={settings.barcode_width} height={settings.barcode_height} font={settings.barcode_font} margin={settings.barcode_margin} />
              <p className=" font-extrabold  text-center  " style={{
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
     
    </div>
       
     <div className='grid md:grid-cols-3 grid-cols-2 p-[0.5rem] bg-gray-100 '>

         <div className='text-[12px] ml-[2.5rem] md:col-span-1 '>

           <div className=' flex gap-4'>
             <input type="checkbox" />
             <p>Save as Templete</p>
           </div>
           <div className='space-x-4 space-y-4'>
                 <input type="text" className='border' />
                 <button className='bg-blue-600 text-white px-2 py-[1px]'>Save</button>
           </div>

      </div>
      
      <div className='text-end md:col-span-2'>
      <button
        className="bg-blue-600 mr-[0.75rem] px-2 py-[1px] text-white"
        onClick={handleOpenModal}
      >
        Preview
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded shadow-lg max-h-screen   overflow-y-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black text-xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <BarcodePreview  settings={settings} generatedCode={generatedCode}/>
          </div>
        </div>
      )}
    </div>
        </div>
    </>
  );
}

export default BarcodeLayoutSetting;
