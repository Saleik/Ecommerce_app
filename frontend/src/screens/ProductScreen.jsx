import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Rating } from '../components/Rating'
import { createReview, detailsProduct } from '../actions/productActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'

export const ProductScreen = props => {
    const [quantity, setQuantity] = useState(1);
    const productId = props.match.params.id;

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector(state => state.ProductReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({
                type: PRODUCT_REVIEW_CREATE_RESET
            })
        }
        dispatch(detailsProduct(productId))
    }, [dispatch, productId, successReviewCreate])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.name }));
        }
    }

    const dateHandler = (date) => {
        const dateParse = moment(date).format("DD/MM/YYYY");
        return dateParse
    };
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
                                        Seller
                                         <h2>
                                            <Link to={`/seller/${product.seller._id}`}>
                                                {product.seller.seller.name}
                                            </Link>
                                        </h2>
                                        <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews} />
                                    </li>
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
                    <div>
                        <h2 id="reviews">
                            Reviews
                                </h2>
                        {product.reviews.length === 0 && (<MessageBox>There is no review</MessageBox>)}
                        <ul>
                            {product.reviews.map(review => (<li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=" " />
                                <p>{dateHandler(review.createdAt)}</p>
                                <p>{review.comment}</p>
                            </li>))}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Write a customer review</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Rating</label>
                                            <select defaultValue={rating} name="rating" id="rating" onChange={e => setRating(e.target.value)}>
                                                <option value="">Select...</option>
                                                <option value="1">1- Poor</option>
                                                <option value="2">2- Fair</option>
                                                <option value="3">3- Good</option>
                                                <option value="4">4- Very Good</option>
                                                <option value="5">5- Excellent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Comment</label>
                                            <textarea name="comment" id="comment" defaultValue={comment} onChange={e => setComment(e.target.value)} cols="30" rows="10" />
                                        </div>
                                        <div>
                                            <button type="submit" className="primary">
                                                Submit
                                                </button>
                                        </div>
                                        <div>
                                            {loadingReviewCreate && <LoadingBox />}
                                            {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                        </div>
                                    </form>
                                ) : (
                                        <MessageBox>
                                            <Link to="/signin">Sign In</Link> to write a reviews
                                        </MessageBox>
                                    )}
                            </li>
                        </ul>
                    </div>
                </>)}
    </>

}
