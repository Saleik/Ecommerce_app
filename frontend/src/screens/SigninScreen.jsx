import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userAction'

export const SigninScreen = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/'

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo}= userSignin;

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Sign In</h1>
            </div>
            <div>
                <label htmlFor="email"></label>
                <input type="email" id="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div><label htmlFor="password"></label>
                <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <label />
                <button type="submit" className="primary"> Sign In</button>
            </div>
            <div>
                <label />
                <div>
                    New customer? {' '} <Link to="/register"> Create your account</Link>
                </div>
            </div>
        </form>
    </div>

}
