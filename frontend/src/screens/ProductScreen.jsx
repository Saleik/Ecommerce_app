import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { detailsProduct } from '../actions/productActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'

export const ProductScreen = props => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails


    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?quantity=${quantity}`)
    }

    console.log(props)
    return <>
        {loading ? (<LoadingBox />)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (<>
                    <Link to="/">Back to result</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name} />
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating rating={product.rating} numReviews={product.numReviews} />
                                </li>
                                <li>
                                    Price: ${product.price}
                                </li>
                                <li>
                                    Description:
                         <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                        <span className="danger">Unavailable</span>
                                                    )}
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <div className="li">
                                                <div className="row">
                                                    <div>Quantity</div>
                                                    <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <li>
                                                <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>)}
    </>

}
