import { createContext, ReactNode, useState } from 'react';

type ProgressState = {
  progress: 'cart' | 'checkout' | '';
};

const initialProgressState: ProgressState = {
  progress: '',
};

type UserProgressContextType = ProgressState & {
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

export const UserProgressContext =
  createContext<UserProgressContextType | null>(null);

type UserProgressContextProviderProps = {
  children: ReactNode;
};

function UserProgressContextProvider({
  children,
}: UserProgressContextProviderProps) {
  const [userProgress, setUserProgress] =
    useState<ProgressState>(initialProgressState);

  function showCart() {
    setUserProgress({ progress: 'cart' });
  }

  function hideCart() {
    setUserProgress({ progress: '' });
  }

  function showCheckout() {
    setUserProgress({ progress: 'checkout' });
  }

  function hideCheckout() {
    setUserProgress({ progress: '' });
  }

  const progessContextValue: UserProgressContextType = {
    ...userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={progessContextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContextProvider;
