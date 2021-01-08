import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux"
import thunk from "redux-thunk"
import {
    productDetailsReducers,
    productListReducers
} from './reducers/productReducers'
import {
    cartReducer
} from './reducers/cartReducers'


const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
};
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))