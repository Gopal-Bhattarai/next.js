import { createContext, useEffect, useReducer } from "react";

export const ShoppingCartContext = createContext();

//localstorage check
const getLocalCartData = () =>{
    if (typeof window !== 'undefined') {
        const localCartData = localStorage.getItem('GBTechCart') ? localStorage.getItem('GBTechCart') : void 0
        // localCartData === [] ? [] : JSON.parse(localCartData)
        if(localCartData && localCartData===[]){
            return [];
        } else {
            // return localCartData
            return JSON.parse(localCartData)
        }
    }
}

const initialState = {
    cart: [],
    // cart: getLocalCartData(),
    total_item: 0,
    total_price: 0,
    shipping_fee: 100,
};


const ShoppingCartState = (props) => {

    const reducer = (state, action) => {
        const {avatar, price, productName, _id } = action.payload
        switch(action.type) {
            case 'ADD_TO_CART':
                return {
                    ...state,
                    cart: [...state.cart, {avatar, price, productName, _id, qty: 1}],         
                }
            case 'REMOVE_FROM_CART':
                return{
                    ...state,
                    cart: state.cart.filter(each=>each._id!==_id)
                }
            case 'INCREASE':
                    return {
                        ...state,
                        cart: state.cart.map(product=> product._id===_id ? ({...product, qty: product.qty + 1}) : product)
                        }

            case 'DECREASE':
                return {
                    ...state,
                    cart: state.cart.map(product=> product._id===_id ? ({...product, qty: product.qty - 1}) : product)
                }

            case 'CLEAR_CART':
                return {
                    ...state,
                    cart: []
                }
            case 'UPDATE_ITEM_COUNT':
                const total_item = 
                    state?.cart?.reduce((initialVal, curElem)=>{
                        initialVal = initialVal + curElem.qty;
                        return initialVal;
                        },0)

                return {
                    ...state,
                    total_item
                }
            
            case 'UPDATE_TOTAL_COST':
                const total_price = 
                    state.cart.reduce((initialVal, curElem)=>{
                        initialVal = initialVal + (curElem.qty*curElem.price);
                        return initialVal;
                        },0)

                return {
                    ...state,
                    total_price
                        
                }
            default: 
                return state
        }
    }

    const [cart, dispatch] = useReducer(reducer, initialState)

    const clearCart = (product) =>{
        dispatch({ type: 'CLEAR_CART', payload: product})
    }

    useEffect(()=>{
        dispatch({ type: 'UPDATE_ITEM_COUNT', payload: {avatar:'', price:'', productName:'', _id:'' }})
        dispatch({ type: 'UPDATE_TOTAL_COST', payload: {avatar:'', price:'', productName:'', _id:'' }})
        localStorage.setItem('GBTechCart', JSON.stringify(cart.cart))
    },[cart.cart])

    return (
            <ShoppingCartContext.Provider 
            value={{cart, dispatch, clearCart }}>
                {props.children}
            </ShoppingCartContext.Provider>
      )
}

export default ShoppingCartState
