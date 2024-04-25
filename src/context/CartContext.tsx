import { createContext, ReactNode, useReducer } from 'react';

export interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
}

export type CartState = {
  items: Meal[];
};

export type CartContextType = CartState & {
  addItem: (item: Meal) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: ReactNode;
};

const initialState: CartState = {
  items: [],
};

type AddToCartAction = {
  type: 'ADD_ITEM';
  payload: Meal;
};

type RemoveItemFromCartAction = {
  type: 'REMOVE_ITEM';
  payload: string;
};

type ClearCartAction = {
  type: 'CLEAR_CART';
};

type CartAction = AddToCartAction | RemoveItemFromCartAction | ClearCartAction;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItems = [...state.items];

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingCartItem = state.items[existingCartItemIndex];

      const updatedItems = [...state.items];

      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, initialState);

  function addItem(item: Meal) {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  }

  function removeItem(id: string) {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContextValue: CartContextType = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
