import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userAction';
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export const UserEditScreen = props => {

    const userId = props.match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: LoadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/users');
        }

        if (!user || (user._id !== userId)) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    }, [dispatch, userId, user, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ userId: userId, name, email, isAdmin, isSeller }));
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit User{name}</h1>
                </div>
                {LoadingUpdate && <LoadingBox />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" defaultValue={name} placeholder="Enter name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" defaultValue={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                        </div>
                        <div>
                            <label htmlFor="isSeller">Is Seller</label>
                            <input type="checkbox" id="isSeller" name="isSeller" checked={isSeller} onChange={e => setIsSeller(e.target.checked)} />
                        </div>
                        <div>
                            <button type="submit" className="primary block">Update</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
