import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartButton from './CartButton';
import { faFishFins } from '@fortawesome/free-solid-svg-icons';
import UserButton from './UserButton';

const RootHeader = ({toggleCart}: {
  toggleCart: () => void;
}) => {
  return (
    <header className="flex px-6 py-4 gap-4 shadow shadow-black/30 border-b items-center">
      <Link to="/" className="mr-4 h-full">
        <FontAwesomeIcon icon={faFishFins} className="text-sky-800 text-3xl" />
      </Link>
      {/* <SearchBar value={searchValue} onChange={setSearchValue} /> */}
      <nav className="font-primary">
        <ul className="flex gap-4 items-end uppercase">
          <li>
            <Link
              className="text-amber-600 font-medium hover:text-amber-700 py-[2px] px-1 transition-all duration-300"
              to="/shop"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/faqs">FAQs</Link>
          </li>
        </ul>
      </nav>
      <div className="ml-auto flex gap-2 items-center">
        <UserButton />
        <CartButton onClick={toggleCart} />
      </div>
    </header>
  );
};

export default RootHeader;
