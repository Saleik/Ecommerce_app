import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderAction'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAYMENT_RESET } from '../constants/orderConstants'
import moment from 'moment'

export const OrderScreen = props => {

    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { error: errorDeliver, success: successDeliver, loading: loadingDeliver } = orderDeliver;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAYMENT_RESET });
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const dateHandler = (date) => {
        const dateParse = moment(date).format("DD/MM/YYYY hh:mm:ss a")
        return dateParse
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    }


    return loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
        <div>
            <h1>Order: {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? <MessageBox variant="success">Delivered at: {dateHandler(order.deliveredAt)}</MessageBox> : <MessageBox variant="danger">Not delivered</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{order.paymentMethod}
                                </p>
                                {order.isPaid ? <MessageBox variant="success">Paid at: {dateHandler(order.paidAt)}</MessageBox> : <MessageBox variant="danger">Not paid</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map(item => (
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>

                            {!order.isPaid && order.user === userInfo._id && (<li>
                                {!sdkReady ? (<LoadingBox />) : (
                                    <>
                                        {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                        {loadingPay && (<LoadingBox />)}
                                        <PayPalButton onButtonReady={() => setSdkReady(true)} amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    </>)}
                            </li>)}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                    {errorDeliver && (<MessageBox variant="danger">{errorDeliver}</MessageBox>)}
                                    {loadingDeliver && (<LoadingBox />)}
                                    <button type="button" className="primary block" onClick={deliverHandler}>Deliver Order</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
}
