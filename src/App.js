import { useState } from "react";
import CartModal from "./components/Cart/CartModal";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { CartContextProvider } from "./store/cart-context";

function App() {
  const [isModalShown, setIsModalShown] = useState(false);

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  return (
    <CartContextProvider value={{
      items: [],
      totalAmount: 0
    }}>
      {isModalShown && <CartModal onClose={closeModalHandler} />}
      <Header onShow={showModalHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
