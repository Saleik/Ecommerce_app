import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../node_modules/axios/index';
import { detailsProduct, updateProduct } from '../actions/productActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export const ProductEditScreen = props => {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.goBack();
        }
        if (!product || (product._id !== productId) || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [productId, dispatch, product, props.history, successUpdate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image, category, countInStock, brand, description }));

    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();

        bodyFormData.append('imageFile', file);
        setLoadingUpload(true);

        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="text" name="price" id="name" placeholder="Enter price" defaultValue={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input type="text" name="image" id="image" placeholder="Enter image" defaultValue={image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image file</label>
                            <input type="file" name="imageFile" id="imageFile" placeholder="Choose image" onChange={uploadFileHandler} />
                            {loadingUpload && <LoadingBox />}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" placeholder="Enter category" defaultValue={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input type="text" name="countInStock" id="countInStock" placeholder="Enter countInStock" defaultValue={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" placeholder="Enter brand" defaultValue={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" row="3" name="description" id="description" placeholder="Enter description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label />
                            <button type="submit" className="primary">Update</button>
                        </div>
                    </>}
            </form>
        </div>
    )
}
