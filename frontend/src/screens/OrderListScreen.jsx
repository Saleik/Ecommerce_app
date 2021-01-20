import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderAction';
import moment from 'moment';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export const OrderListScreen = props => {

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);

    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const dispatch = useDispatch()
    useEffect(() => {
        if (successDelete) {
            dispatch({
                type: ORDER_DELETE_RESET
            });
        }
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const dateHandler = (date) => {
        const dateParse = moment(date).format("DD/MM/YYYY");
        return dateParse
    };

    const deleteHandler = (orderId) => {
        if (window.confirm('Are you sure to delete ?')) {
            dispatch(deleteOrder(orderId));
        }
    }
    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                <>
                    {loadingDelete && <LoadingBox />}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{dateHandler(order.createdAt)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? dateHandler(order.paidAt) : 'No'}</td>
                                    <td>{order.isDelivered ? dateHandler(order.deliveredAt) : 'No'}</td>
                                    <td>
                                        <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>Details</button>
                                        <button type="button" className="small" onClick={() => deleteHandler(order._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
