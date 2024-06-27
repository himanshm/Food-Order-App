import Button from './UI/Button';
import logoImg from '../assets/logo.jpg';
import useCartContext from '../hooks/useCartContext';
import useUserProgressContext from '../hooks/useUserProgressContext';

function Header() {
  const { items } = useCartContext();
  const { showCart } = useUserProgressContext();

  const totalCartItems = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='A restaurant' />
        <h1>React Food</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
