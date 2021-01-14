import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'

export const PlaceOrderScreen = props => {
    const cart = useSelector(state => state.cart)
    //FIXME:Redirect user when is disconnected to payment screen
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const { error, success, loading, order } = orderCreate
    const toPrice = (num) => parseFloat(num.toFixed(2))

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(cart.itemsPrice * 20 / 100)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice
    const history = useHistory()
    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, success, order, history])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map(item => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img src={item.image} className="small" alt={item.name} />
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.quantity} x ${item.price} = ${item.quantity * item.price}</div>
                                            </div>
                                        </li>))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0 || loading}>Place Order</button>
                            </li>
                            {loading && <LoadingBox />}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
