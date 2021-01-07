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


const initialState = {};
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))