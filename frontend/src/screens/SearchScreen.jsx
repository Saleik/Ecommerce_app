import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Product } from '../components/Product';

export const SearchScreen = props => {

    const { name = 'all' } = useParams();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name : '' }))
    }, [dispatch, name]);
    return (
        <div>
            <div className="row top">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <div>{products.length} Results</div>
                        )}
            </div>
            <div className="row">
                <div className="col-1">
                    <h3>Department</h3>
                    <ul>
                        <li>Category 1</li>
                    </ul>
                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {products.length === 0 && <MessageBox> No Product Found </MessageBox>}
                                    <div className="row center ">
                                        {products.map(p => <Product key={p._id} product={p} />)}
                                    </div>
                                </>
                            )}
                </div>
            </div>
        </div>
    )
}
