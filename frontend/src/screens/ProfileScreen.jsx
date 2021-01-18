import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userAction'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

export const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch()

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email)
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault()
        //TODO: dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password doesn\'t match')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ? (<LoadingBox />) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                        <>
                            {loadingUpdate ? (<LoadingBox />) : errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && <MessageBox variant="success">Profile Updated Successfully!</MessageBox>}
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" name="email" placeholder="Enter email" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter name" defaultValue={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div><label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div><label htmlFor="confirmPassword">Confirm passsword</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="primary">Update</button>
                            </div>
                        </>
                    )}
            </form>
        </div>
    )
}
