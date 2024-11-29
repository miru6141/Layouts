/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const Barcode = ({ value,format}) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (value) {
      JsBarcode(barcodeRef.current, value, {
        format: format, // EAN-13 format
        lineColor: "#000",
        width: 1, // Adjusted bar width for better visibility
        height: 35, // Height of the barcode
        displayValue: true, // Show the barcode value below
        fontSize: 18, // Font size for the value text
        margin: 10, // Margin around the barcode
      });
    }
  }, [value]);

  return (
    <div
      style={{
        width: "170mm", // Set width to fit within A4 paper margins
        height: "auto",
        margin: "0 auto", // Center the barcode on the page
        textAlign: "start",
      }}
    >
      <svg ref={barcodeRef} />
    </div>
  );
};

export default Barcode;
