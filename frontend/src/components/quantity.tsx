import { useState } from "react";
const Quantity = ({ max }: { max: number }) => {
  const [quantity, setQuan] = useState(1);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5vw",
      }}
    >
      <button
        style={{ width: "2vw", height: "2vw", position: "sticky" }}
        className="accept-bt"
        onClick={() => {
          if (quantity > 1) setQuan((prev) => prev - 1);
        }}
      >
        -
      </button>
      <p style={{ width: "1.5vw", textAlign: "center" }}>{quantity}</p>
      <button
        style={{ width: "2vw", height: "2vw" }}
        className="accept-bt"
        onClick={() => {
          if (quantity < max) setQuan((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
export default Quantity;
