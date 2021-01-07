import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../components/Product'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'

export const HomeScreen = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/products')
                setLoading(false)
                setProducts(data)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

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

