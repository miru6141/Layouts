import React, { useState } from "react";

const GridExample = () => {
  const [childSize, setChildSize] = useState({ width: 100, height: 100 });

  const handleResize = (e) => {
    const { name, value } = e.target;
    setChildSize((prev) => ({
      ...prev,
      [name]:value, // Clamp between 50 and 300px
    }));
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "400px",
        height: "400px",
        border: "2px solid black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${childSize.width}px`,
          height: `${childSize.height}px`,
          background: "lightblue",
          border: "1px solid blue",
          transition: "all 0.3s ease-in-out",
        }}
      />
      {/* Controls for dynamic resizing */}
      <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
        <label>
          Width:{" "}
          <input
            type="number"
            name="width"
            value={childSize.width}
            onChange={handleResize}
          />
        </label>
        <label>
          Height:{" "}
          <input
            type="number"
            name="height"
            value={childSize.height}
            onChange={handleResize}
          />
        </label>
      </div>
    </div>
  );
};

export default GridExample;
