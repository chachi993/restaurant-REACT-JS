import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from '../src/components/UI/Cart.jsx'
import Checkout from "./components/UI/Checkout.jsx";
function App() {
  return (
    <>
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header/>
                <Meals/>
                <Cart/>
                <Checkout/>
            </CartContextProvider>
        </UserProgressContextProvider>
    </>
  );
}

export default App;
