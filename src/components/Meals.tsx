import MealItem from './MealItem.tsx';
import useHttp from '../hooks/useHttp.ts';

import { Meal } from '../context/CartContext.tsx';

function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp<Meal[]>({
    url: 'http://localhost:3000/meals',
  });

  return (
    <ul id='meals'>
      {loadedMeals &&
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}

export default Meals;
