interface QuantityProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Quantity = ({ max, value, onChange }: QuantityProps) => {
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
        style={{ width: "2vw", height: "2vw" }}
        className="accept-bt"
        onClick={() => {
          if (value > 1) onChange(value - 1);
        }}
      >
        -
      </button>

      <p style={{ width: "1.5vw", textAlign: "center" }}>{value}</p>

      <button
        style={{ width: "2vw", height: "2vw" }}
        className="accept-bt"
        onClick={() => {
          if (value < max) onChange(value + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
