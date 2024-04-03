import { Meal } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatter';

type CartItemProps = {
  item: Meal;
  onIncrease: (item: Meal) => void;
  onDecrease: (id: string) => void;
};

function CartItem({ item, onIncrease, onDecrease }: CartItemProps) {
  const { id, name, quantity, price } = item;
  return (
    <li className='cart-item'>
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={() => onDecrease(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onIncrease(item)}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
