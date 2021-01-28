import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux"
import thunk from "redux-thunk"

import {
    productCreateReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
    productDeleteReducer,
    productCategoryListReducer,
    ProductReviewCreateReducer
} from './reducers/productReducers'

import {
    cartReducer
} from './reducers/cartReducers'

import {
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer,
    userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer,
    userTopSellersListReducer,
    userAddressMapReducer
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer,
    orderPayReducer
} from "./reducers/orderReducers"

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'PayPal',
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellersListReducer,
    productCategoryList: productCategoryListReducer,
    ProductReviewCreate: ProductReviewCreateReducer,
    userAddressMap: userAddressMapReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));