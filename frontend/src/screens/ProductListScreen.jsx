import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts } from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export const ProductListScreen = props => {

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate,
        success: successCreate,
        error: errorCreate,
        product: createdProduct } = productCreate

    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts());
    }, [dispatch, successCreate, createdProduct, props.history])

    const deleteHandler = (productId) => {
        //TODO: dispatch delete action
    }

    const createHandler = () => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>Create Product</button>
            </div>
            {loadingCreate && <LoadingBox />}
            {errorCreate && <MessageBox variant="danger">{error}</MessageBox>}
            {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (<tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button type="button" className="small"
                                    onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                <button type="button" className="small"
                                    onClick={() => deleteHandler(product._id)}
                                >Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

