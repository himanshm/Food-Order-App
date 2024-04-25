import MealItem from './MealItem.tsx';
import useHttp from '../hooks/useHttp.ts';

import { Meal } from '../context/CartContext.tsx';

const requestConfig: RequestInit = {}; // if we send this empty object directly in side useHttp, it will create an infinite loop as config will change in each render of the component

function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp<Meal[]>({
    url: 'http://localhost:3000/meals',
    config: requestConfig,
  });

  if (isLoading) {
    return <p>Fetching Meals...</p>;
  }

  return (
    <ul id='meals'>
      {loadedMeals &&
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  );
}

export default Meals;
