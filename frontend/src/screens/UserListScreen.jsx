import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, ListUsers } from '../actions/userAction'
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export const UserListScreen = props => {

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListUsers());
        dispatch({ type: USER_DETAILS_RESET })
    }, [dispatch, deleteSuccess]);

    const deleteHandler = (userId) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(DeleteUser(userId));
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {deleteLoading && <LoadingBox />}
            {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
            {deleteSuccess && <MessageBox variant="success">User Deleted Successfully</MessageBox>}

            {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td>
                                    <button type="button" className="small" onClick={() => props.history.push(`/users/${user._id}/edit`)}>Edit</button>
                                    <button type="button" className="small" onClick={() => deleteHandler(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
