import { createContext } from 'react';

export interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export type CartState = {
    items: 
}

const CartContext = createContext(null);
