import useCartContext from '../context/useCartContext.ts';
import { currencyFormatter } from '../utils/formatter';
import Modal from './UI/Modal.tsx';
import Button from './UI/Button';
import useUserProgressContext from '../context/useUserProgressContext.ts';
import CartItem from './CartItem.tsx';

function Cart() {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart, showCheckout } = useUserProgressContext();

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * +item.price,
    0
  );

  function handleCloseCart() {
    hideCart();
  }

  function handleCheckout() {
    showCheckout();
  }

  return (
    <Modal className='cart' open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={addItem}
              onDecrease={removeItem}
            />
          );
        })}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
