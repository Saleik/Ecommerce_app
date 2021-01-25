import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart } from "../actions/cartAction";
import { MessageBox } from "../components/MessageBox"

export const CartScreen = props => {
    const dispatch = useDispatch()
    const productId = props.match.params.id;

    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart)
    const { cartItems, error } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {

        props.history.push('/signin?redirect=shipping')
    }

    return <div className="row top">
        <div className="col-2">
            <h1>Shopping Cart</h1>
            {error && (<MessageBox variant="danger">{error}</MessageBox>)}
            {
                cartItems.length === 0 ? <MessageBox>Cart is empty. <Link to="/">Go Shopping</Link></MessageBox>
                    :
                    (<ul>
                        {
                            cartItems.map(item => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} className="small" alt={item.name} />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.quantity} onChange={e => dispatch(addToCart(item.product, parseInt(e.target.value, 10)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                        </div>
                                    </div>
                                </li>))
                        }
                    </ul>)
            }
        </div>
        <div className="col-1">
            <div className="card card-body">
                <ul>
                    <li>
                        <h2>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</h2>
                    </li>
                    <li>
                        <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                            Proceed to Checkout
                            </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

