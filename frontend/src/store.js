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

import {
    userSigninReducers
} from './reducers/userSigninReducers'

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
    userSignin:{
        userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
    }
};
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userSignin: userSigninReducers
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))