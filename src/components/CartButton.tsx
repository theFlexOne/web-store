import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function CartButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon
        icon={faShoppingCart}
        className="text-sky-800 text-2xl"
      />
    </button>
  );
}

export default CartButton;
