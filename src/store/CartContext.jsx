import {createContext, useReducer, useState} from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action){//devuelve un estado actualizado
    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];
        if(existingCartItemIndex > -1){//ya existe
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});// debemos asegurarnos de que tenemos esa propiedad de cantidad en los elementos que estamos añadiendo como nuevos elementos a esa matriz, porque de lo contrario acceder a esta propiedad de cantidad como lo estoy haciendo en linea 17, fallará en el futuro.
        }
        return { ...state, items: updatedItems};//devuelve el estado actualizado
    }
    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);//no necesitamos el full item
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }
    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }
    return state;
}
export function CartContextProvider({children}){
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: []});//cada vez que el estado de este carro cambie
    function addItem(item){
        dispatchCartAction({type: 'ADD_ITEM', item: item});//item porque estamos buscando una propiedad item en la linea 11
    }
    function removeItem(id){
        dispatchCartAction({type: 'REMOVE_ITEM', id});
    }
    function clearCart(){
        dispatchCartAction({type: 'CLEAR_CART'});
    }

    const cartContext = {// se puede acceder desde otros componentes en la aplicación y por lo tanto puede ser desencadenada desde dentro de esos componentes.
        items : cart.items,//  aquí también cambiará y este nuevo contexto se distribuirá a todos los componentes interesados.
        addItem: addItem,
        removeItem: removeItem,
        clearCart
    }
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}
export default CartContext;