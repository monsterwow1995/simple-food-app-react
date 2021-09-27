import { Fragment, useState } from "react";
import CartModal from "./components/Cart/CartModal";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [ isModalShown, setIsModalShown] = useState(false);

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  return (
    <Fragment>
      {isModalShown && <CartModal onClose={closeModalHandler}/>}
      <Header onShow={showModalHandler}/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
