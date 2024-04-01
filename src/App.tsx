import CartContextProvider from './context/CartContext';
import Header from './components/Header';
import Meals from './components/Meals';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
