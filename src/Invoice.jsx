import InvoiceData from './assets/InvoiceData.json'

const Invoice = () => {

   const totalTaxableAmount = InvoiceData.items.reduce((total, item) => total + parseFloat(item.taxable_value || 0), 0);
    console.log(totalTaxableAmount)


    
const totalItems = InvoiceData.items.length;

// Number of rows on the first page
const firstPageRows = 20;

// Number of rows on subsequent pages
const subsequentPageRows = 30;

// Calculate the total pages
let pageCount;
if (totalItems <= firstPageRows) {
  // Only one page if items fit in the first page limit
  pageCount = 1;
} else {
  // First page takes `firstPageRows`, then the remaining are in groups of `subsequentPageRows`
  pageCount = 1 + Math.ceil((totalItems - firstPageRows) / subsequentPageRows);
}

console.log("Total pages:", pageCount);


/*function convertNumberToWords(num,index) {
  const belowTwenty = [
      "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
      "seventeen", "eighteen", "nineteen"
  ];
  const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];
  const thousands = ["", "thousand", "million", "billion"];

  function helper(n, ) {
      if (n === 0) return '';
      if (n < 20) return belowTwenty[n - 1] + ' ';
      if (n < 100) return tens[Math.floor(n / 10)] + ' ' + helper(n % 10, 0);
      return belowTwenty[Math.floor(n / 100) - 1] + ' hundred ' + helper(n % 100, 0);
  }

  function convert(num) {
      if (num === 0) return 'zero';
      let result = '';
      let index = 0;
      while (num > 0) {
          if (num % 1000 !== 0) {
              result = helper(num % 1000, index) + thousands[index] + ' ' + result;
          }
          num = Math.floor(num / 1000);
          index++;
      }
      return result.trim();
  }

  return convert(num) + 'only';
}

const numberInWords = convertNumberToWords(InvoiceData.totals.grand_total);
console.log(numberInWords);  // Output: "five thousand five hundred twenty nine only" */




 
  return (
    <>
    
    <div className='text-end p-1 text-sm '>
    <button onClick={() => window.print()} className="btn-print  text-black px[1px]- py-[0.5px] rounded-md print:hidden">
      Print Invoice
    </button>

    </div>
   
    <div className='h-auto border bg-white border-black m-2 print:max-w-full '>
   

     <div className='text-center mt-2'>
        <h1 className='text-2xl font-semibold font-serif '>{InvoiceData.company.name.toUpperCase()}</h1>
        <p>{InvoiceData.company.address.area}</p>
        <p>{InvoiceData.company.address.district}</p>
        <p>{InvoiceData.company.email}</p>
     </div>

     <div className='mt-1 flex flex-row justify-between border-t border-b border-black text-[10px]'>
        <h1 className='ml-2 font-semibold'>{`GSTN : ${InvoiceData.company.GSTIN}`}</h1>
        <h1 className='mr-20 font-semibold'>{`Contact Us ${InvoiceData.company.contact}`}</h1>
     </div>
     
     <div className=' text-center border-b border-black '>
        <h1 className='font-semibold text-xl font-serif'>TAX INVOICE</h1>
     </div>

     <div className=' text-center border-b border-black  grid grid-cols-3 '>
        <h1 className=' text-[14px] border-r border-black col-span-2 '>Deatils of Receiver | Billed to :</h1>
        <h1 className=' text-[14px]'> Invoice Deatils:</h1>
     </div>
        
     <div className='grid grid-cols-3'>

       <div className='col-span-2 border-r border-black ml-1 text-[10px] '>
             <h1 className='pt-1 pb-3 font-bold' >{`Name and Address : ${InvoiceData.receiver.name}`}</h1>
             <p>{InvoiceData.receiver.address.area}</p>
             <p>{InvoiceData.receiver.address.state}</p>
             <p>{`Contact Person : ${InvoiceData.receiver.contact_person}`}</p>
             <p>{`Contact No. : ${InvoiceData.receiver.contact_number}`}</p>
             <div className='flex'>
               <p>{`GSTN = ${InvoiceData.receiver.GSTIN || ""},`}</p>
               <p>{`PAN : ${InvoiceData.receiver.PAN ||""},`}</p>
               <p>{`Adhaar No. : ${InvoiceData.receiver.GSTIN ||" "}`}</p>
             </div>
      </div>

      <div className='ml-2 text-[10px]'>
           <ul className='space-y-1'>
            <li className='font-semibold'>{`Invoice No.: ${InvoiceData.invoice.number}`}</li>
            <li className='font-semibold'>{`Invoice Date : ${InvoiceData.invoice.date}`}</li>
            <li>{`Transportation : ${InvoiceData.invoice.transportation || ''}`}</li>
            <li>{`Vehical Number : ${InvoiceData.invoice.vehicle_number || ''}`}</li>
            <li>{`Date of Supply : ${InvoiceData.invoice.date_of_supply || ''}`}</li>
            <li>{`Place of Supply : ${InvoiceData.invoice.number.place_of_supply || ''}`}</li>
           </ul>
      </div>

     </div>

     <div className="h-auto">
         <table className='w-full  text-[10px] border-t border- border-black '>
            <thead className='bg-gray-100 text-[8px]'>
             <tr >
             <th >S.N</th>
             <th className='border-l border-black'>ITEM DESCRIPTION</th>
             <th className='border-l border-black'>HSN <br />CODE</th>
             <th className='border-l border-black'>QUANTITY</th>
             <th className='border-l border-black'>MRP</th>
             <th className='border-l border-black'>Rate</th>
             <th className='border-l border-black'>

               <div className='grid grid-rows-2'>
                  <div className='border-b border-black'>
                    Discount
                  </div>
                  <div className='grid grid-cols-2'>
                       <p className='border-r border-black'>%</p>
                       <p>Amt</p>
                  </div>
               </div>

             </th>
             <th className='border-l border-black'>Taxable <br />Amt.</th>
             <th className='border-l border-black'>GST %</th>
             <th className='border-l border-black'>TOTAL</th>
             </tr>
            </thead>
            
            <tbody className='border-t border-black ' >
            {InvoiceData.items.map((data, index) => (
  <>
    {/* Page break logic */}
    {/* For the first page: Add a page break in tfoot if index exceeds 14 */}
   

    {/* Subsequent pages: Add a page break every 24 items after the first 20 */}
    {index > 20 && (index - 20) % 30 === 0 && (
      <div className='pgbreak'></div>
    )}

    <tr key={data.S_N} className='text-center'>
      <td className='pb-3'>{data.S_N}</td>
      <td className='border-l pl-1 border-black text-start font-semibold'>
        {data.description}
        <p className='mt-1 text-[8px]'>
          {`Model/SL :${data.model_sl || ''}`}
        </p>
      </td>
      <td className='border-l border-black'>{data.hsn}</td>
      <td className='border-l border-black'>{data.quantity}</td>
      <td className='border-l border-black text-end p-1'>
        {data.mrp.toFixed(2)}
      </td>
      <td className='border-l border-black text-end p-1'>
        {data.rate.toFixed(2)}
      </td>
      <td className='border-l border-black'>
        <div className='grid grid-cols-2 '>
          <div className='py-4 border-r border-black'>{data.discount.percentage.toFixed(2)}</div>
          <div className='py-4 text-end p-1'>{data.discount.amt.toFixed(2)}</div>
        </div>
      </td>
      <td className='border-l border-black text-end p-1'>
        {data.taxable_value.toFixed(2)}
      </td>
      <td className='border-l border-black'>{data.gst_rate.toFixed(2)}</td>
      <td className='border-l border-black text-end p-1'>
        {data.total.toFixed(2)}
      </td>
    </tr>
  </>
))}

               </tbody>
               { Array.from({ length:(12)-InvoiceData.items.length }).map((_, i) => (
                      <tr key={`blank-${i}`} className="h-8">
                        <td className=" border-black"></td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black">
                           <div className="grid grid-cols-2  divide-x divide-black">
                            <div className="py-4 "></div>
                            <div className="py-4 "></div>
                           </div>
                         </td>
                        <td className="border-l border-black"> </td>
                        <td className="border-l border-black"></td>
                        <td className="border-l border-black"></td>
                      </tr>
               ))}
                <>
                {InvoiceData.items.length > 14 && pageCount===1 &&  (
                  <div className='pgbreak'></div>

               )}
       
     
               <tfoot >
                 <tr className="text-center font-bold border-b border-black">
                    <td  className=" border-t border-black"></td>
                    <td  className="border-l border-t border-black"></td>
                    <td  className=" border-l border-t border-black "></td>
                    <td  className="border-l border-t border-black ">13</td>
                    <td  className="border-l border-t border-black"></td>
                    <td  className="border-l border-t border-black"></td>
                    <td  className=" border-l border-t border-black "></td>
                    <td  className="border-l border-t border-black"></td>
                    <td  className="border-l border-t border-black"></td>
                    <td  className=" border-l border-t border-black "></td>
                   
                 </tr>
                  </tfoot>
                 
</>
                 
            
         </table>
         
               </div>
              
              <div className='grid grid-cols-3 border-t border-black   '> 
                <div className='col-span-2 border-r border-black'>
                 <table className='w-full  text-[10px]  border-black'>
                  <thead>
                     <tr>
                        <th className=''>Tax Rate</th>
                        <th className='border-l border-black'>Txbl.Amt.</th>
                        <th className='border-l border-black'>Central Tax</th>
                        <th className='border-l border-black'>State Tax</th>
                        <th className='border-l border-black'>Integrated Tax</th>
                        <th className='border-l border-black'>Total</th>
                     </tr>
                  </thead>
 
                  <tbody className='border-t border-b border-black text-[10px] py-2'>
                  {   
                     
                       InvoiceData.tax.map((data)=>(

                   <tr key={data.id} className='mt-0.5'>
                           <td className=''>{data.tax_rate}</td>
                           <td className='border-l border-black text-end pr-1'>{data.txbl_amt.toFixed(2)}</td>

                         <td className="border-l border-black">
                          <div className="grid grid-cols-3">
                            <div className=" py-2 border-r border-black text-end pr-1">{data.central_tax.toFixed(2)}</div>
                            <div className=" py-2 col-span-2 text-end pr-1">{data.central_tax.toFixed(2)}</div>
                          </div>
                         </td>
                        
                         <td className="border-l border-black">
                          <div className="grid grid-cols-3">
                            <div className=" py-2 border-r border-black text-end pr-1">{data.State_tax.toFixed(2)}</div>
                            <div className="py-2 col-span-2 text-end pr-1">{data.State_tax.toFixed(2)}</div>
                          </div>
                         </td>
                           
                         <td className="border-l border-black">
                          <div className="grid grid-cols-3">
                            <div className="py-2 border-r border-black text-end pr-1 ">{data.Integrated_Tax.toFixed(2)}</div>
                            <div className="py-2 col-span-2 text-end pr-1">{data.Integrated_Tax.toFixed(2)}</div>
                          </div>
                         </td>

                           <td className='border-l border-black text-end pr-1'>{data.total.toFixed(2)}</td>
                   </tr>

                       ))

                  }

                   </tbody>
                  
               </table>
            </div>
            <div className='m-2 text-[10px] flex justify-between'>
               <ul className='space-y-1'>
                  <li>Total Amount Before Tax</li>
                  <li>Add: CGST</li>
                  <li>Add: SGST</li>
                  <li>Add: IGST</li>
               </ul>
               <ul className='space-y-1 text-end'>
                   <li>{totalTaxableAmount}</li>
                  <li>{InvoiceData.tax.cgst|| 167.63}</li>
                  <li>{InvoiceData.tax.sgst|| 167.63}</li>
                  <li>{InvoiceData.tax.igst|| 0.00}</li>               
               </ul>
            </div>
     </div>
     
     <div className='border-t border-black grid grid-cols-3'>

             <div className='grid grid-cols-2 text-[10px] col-span-2 border-r border-black '>
              <ul className='space-y-3'>
               <li className='font-bold'>{`Account Name : ${InvoiceData.bankdetails.name || ''}`}</li>
               <li>{`Bank Name : ${InvoiceData.bankdetails.bank_name || ''}`}</li>
              </ul>
              <ul className='space-y-3'>
               <li className='font-bold'>{` Bank Account No. : ${InvoiceData.bankdetails.account_no || ''}`}</li>
               <li>{`IFSC Code : ${InvoiceData.bankdetails.ifsc_code || ''}`}</li>
              </ul>
             </div>

             <div className='text-[10px] bg-gray-100'>
                 <div className='flex justify-between p-1'>
                  <p className='font-bold'>Total Amount</p>
                  <p>{InvoiceData.totals.grand_total}</p>
                 </div>
                 <div className=' flex justify-between p-1 border-t border-black'>
                  <p className='font-bold'>Round OFF(+,-)</p>
                  <p>{ 0.00 }</p>
                 </div>
             </div>

     </div>

          <div className='grid grid-cols-3 border-t border-black text-[10px] bg-gray-100 '>
              <div className=' grid col-span-2'>
                  <p>{`Bill Amount In Words:$`}</p>
              </div>
              <div className='flex justify-between p-1'>
                  <strong>GRAND TOTAL</strong>
                  <p>{InvoiceData.totals.grand_total}</p>
              </div>

          </div>

          <div className='grid grid-cols-3 border-t border-black text-[10px] '>

              <div className=' grid col-span-2'>
              </div>
              <div className='flex justify-between p-1'>
                  <p>Amount Paid</p>
                  <p>{InvoiceData.totals.grand_total}</p>
              </div>

          </div>

          <div className=' flex justify-between text-[10px] border-t border-black items-end p-1'>
              <ol> <b>Terms & Conditions</b> 
               <li>1.Goods once sold will not be taken back</li>
               <li>2.Subject to Patna Jusrisdiction.</li>
              </ol>
              <p>Customer Signature</p>

          <div >
            
               <p className='mb-4'>{`For ${InvoiceData.company.name}`}</p>
               <p >Auth. Signatory</p>
              </div>
             
          </div>
          
          
    </div>
    </>

  )
}

export default Invoice