import  { useState } from 'react';

function BarcodeLayoutSetting() {
  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [hspace,setHspace]=useState();
  const [Vspace,setVspace]=useState();
  const [width,setWidth]=useState();
  const [height,setHeight]=useState();
  

  return (
    <div className="p-4 space-y-4 grid grid-cols-2">
      {/* Input for Rows and Columns */}
      <div className=" flex space-x-4 space-y-4">

      <p className='m-4'>Lable Setup(MM)</p>
        <div className=''>
        <div className='space-x-9'>
        <label htmlFor="">Row</label>
        <input 
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>
       
        <div className='space-x-3'>
        <label htmlFor="">Column</label>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>

        <div className='space-x-3'>
        <label htmlFor="">V Space</label>
        <input 
          type="number"
          value={Vspace}
          onChange={(e) => setVspace(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>
        </div>
       
         <div>
         <div className='space-x-9'>
        <label htmlFor="">Width</label>
        <input 
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>
       
        <div className='space-x-3'>
        <label htmlFor="">Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>

        <div className='space-x-3'>
        <label htmlFor="">H Space</label>
        <input 
          type="number"
          value={hspace}
          onChange={(e) => setHspace(Number(e.target.value))}
          className="border rounded py-[2px] px-[1px] text-sm"
        />
        </div>
         </div>
        
       
        
      </div>

      {/* Dynamic Grid */}
      <div
        className="grid gap-2 border p-4"
         style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }, (_, index) => (
          <div
            key={index}
            className="border bg-gray-200 flex items-center justify-center h-20"
          >
            Barcode {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarcodeLayoutSetting;
