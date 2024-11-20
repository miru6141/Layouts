import invoiceData from './assets/InvoiceData.json'
const Thermal = () => {
  return (



    <div className="w-[3in]  p-2 text-[10px] font-mono mr-4">
   
      <div className="text-center">
        <h2 className="font-bold text-[14px] font-serif">{invoiceData.company.name.toUpperCase()}</h2>
        <p>{invoiceData.company.address.area}</p>
        <p>{invoiceData.company.address.district}</p>
        <p>{invoiceData.company.email}</p>     
      </div>
      <div className='p-1'>
      <p>
        
           <span className="font-bold">Contact No: </span>{invoiceData.company.contact}
           </p>
      <p> <span className="font-bold">GSTIN:</span>{`${invoiceData.company.GSTIN}`}</p>
      </div>

      <div className=' border-dashed   border-t border-b border-black '> <h3 className="font-bold  text-center text-[14px] font-serif   ">INVOICE</h3> </div>
        
        <div className=' grid grid-cols-2 p-1 text-xs ' >
        <div className="my-2 ">
        <p><span className='font-bold'>Bill No. :</span>{invoiceData.billinfo.bill_no}</p>
        <p><span className='font-bold'>Date:</span>{invoiceData.billinfo.date}</p>   
        <p><span className='font-bold'>Cashier:</span>{invoiceData.billinfo.Cashier}</p>
        <p><span className='font-bold'>M/S  </span>{invoiceData.billinfo.name}</p>
        <p><span className='font-bold'>Mob.</span>{invoiceData.billinfo.mob}</p>
      </div>
      <div  className='pl-2'>
      <p className='py-4'><span className='font-bold'>Time:</span>{invoiceData.billinfo.time}</p>   
      </div>
        </div>
      
      
      
      <table className='w-full  border-dashed  border-black  border-t my-2 py-1'>
        <thead className='' >

          <tr className='flex flex-row justify-between p-1 text-xs '>
            <th className=''>SNo</th>
            <th className=''>Qty</th>
            <th className=''></th>
            <th className='text-center '>Rate</th>
            <th className='text-center '>Tax</th>
            <th>Disc</th>
            <th></th>
            <th>Net Amt</th> 
          </tr>

          <tr className='grid grid-cols-3 w-full '> 
            <th className='text-start pl-1 col-span-2 border-r'>Item Description</th>
            <th className=''></th>
          </tr>
          
        </thead>

         <tbody className='text-xs'>
                {
                    invoiceData.items.map((data)=>(
                   <>
                      <tr key={data.S_N} className='flex flex-row justify-between p-1 text-xs  border-dashed border- border-black border-t '>
                      <td className=''>{data.S_N}</td>
                      <td className=''>{data.quantity}</td>
                      <td></td>
                      <td className=' text-end '>{data.rate.toFixed(2)}</td>
                      <td  className=' text-end '>{data.gst_rate.toFixed(2)}</td>
                      <td  className=' text-end '>{data.discount.amt.toFixed(2)}</td>
                      <td></td>
                      <td  className=' text-end pr-1'>{data.mrp.toFixed(2)}</td>
                    </tr>
                    <tr key={data.S_N } className='grid grid-cols-3'>
                     <td className='text-start pl-1 col-span-2'>{data.description}</td>
                     <td className='text-center ml- col-span-1'>{`HSN:${data.hsn}`}</td>
                    </tr>
                  
                    </>

                    ))

                }
                 </tbody>
         
      </table>
     
      

      {/* Totals */}
      <div className="border-t border-dashed border-black mt-2 pt-1">
        <div className="flex justify-between border-b border-dashed border-black">
          <span>{`Total Items: ${invoiceData.items.total_items || '4'}, Qty: ${invoiceData.items.total_qyt || '5'}`}</span>
          <span>{invoiceData.totals.grand_total}</span>
        </div>
        <div className="grid grid-cols-3">
          <div className='col-span-1 text-end'>
            <ul className='text-left'>
              <li>Round Off (+,-)</li>
              <li className='font-bold'>Bill Amount</li>
              <li>Payment :</li>
              <li>Payment Mode :</li>
            </ul>
          </div>
          
          <div className="col-span-2 text-end">
         <ul className='pr-1'>
          <li>{invoiceData.totals.roundof || '0.4'}</li>
          <li className='font-bold'>{invoiceData.totals.bill_amount || '159.00'}</li>
          <li>{invoiceData.totals.payment || '159'}</li>
          <li>{invoiceData.totals.payment_mode || 'By Cash'}</li>
         </ul>
       </div>
        </div>
      </div>
      <div className="text-start border-t border-b border-dashed border-black my-2 py-1">
        <p>{`In Words : ${invoiceData.numberInWords || ''}`}</p>
      </div>

      {/* Savings */}
      <div className="text-center font-bold border-b border-dashed border-black my-2 py-1">
        <p>{`YOUR TOTAL SAVINGS = ${invoiceData.totals.saving || '2.50' }`}</p>
      </div>

      {/* Tax Details */}
      <div className="my-2">

         <table className='w-full  border-dashed border-black  border-b  py-1'>
          <thead>
            <tr>
              <th>Tax<br/>Rate</th>
              <th>Taxable<br/>Amt</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>IGST</th>
              <th>Total</th>
            </tr>
          </thead>


            <tbody>
                    {
                      invoiceData.tax.map((data)=>(
                        
                        <tr key={data.id}>
                        <td className=' text-end '>{data.tax_rate || ''}</td>
                        <td className=' text-end '>{data.txbl_amt.toFixed(2) || ''}</td>
                        <td className=' text-end '>{data.cgst.toFixed(2) || ''}</td>
                        <td className=' text-end '>{data.sgst.toFixed(2) || ''}</td>
                        <td className=' text-end '>{data.igst.toFixed(2) || ''}</td>
                        <td className=' text-end '>{data.total.toFixed(2) || ''}</td>
                      </tr>

                      

                      ))
                    }

             
            </tbody>

         </table>
      </div>

      {/* Footer */}
      <div className="text-center text-xs mt-2 ">

        <div className='border-dashed   border-b border-black'> 
          <ol className='text-start font-bold pl-1'> Trem & Condition
            <li className='text-[8px]'>1.Goods once sold will not be taken back or exchanged.</li>
            <li className='text-[8px]'>2.All Disputes subject to Patna Jurisdiction only.</li>
          </ol>
          <p className='mt-2 font-semibold' >THANK YOU FOR SHOPPING! VISIT AGAIN!</p>
        </div>     
       
        <p className='text-start text-[8px]'>Software: TECHNIX INDIA PVT LTD</p>
      </div>
    </div>
 

  )
}

export default Thermal