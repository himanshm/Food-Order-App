import { useContext } from 'react';
import { UserProgressContext } from './UserProgressContext';

function useUserProgressContext() {
  const userProgressContext = useContext(UserProgressContext);

  if (userProgressContext === null) {
    throw new Error(
      'userProgressContext is null - that should not be the case! TimersContext was used outside the ContextProvider!'
    );
  }

  return userProgressContext;
}

export default useUserProgressContext;
