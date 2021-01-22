import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const SellerRoute = ({ component: Component, ...rest }) => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route exact {...rest} render={props => userInfo && userInfo.isSeller ? (<Component {...props} />) : (
            <Redirect to="/signin" />
        )}
        ></Route>
    )
}