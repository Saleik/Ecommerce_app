import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userAction'
import { MessageBox } from '../components/MessageBox'
import { LoadingBox } from '../components/LoadingBox'

export const SigninScreen = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo, error, loading } = userSignin;

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Sign In</h1>
            </div>
            {loading && <LoadingBox />}
            {error && <MessageBox>{error}</MessageBox>}
            <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div><label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <label />
                <button type="submit" className="primary"> Sign In</button>
            </div>
            <div>
                <label />
                <div>
                    New customer? {' '} <Link to={`/register?redirect=${redirect}`}> Create your account</Link>
                </div>
            </div>
        </form>
    </div>

}
