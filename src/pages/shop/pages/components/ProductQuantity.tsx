type ProductQuantityProps = {
  quantity: number;
  handleQuantityChange: (value: number) => void;
};

function ProductQuantity({
  quantity,
  handleQuantityChange,
}: ProductQuantityProps) {
  return (
    <div id="quantity" className="flex flex-row gap-2">
      <button
        type="button"
        onClick={() => handleQuantityChange(-1)}
        className="border rounded-md px-2 py-1 border-gray-300 hover:bg-amber-500 transition-colors hover:text-white hover:border-amber-500"
      >
        -
      </button>
      <div className="border rounded-md px-2 py-1 border-gray-700">
        {quantity}
      </div>
      <input
        type="number"
        name="quantity"
        hidden={true}
        value={quantity}
        onChange={() => {}}
      />
      <button
        type="button"
        onClick={() => handleQuantityChange(1)}
        className="border rounded-md px-2 py-1 border-gray-300 hover:bg-amber-500 transition-colors hover:text-white hover:border-amber-500"
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
