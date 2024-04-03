import CartContextProvider from './context/CartContext';
import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';
import UserProgressContextProvider from './context/UserProgressContext';
import Checkout from './components/Checkout';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
