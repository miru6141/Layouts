import  { useState } from 'react'
import Invoice from './Invoice'

const Data = () => {

          const [Data,setData]=useState(
           
            {
            
                     
            
                "data": {
                  "billId": 239,
                  "billingDate": "26/11/2024",
                  "invoiceNo": "TT-72-Tech",
                  "referenceNo": "",
                  "dueDate": "2024-11-26",
                  "contactId": 732,
                  "customerName": "Dinesh K",
                  "customerAddress": "Insmailpur",
                  "customerEmail": "dineshkr748199@gmail.com",
                  "customerContactNo": "9572809011",
                  "placeOfSupply": "10",
                  "subTotal": 650,
                  "discount": 0,
                  "otherCharges": 0,
                  "totalTaxes": 117,
                  "roundOff": 0,
                  "grandTotal": 767,
                  "notes": "",
                  "branchId": 0,
                  "salesmanId": 0,
                  "salesman": "",
                  "status": "Unpaid",
                  "createdBy": 72,
                  "createdAt": "2024-11-26",
                  "companyId": 253,
                  "contacts": {
                    "contactId": 732,
                    "companyId": 253,
                    "contactType": "Customer",
                    "contactCode": "825524",
                    "contactName": "Dinesh K",
                    "businessType": "Limited Liability Company (LLC)",
                    "businessName": "Dinesh K",
                    "workPhone": "9572809011",
                    "workEmail": "dineshkr748199@gmail.com",
                    "fax": "0555",
                    "website": "http://localhost:3000",
                    "title": "Mr",
                    "contactPerson": "DINESH KUMAR",
                    "designation": "Software developer ",
                    "mobileNo": "8986459538",
                    "isWhatsapp": 1,
                    "emailId": "dineshkr748199@gmail.com",
                    "address": "Insmailpur",
                    "city": "Gaya",
                    "pinCode": "700136",
                    "state": "Bihar (BR)",
                    "country": "India",
                    "shippingAddress": "Insmailpur",
                    "shippingCity": "Gaya",
                    "shippingPinCode": "700136",
                    "shippingState": "Bihar (BR)",
                    "shippingCountry": "India",
                    "panNo": "tan",
                    "taxRegNo": "tan",
                    "aadhaarNo": null,
                    "taxationType": "Taxable",
                    "gstin": "ss",
                    "gstinType": "N/A",
                    "stateCode": "10",
                    "tdsApplicable": 1,
                    "ledgerId": 59,
                    "accountId": 2,
                    "useAs": "Supplier",
                    "openingBalance": 855,
                    "openingType": "Debit",
                    "status": "Active",
                    "created_by": 72,
                    "creationDate": "2024-08-08T14:59:26",
                    "defaultPayment": "",
                    "paymentTerms": "Due on Receipt",
                    "notifications": "Both",
                    "currency": "INR",
                    "creditLimit": 25200,
                    "partyDiscPer": 25,
                    "customerType": "Wholesaler",
                    "remarks": null,
                    "portalAccess": 0,
                    "loginEmail": null,
                    "loginPassword": null,
                    "profilePicture": null,
                    "priceListId": 21
                  },
                  "billParticulars": [
                    {
                      "rowId": 409,
                      "productId": 218,
                      "hsnCode": "",
                      "quantity": 10,
                      "unit": "Pcs",
                      "billedQty": 10,
                      "freeQty": 0,
                      "alternateUnit": "box",
                      "convFactor": 1,
                      "rate": 65,
                      "discPer": 0,
                      "discount": 1.1,
                      "amount": 767,
                      "taxType": "",
                      "taxationType": "Exclusive",
                      "taxPer": 18,
                      "taxableValue": 650,
                      "billingDate": "2024-11-26",
                      "branchId": 1,
                      "billId": 239,
                      "companyId": 253,
                      "product": {
                        "productId": 218,
                        "companyId": 253,
                        "productType": "Goods",
                        "productName": "KESH KING SHAMPOO 80ML",
                        "shortName": "",
                        "description": "Comfortable and non-slip",
                        "image": null,
                        "materialType": "Finished Goods",
                        "categoryId": 1,
                        "departmentId": null,
                        "brandId": 1,
                        "manufacturerId": null,
                        "supplierId": null,
                        "unit": "Pcs",
                        "uqcCode": "Pcs",
                        "altUnitRequired": true,
                        "secondaryUnit": "Bag",
                        "secondaryUnitUQC": "",
                        "defaultSalesUnit": "0",
                        "conversionFactor": 1,
                        "manageItemBy": true,
                        "managementMethod": true,
                        "warrantyPeriod": 12,
                        "barcode": "8901248240260",
                        "sku": "",
                        "modelNo": "0",
                        "color": "",
                        "size": "",
                        "isTaxable": true,
                        "taxId": 114,
                        "taxationType": "Exclusive",
                        "taxPer": 18,
                        "hsnCode": "",
                        "reorderPoint": 2,
                        "mrp": 65,
                        "discountPer": 0,
                        "purchaseRate": 58.5,
                        "distributorPrice": 0,
                        "dealerPrice": 0,
                        "wholesalePrice": 0,
                        "sellingRate": 65,
                        "openingStock": 1,
                        "unitRate": 0,
                        "openingValue": 0,
                        "bin": "",
                        "status": "Active",
                        "createdBy": 72,
                        "productCode": 0,
                        "secPurchaseRate": 5,
                        "secSellingRate": 2,
                        "creationDate": "2024-08-31T00:53:07"
                      },
                      "taxId": 114,
                      "taxSetting": {
                        "id": 114,
                        "taxName": "GST - 18%",
                        "taxRate": 18,
                        "taxType": null,
                        "taxes": null,
                        "groups": {
                          "id": 18,
                          "groupName": "GST - 18%",
                          "taxRate": 18,
                          "taxType": null,
                          "companyId": 253,
                          "taxes": [
                            {
                              "id": 41,
                              "taxName": "CGST - 9%",
                              "taxType": "CGST",
                              "rate": 9,
                              "companyId": 253,
                              "createdAt": "2024-10-15T12:19:03",
                              "updatedAt": "2024-10-15T12:19:03"
                            },
                            {
                              "id": 43,
                              "taxName": "IGST - 18",
                              "taxType": "IGST",
                              "rate": 18,
                              "companyId": 253,
                              "createdAt": "2024-10-15T12:20:17",
                              "updatedAt": "2024-10-15T12:20:17"
                            },
                            {
                              "id": 44,
                              "taxName": "SGST - 9%",
                              "taxType": "SGST",
                              "rate": 9,
                              "companyId": 253,
                              "createdAt": "2024-10-15T12:24:46",
                              "updatedAt": "2024-10-15T12:24:46"
                            }
                          ],
                          "createdAt": "2024-10-15T12:25:50",
                          "updatedAt": "2024-10-26T17:22:08"
                        },
                        "companyId": 253
                      },
                      "description": "Comfortable and non-slip",
                      "productName": "KESH KING SHAMPOO 80ML"
                    }
                  ],
                  "billTaxationDetails": [
                    {
                      "rowId": 648,
                      "billingDate": "2024-11-26",
                      "taxableValue": 650,
                      "taxType": "CGST",
                      "taxName": "CGST 9%",
                      "taxPer": 9,
                      "taxAmount": 58.5,
                      "bill_id": 239
                    },
                    {
                      "rowId": 649,
                      "billingDate": "2024-11-26",
                      "taxableValue": 650,
                      "taxType": "SGST",
                      "taxName": "SGST 9%",
                      "taxPer": 9,
                      "taxAmount": 58.5,
                      "bill_id": 239
                    }
                  ],
                  "outStandingAmount": 767
                },
                "status": true
              }
            
          )
         console.log(Data)
  return (
    <div>

          <Invoice Data={Data.data}/>       

    </div>
  )
}

export default Data