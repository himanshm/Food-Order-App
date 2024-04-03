import { Meal } from '../context/CartContext';

function calculateCartTotal(items: Meal[]): number {
  return items.reduce((totalPrice, item) => {
    const itemPrice = Number(item.price);
    return totalPrice + item.quantity * itemPrice;
  }, 0);
}

export default calculateCartTotal;
