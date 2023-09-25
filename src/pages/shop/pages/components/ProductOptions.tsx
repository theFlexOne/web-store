type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

function ProductOptions({
  options,
  selectedOptions,
  onOptionChange,
  isDisabled,
}: {
  options: any[];
  selectedOptions: Record<string, string | null>;
  onOptionChange: (id: string, value: string) => void;
  isDisabled: (id: string, value: string) => boolean;
}) {
  console.log(options);

  const usableOptions = options.filter(
    (option: ProductOption) =>
      option.values.length > 0 && option.values[0] !== ''
  );

  return (
    <div className="flex flex-col gap-2">
      {usableOptions.map((attribute: { name: string; values: string[] }) => (
        <div key={attribute.name}>
          <div className="text-sm font-bold">{attribute.name}</div>
          <div className="flex flex-row flex-wrap gap-2">
            {attribute.values.map((value: string) => (
              <button
                key={value}
                className={`border rounded-md px-2 py-1 ${
                  selectedOptions[attribute.name] === value
                    ? 'border-gray-800'
                    : 'border-gray-200'
                }`}
                onClick={() => onOptionChange(attribute.name, value)}
                disabled={isDisabled(attribute.name, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductOptions;
