import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Product } from '../components/Product'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { listProducts } from '../actions/productActions'

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    console.log(products)
    return <>
        {loading ? (<LoadingBox />)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (<div className="row center ">
                    {products.map(p => <Product key={p._id} product={p} />)}
                </div>)}
    </>

}

