function ProductRating({ rating }: { rating: number }) {
  return rating > 0 ? (
    <div className="flex gap-1">
      {[...new Array(5)].map((_, i) => (
        <svg
          className="w-4 aspect-square"
          key={i}
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className=""
            d="M13.2378 1.92275L13 1.19098L12.7622 1.92275L10.1242 10.0418H1.58732H0.817901L1.44038 10.4941L8.34685 15.5119L5.70881 23.631L5.47105 24.3627L6.09352 23.9105L13 18.8926L19.9065 23.9105L20.529 24.3627L20.2912 23.631L17.6531 15.5119L24.5596 10.4941L25.1821 10.0418H24.4127H15.8758L13.2378 1.92275Z"
            fill={i < rating ? '#FFD80D' : '#E4E4E4'}
            stroke={i < rating ? '#FFD80D' : '#444'}
            stroke-width={i < rating ? '1' : '0.5'}
          />
        </svg>
      ))}
      {rating && rating > 0 && rating <= 5 && [`${rating} out of 5`]}
    </div>
  ) : (
    <span className="text-xs">This product has not been rated yet.</span>
  );
}

export default ProductRating;
