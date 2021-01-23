import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { Product } from '../components/Product'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { listProducts } from '../actions/productActions'
import { ListTopSellers } from '../actions/userAction'
import { Link } from 'react-router-dom'

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userTopSellersList = useSelector(state => state.userTopSellersList);
    const { loading: topSellersLoading, error: topSellersError, topSellers } = userTopSellersList;

    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(ListTopSellers());
    }, [dispatch]);

    return <>
        <h2>Top Sellers</h2>
        {topSellersLoading ? (<LoadingBox />)
            :
            topSellersError ? (<MessageBox variant="danger">{topSellersError}</MessageBox>)
                : (
                    <>
                        { topSellers.length === 0 && <MessageBox> No Sellers Found </MessageBox>}
                        <Carousel showStatus={false} autoPlay showThumbs={false}>
                            {topSellers.map(seller => (
                                <div key={seller._id}>
                                    <Link to={`/seller/${seller._}`} />
                                    <img className="imgSlide" src={seller.seller.logo} alt={seller.seller.name} />
                                    <p className="legend">{seller.seller.name}</p>
                                </div>
                            ))}
                        </Carousel>
                    </>
                )

        }
        <h2>Featured Products</h2>
        {loading ? (<LoadingBox />)
            :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <>
                        { products.length === 0 && <MessageBox> No Product Found </MessageBox>}
                        <div className="row center ">
                            {products.map(p => <Product key={p._id} product={p} />)}
                        </div>
                    </>)}
    </>

}

