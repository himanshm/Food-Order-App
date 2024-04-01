import Button from './UI/Button';
import { Meal } from '../context/CartContext';
import { currencyFormatter } from '../utils/formatter';
import useCartContext from '../context/useCartContext';

type MealItemProps = {
  meal: Meal;
};

function MealItem({ meal }: MealItemProps) {
  const { name, price, description, image } = meal;
  const { addItem } = useCartContext();

  function handleAddMealToCart() {
    addItem(meal);
  }
  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className='meal-item-price'>{currencyFormatter.format(+price)}</p>
          <p className='meal-item-description'>{description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
