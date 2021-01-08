import React, { useEffect } from "react"
import {useDispatch} from "react-redux"
import { addToCart } from "../actions/cartAction";

export const CartScreen = props => {
    const dispatch = useDispatch()
    const productId = props.match.params.id;
    //TODO: Get the value to quantity set in props.search.params
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])
    
    return <div>
        <h1>Cart screen</h1>
        <p>ADD TO CART : ProductID:{productId} Quantity: {quantity}</p>
    </div>
}

