import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction'
import { MessageBox } from '../components/MessageBox'
import { LoadingBox } from '../components/LoadingBox'

export const RegisterScreen = props => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = userRegister;

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Password and confirm password are not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Create account</h1>
            </div>
            {loading && <LoadingBox />}
            {error && <MessageBox>{error}</MessageBox>}
            <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter name" onChange={e => setName(e.target.value)} required />
            </div>
            <div><label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div><label htmlFor="confirmPassword">Confirm passsword</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            <div>
                <label />
                <button type="submit" className="primary"> Register</button>
            </div>
            <div>
                <label />
                <div>
                    Already have a account? {' '} <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
                </div>
            </div>
        </form>
    </div>

}
