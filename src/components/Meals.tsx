import { useEffect, useState } from 'react';
import MealItem from './MealItem.tsx';

import { Meal } from '../context/CartContext.tsx';

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function fetchMeals(): Promise<void> {
      try {
        const res = await fetch('http://localhost:3000/meals');
        if (!res.ok) {
          // ...
        }

        const meals: Meal[] = await res.json();
        setLoadedMeals(meals);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMeals();
  }, []);

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
