import Product from "../../../../types/ProductsTable";

const ProductsDisplayTable: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="px-6 py-3 border">Product</th>
          <th className="px-6 py-3 border">Price</th>
          <th className="px-6 py-3 border">Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-3 border">{product.name}</td>
            <td className="px-6 py-3 border">{product.price}</td>
            <td className="px-6 py-3 border">{5}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsDisplayTable;
