import invoiceData from '../src/assets/InvoiceData.json'
 const Einvoice = () => {


       const amountinWords='five Thousand  Nine Hundred Thirty Seven';


       const totalItems = invoiceData.items.length;

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
console.log(invoiceData.items.length);


  return (
    <div className="h-auto m-2 bg-white  border border-black text-sm  font-custom "> 

      <div className='flex justify-between p-1 font-custom'>
           <p>{`GSTIN: ${invoiceData.company.GSTIN}`}</p>
           <p>Orignal Copy</p>
      </div>

        <div className='text-center border-b border-black'>
          <h3 className='font-semibold underline'>TAX INVOICE</h3>
          <h1 className='text-2xl font-semibold'>{`J invoiceData.company.name.toUpperCase()`}</h1>
          <h3 className=''>{invoiceData.company.address.area}</h3>
          <p className='italic'>{`Tel. :${invoiceData.company.contact}`}</p>
        </div>
     
        <div className='grid  grid-cols-2 '>

          <div className='border-r border-b border-black  p-1'>
               <ul>
               <li>{`Invoice No.`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`: ${invoiceData.invoice.number}`}</li>

                <li>{`Dated .`}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`: ${invoiceData.invoice.date}`}</li>
                <li>{`Place of Supply.      : ${invoiceData.invoice.place_of_supply}`}</li>
                <li>{`Reverse Charge.      : ${invoiceData.invoice.reverse_charge || ''}`}</li>
                <li>{`GR/RR No.`} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      {`: ${invoiceData.invoice.gr_rr || ''}`}</li>
               </ul>
          </div>

          <div className='p-1'>
          <ul>
                <li>{`Transport `}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     {` : ${invoiceData.invoice.transportation || ''}`}</li>
                <li>{`Vehicle No.`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    {` : ${invoiceData.invoice.vehicle_number || ''}`}</li>
                <li>{`Station`} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {`    : ${invoiceData.invoice.station || ''}`}</li>
                <li>{`E-Way Bill No.`} &nbsp; {`: ${invoiceData.invoice.E_bay_bill || ''}`}</li>
               </ul>
          </div>
               
          <div className='border-r border-b border-black p-1 '>
          <ul>
                <li>{`Billed to       : `}</li>
                <li>{  invoiceData.receiver.name || ''}</li>
                <li>{`${invoiceData.receiver.address.area},${invoiceData.receiver.address.state}`}</li>
                <li>{`GSTIN / UIN       : ${invoiceData.gstin_uin || ''}`}</li>
               </ul>
          </div >

          <div className='border-t border-b p-1 border-black'>
          <ul>
                <li className='italic'>{`Shipped to       : `}</li>
                <li>{  invoiceData.receiver.name || ''}</li>
                <li>{`${invoiceData.receiver.address.area},${invoiceData.receiver.address.state}`}</li>
                <li>{`GSTIN / UIN       : ${invoiceData.gstin_uin || ''}`}</li>
               </ul>
          </div>

        </div>

          <div className='flex justify-between p-1 text-[10px] '>
            <p className=''> {`IRN : ${invoiceData.receiver.IRN ||  '0fb0b496f8cea1696efcfd0e7e89d06e046970da523ae425ab24ec1a8b4abf40'} `}</p>
            <p className=''>{`Ack.No. : ${invoiceData.receiver.Ack_No || '182211544473105'} `} </p>
            <p className=''>{`Ack.Date : ${invoiceData.receiver.Ack_date || '182211544473105'} `}</p>
          </div>
          
          <div className='h-auto  '>
          <table  className='w-full  text-[16px] border-t border- border-black'>
             <thead className='p-2'>
              <tr className='p-2'>
                <th className=''>S.N.</th>
                <th className='border-l border-black text-start p-1 '>Description of Goods </th>
                <th className='border-l border-black text-start p-1'>HSN/SAC <br />Code </th>
                <th className='border-l border-black text-end   p-1'>Qty.</th>
                <th className='border-l border-black text-start p-1'>Unit </th>
                <th className='border-l border-black text-end   p-1'>Price</th>
                <th className='border-l border-black text-end   p-1'>CGST <br />Rate</th>
                <th className='border-l border-black text-end   p-1'>CGST <br />Amount</th>
                <th className='border-l border-black text-end   p-1'>SGST <br />Rate</th>
                <th className='border-l border-black text-end   p-1'>SCGST <br />Amount</th>
                <th className='border-l border-black text-end   p-1'>Amount(` )</th>
              </tr>
             </thead>

             <tbody className='border-t border-black '>
                      {invoiceData.items.map((data,index)=>(
                 <>
                        {index > 15 && (index - 15) % 25 === 0 && (
                              <div className='pgbreak border-b'></div>
                                )}

                           <tr key={data.S_N} >
                            <td className='p-1'>{data.S_N}</td> 
                            <td className='border-l border-black p-1'>{data.description || ''}</td>
                            <td className='border-l border-black p-1'>{data.hsn || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.quantity || ''}</td>
                            <td className='border-l border-black text-start p-1'>{data.unit || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.mrp.toFixed(2) || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.gst_rate.toFixed(2) || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.gst_amount.toFixed(2) || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.sgst_rate || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.gst_amount.toFixed(2) || ''}</td>
                            <td className='border-l border-black text-end p-1'>{data.total.toFixed(2) || ''}</td>
                           </tr>
                          
                           </>
                      ))}
                     
             </tbody>
 
                    
          { (invoiceData.items.length>5 && pageCount===1)  &&
             <div className='pgbreak'></div>}
             
             <tfoot className='border-t border-black'>
              
           
               <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td> </td>
                    <td></td>
                    <td className=''>Less   :  Round off(-)</td>
                    <td></td>
                    <td></td>
                    <td className=' border-l border-black p-1'>{invoiceData.totals.grand_total}</td>
               </tr>
               <tr className='border-t border-black '>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='p-1 font-bold'>Grand Total</td>
                    <td className='p-1 font-bold'>{invoiceData.totals.unit}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className=' border-l border-b border-black p-1 font-bold'>{invoiceData.totals.grand_total}</td>
               </tr>

             </tfoot>
             
          </table>
          </div>
           
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
 
                  <tbody className='border-t border-b border-black text-[10px] py-2'>
                  {   
                     
                       invoiceData.tax.map((data)=>(

                   <tr key={data.id} className='mt-0.5 border-r border-black '>
                           <td className='p-1'>{data.tax_rate}</td>
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

            <div className='m border-b border-black'>
              <h2 className='m-2' >{ `Rupees ${amountinWords || ''} Only`}</h2>
            </div>

            <div className='text-center font-semibold'>

            <p className="text-xl font-semibold underline">Declaration</p>
              <h3>BANK OF INDIA</h3>
              <p className="text-[10px] font-semibold ">{`A/C NO ${invoiceData.bankdetails.account_no || ''} ( BRANCH ${invoiceData.bankdetails.branch})`}</p>
              <p className="text-[10px] font-semibold ">{`IFSC : ${invoiceData.bankdetails.ifsc_code || ''}`}</p>
                     
            </div>
           
           <div className='grid grid-cols-3 border-t border-b border-black '>
              
              <div className='border-r border-black col-span-1 p-1'>
                  <ol> Term & Condition <br /> E.& O.E. 
                    <li>1. Goods once sold will not be taken back. </li>
                    <li> 2. Interest @ 18% p.a. will be charged if the payment
                      <br /> is not made with in the stipulated time. </li>
                    <li>3. Subject to &apos;Bihar&apos; Jurisdiction only. </li>
                  </ol>
              </div>
              <div className='col-span-2  border-black grid grid-cols-3 '>
              <div className='border-r border-black col-span-1 ml-2 '>

                <h1 className='text-center'>E-Invoice QR Code </h1>
                <div className='p-2'>{invoiceData.invoice.qrcode || ''}</div>
                 
              </div>
                    <div className='grid grid-rows-4 col-span-2'>
                        
                        <div className='row-span-1 border-b border-black '>
                          <p>{`Receiver's Signature :${invoiceData.receiver.signature || ''}`}</p>
                        </div>
                        <div className="row-span-3 bg-blue-600  border-black  items-end justify-end h-full">
                          <ul className=''>
                          <li className="text-end p-3">{invoiceData.company.name}</li>
                          <li className="text-end ">Authorised Signatory</li>
                          </ul>
                          
                        </div>


                    </div>
              </div>

           </div>


    </div>
  )
}

export default  Einvoice
