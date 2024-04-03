import useCartContext from '../context/useCartContext.ts';
import { currencyFormatter } from '../utils/formatter';
import Modal from './UI/Modal.tsx';
import Button from './UI/Button';
import useUserProgressContext from '../context/useUserProgressContext.ts';
import CartItem from './CartItem.tsx';
import calculateCartTotal from '../utils/cartTotal.ts';

function Cart() {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart, showCheckout } = useUserProgressContext();

  const cartTotal = calculateCartTotal(items);

  function handleCloseCart() {
    hideCart();
  }

  function handleGoToCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className='cart'
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : undefined}
    >
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
        {items.length > 0 ? (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        ) : null}
      </p>
    </Modal>
  );
}

export default Cart;
