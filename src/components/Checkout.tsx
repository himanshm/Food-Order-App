import { FormEvent, ReactNode } from 'react';
import useCartContext from '../hooks/useCartContext';
import useUserProgressContext from '../hooks/useUserProgressContext';
import calculateCartTotal from '../utils/cartTotal';
import { currencyFormatter } from '../utils/formatter';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';
import useHttp from '../hooks/useHttp';
import { Meal } from '../context/CartContext';
import Error from './Error';

const requestConfig: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Checkout() {
  const { items, clearCart } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp<Meal[]>({
    url: 'http://localhost:3000/orders',
    config: requestConfig,
  });

  const cartTotal = calculateCartTotal(items);

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const fd = new FormData(formElement);

    const customerData = Object.fromEntries(fd.entries());

    sendRequest({
      order: {
        items,
        customer: customerData,
      },
    });
  }

  let actions: ReactNode = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleFinish}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input label='Full Name' type='text' id='name' />
        <Input label='E-mail Address' type='email' id='email' />
        <Input label='Street Address' type='text' id='street' />

        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error && (
          <Error title='Failed to submit order' message={error.message} />
        )}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
