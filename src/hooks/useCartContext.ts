import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function useCartContext() {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw new Error(
      'CartContext is null - that should not be the case! TimersContext was used outside the ContextProvider!'
    );
  }

  return cartContext;
}

export default useCartContext;
