import React from 'react'
import {data} from '../../../backend/data'
import {Product} from '../components/Product'

export const HomeScreen = () => {
    return <div className="row center ">
            {data.products.map((p)=> <Product key={p._id} product={p} />)}
        </div>
    
}

