
import {createContext, useReducer, useState} from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }
    function hideCart() {
        setUserProgress('');
    }
    function showCheckout() {
        setUserProgress('checkout');
    }
    function hideCheckout() {
        setUserProgress('');
    }

    const userProgressCtx = {// se puede acceder desde otros componentes en la aplicación y por lo tanto puede ser desencadenada desde dentro de esos componentes.
        progress : userProgress,//  aquí también cambiará y este nuevo contexto se distribuirá a todos los componentes interesados.
        showCart,
        hideCart,
        showCheckout,
        hideCheckout

    }
    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}
export default UserProgressContext;