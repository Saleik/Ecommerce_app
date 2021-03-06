import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import { CheckoutSteps } from '../components/CheckoutSteps'

export const PaymentMethodScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    let history = useHistory()
    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input value="PayPal" type="radio" id="paypal" name="paymentMethod" required checked onChange={e => setPaymentMethod(e.target.value)} />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div>
                        <input value="stripe" type="radio" id="stripe" name="paymentMethod" required onChange={e => setPaymentMethod(e.target.value)} />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
