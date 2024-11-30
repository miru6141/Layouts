
import './App.css'
import invoiceData from './assets/InvoiceData.json'

 const Einvoice = () => {

  const amountinWords='Fifty Five Thousand Nine Hundred Thirty Seven';
  
  const totalItems = invoiceData.items.length;
      // const count=0;

// Number of rows on the first page
const firstPageRows = 15;

// Number of rows on subsequent pages
const subsequentPageRows = 25;

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
console.log(invoiceData.items.length);


  return (
    <div className="h-auto ml-1 mr-2 mt-1 bg-white  border border-black text-[13px] "> 

      <div className='flex justify-between p-1  ibm-plex-sans-extralight '>
           <p className='font-semibold'>{`GSTIN: ${invoiceData.company.GSTIN}`}</p>
           <p className='font-semibold italic'>Orignal Copy</p>
      </div>

        <div className='text-center border-b-2  border-gray-600  ibm-plex-sans-extralight'>
          <h3 className=' font-medium text-lg underline'>TAX INVOICE</h3>
          <h1 className='text-2xl font-semibold'>{ invoiceData.company.name.toUpperCase()}</h1>
          <h3 className='font-semibold'>{invoiceData.company.address.area}</h3>
          <p className='italic font-medium'>{`Tel. :${invoiceData.company.contact}`}</p>
        </div>
     
        <div className='grid  grid-cols-2  font-medium   ibm-plex-sans-regular '>

          <div className='border-r-2 border-b-2 flex flex-row  border-gray-600 p-1 gap-8  '>
               <ul>
               <li>Invoice No</li>
                <li>Dated .</li>
                <li>Place of Supply</li>
                <li>Reverse Charge</li>
                <li>GR/RR No.</li>
               </ul>

               <ul>
               <li>{`: ${invoiceData.invoice.number}`}</li>
                <li>{`: ${invoiceData.invoice.date}`}</li>
                <li>{`: ${invoiceData.invoice.place_of_supply}`}</li>
                <li>{`: ${invoiceData.invoice.reverse_charge || ''}`}</li>
                <li>{`: ${invoiceData.invoice.gr_rr || ''}`}</li>
               </ul>
          </div>

          <div className='p-1 flex flex-row gap-8'>

          <ul>
               <li>Transport</li>
                <li>Vehicle No.</li>
                <li>Station</li>
                <li>E-Way Bill No.</li>
               </ul>

               <ul>
               <li>{`: ${invoiceData.invoice.transportation || ''}`}</li>
                <li>{`: ${invoiceData.invoice.vehicle_number || ''}`}</li>
                <li>{`: ${invoiceData.invoice.station || ''}`}</li>
                <li>{`: ${invoiceData.invoice.E_bay_bill || ''}`}</li>
               </ul>
          </div>
               
          <div className='border-r-2 border-b-2 border-gray-600 p-1 '>
          <ul>
                <li className='italic'>{`Billed to       : `}</li>
                <li>{  invoiceData.receiver.name || ''}</li>
                <li>{`${invoiceData.receiver.address.area},${invoiceData.receiver.address.state}`}</li>
                <li className='mt-6'>{`GSTIN / UIN       : ${invoiceData.gstin_uin || ''}`}</li>
               </ul>
          </div >

          <div className='border-t-2 border-b-2 p-1  border-gray-600'>
          <ul>
                <li className='italic'>{`Shipped to       : `}</li>
                <li>{  invoiceData.receiver.name || ''}</li>
                <li>{`${invoiceData.receiver.address.area},${invoiceData.receiver.address.state}`}</li>
                <li className='mt-6'>{`GSTIN / UIN       : ${invoiceData.gstin_uin || ''}`}</li>
               </ul>
          </div>

        </div>

          <div className='flex justify-between p-1 text-[11px] '>
            <span className='font-ibm-plex-sans'> {`IRN : ${invoiceData.receiver.IRN ||  '0fb0b496f8cea1696efcfd0e7e89d06e046970da523ae425ab24ec1a8b4abf40'} `}</span>
            <p className='font-ibm-plex-sans'>{`Ack.No. : ${invoiceData.receiver.Ack_No || '182211544473105'} `} </p>
            <p className='font-ibm-plex-sans'>{`Ack.Date : ${invoiceData.receiver.Ack_date || '09-04-2022'} `}</p>
          </div>
          
          <div className='h-auto  '>
          <table  className='w-full  text-[13px] border-t border-b border-black font-normal'>
             <thead className=''>
              <tr className='p-0 '>
                <th className=''>S.N.</th>
                <th className='border-l border-black text-start px-1 font-medium '>Description of Goods </th>
                <th className='border-l-2 border-black text-start px-1 font-medium  '>HSN/SAC <br />Code </th>
                <th className='border-l-2 border-black text-end  px-1 font-medium '>Qty.</th>
                <th className='border-l-2 border-black text-start px-1 font-medium '>Unit </th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>Price</th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>CGST <br />Rate</th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>CGST <br />Amount</th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>SGST <br />Rate</th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>SGST <br />Amount</th>
                <th className='border-l-2 border-black text-end   px-1 font-medium '>Amount(` )</th>
              </tr>
             </thead>

             <tbody className='border-t border-black border-b '>
                      {invoiceData.items.map((data,index)=>(
                 
                       <>
                           {index > 30 && (index - 30) % 40 === 0 && (
                              <div className='pgbreak border-b'></div>
                                )}
                           <tr key={data.S_N} className='' >
                            <td className='px-1'>{data.S_N}</td> 
                            <td className='border-l border-black px-1'>{data.description || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.quantity || ''}</td>
                            <td className='border-l-2 border-gray-700 px-1'>{data.hsn || ''}</td>
                            <td className='border-l-2 border-gray-700 text-start px-1'>{data.unit || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.mrp.toFixed(2) || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.gst_rate.toFixed(2) || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.gst_amount.toFixed(2) || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.sgst_rate || ''}</td>
                            <td className='border-l-2 border-gray-700 text-end px-1'>{data.gst_amount.toFixed(2) || ''}</td>
                            <td className='border-l-2  border-gray-700 text-end px-1'>{data.total.toFixed(2) || ''}</td>
                           </tr>
                          
                           </>  
                      ))}

             
                     
             </tbody>
                 
              
            
          </table>
         
            
          </div>

          { (invoiceData.items.length>5 && pageCount===1)  &&
             <div className='pgbreak'></div>}
         
        

                <table className="w-full text-[13px] border-t border-gray-600">

                <tfoot>
                    <tr>
                    <td colSpan={10} className='text-end' >Less : Round off(-)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='  text-end border-l-2 border-black p-1 ' colSpan={1}>{invoiceData.totals.roundoff|| ''}</td>
               </tr>
               <tr className='border-t-2 border-gray-600 '>
                    <td colSpan={10} className='p-1 font-bold text-end'>Grand Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className=' border-l-2 border-b-2 text-end border-gray-600 p-1 font-bold' >{invoiceData.totals.grand_total}</td>
               </tr>

                    </tfoot>
            
                    
                </table>
           

           
          <div className='grid grid-cols-3 '> 
                <div className='col-span-1 '>
                 <table className='w-full  text-[10px]  border-black'>
                  <thead className=''>
                     <tr className=''>
                        <th className='text-start'>Tax Rate</th>
                        <th className='text-start'>Taxable.Amt.</th>
                        <th className='text-start'>CGST</th>
                        <th className='text-start'>SGST</th>
                        <th className='text-start'>Total Tax</th>
                     </tr>
                  </thead>
 
                  <tbody className='border-t-2 border-b border-black text-[10px] py-2'>
                  {   
                     
                       invoiceData.tax.map((data)=>(

                   <tr key={data.id} className='mt-0.5 border-r border-black font-medium'>
                           <td className=''>{data.tax_rate}</td>
                           <td className=' text-start'>{data.txbl_amt.toFixed(2)}</td>

                         <td className="text-start">
                            {data.cgst}
                         </td>
                        
                         <td className="">
                              {data.sgst.toFixed(2) || ''}
                         </td>
                         <td className=' text-start'>{data.total.toFixed(2)}</td>
                   </tr>

                       ))

                  }

                 
               

                 <tr className='mt-0.5 border-t border-r border-black'>
                         <td className='text-start'>Total</td>
                         <td className=' text-start'>{invoiceData.totals.total_taxable_value.toFixed(2)}</td>
                         <td className="text-start">
                          {invoiceData.totals.total_gst_amount.toFixed(2)}
                         </td>
                      
                         <td className="">
                            {invoiceData.totals.sgst_amount || ''}
                         </td>
                         <td className=' text-start'>{invoiceData.totals.total_tax}</td>
                 </tr>

                   </tbody>
                  
               </table>
            </div>
            </div>

            <div className=' border-b-2 border-gray-600'>
              <h2 className='m-2 text-base font-ibm-plex-sans' >{ `Rupees ${amountinWords || ''} Only`}</h2>
            </div>

            <div className='text-center font-ibm-plex-sans'>

            <p className="text-lg font-medium underline">Declaration</p>
              <h3>BANK OF INDIA</h3>
              <p className="text-[12px] font-semibold ">{`A/C NO ${invoiceData.bankdetails.account_no || ''} ( BRANCH ${invoiceData.bankdetails.branch})`}</p>
              <p className="text-[12px] font-semibold ">{`IFSC : ${invoiceData.bankdetails.ifsc_code || ''}`}</p>
                     
            </div>
           
           <div className='grid grid-cols-3 border-t border-b border-black font-ibm-plex-sans'>
              
              <div className='border-r-2 border-black col-span-1 p-1 font-normal'>
                  <ol> <p className='underline'>Term & Condition </p> E.& O.E. 
                    <li>1. Goods once sold will not be taken back. </li>
                    <li> 2. Interest @ 18% p.a. will be charged if the payment
                      <br /> is not made with in the stipulated time. </li>
                    <li>3. Subject to &apos;Bihar&apos; Jurisdiction only. </li>
                  </ol>
              </div>
              <div className='col-span-2  border-black grid grid-cols-3 '>
              <div className='border-r-2 border-black col-span-1 ml-2 '>

                <h1 className='text-center mt-1'>E-Invoice QR Code </h1>
                <div className='p-2'>{invoiceData.invoice.qrcode || ''}</div>
                 
              </div>
                    <div className='grid grid-rows-4 col-span-2'>
                        
                        <div className='row-span-1 border-b-2 py-3 border-gray-600 '>
                          <p className='pl-2'>{`Receiver's Signature :${invoiceData.receiver.signature || ''}`}</p>
                        </div>
                        <div className="row-span-3  mt-10 pr-2 border-black  items-end justify-end h-full">
                          <ul className=''>
                          <li className="text-end ">{invoiceData.company.name}</li>
                          <li className="text-end mt-10">Authorised Signatory</li>
                          </ul>
                          
                        </div>


                    </div>
              </div>

           </div>


    </div>
  )
}




export default Einvoice
