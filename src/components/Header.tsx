import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import useCartContext from '../context/useCartContext';

function Header() {
  const { items } = useCartContext();

  const totalCartItems = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='A restaurant' />
        <h1>React Food</h1>
      </div>

      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
