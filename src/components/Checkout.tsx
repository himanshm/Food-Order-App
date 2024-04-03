import useCartContext from '../context/useCartContext';
import useUserProgressContext from '../context/useUserProgressContext';
import calculateCartTotal from '../utils/cartTotal';
import { currencyFormatter } from '../utils/formatter';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';

function Checkout() {
  const { items } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();

  const cartTotal = calculateCartTotal(items);

  function handleClose() {
    hideCheckout();
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input label='Full Name' type='text' id='full-name' />
        <Input label='E-mail Address' type='email' id='email' />
        <Input label='Street Address' type='text' id='street' />

        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        <p className='modal-actions'>
          <Button type='button' textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
