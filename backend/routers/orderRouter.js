import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
    Order
} from '../models/orderModel.js'
import {
    isAdmin,
    isAuth,
    isSellerOrAdmin
} from '../utils.js'

export const orderRouter = express.Router();

orderRouter.get('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller;
    const sellerFilter = seller ? {
        seller
    } : '';
    const orders = await Order.find({
        ...sellerFilter
    }).populate('user', 'name');

    if (orders) {
        res.status(200).send(orders);
    } else {
        res.status(404).send({
            message: 'There is no Orders at this time.'
        });
    }
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({
        user: req.user._id
    })
    res.status(200).send(orders)
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({
            message: 'Cart is empty'
        })
    } else {
        const order = new Order({
            seller: req.body.cartItems[0].seller,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            paymentMethod: req.body.paymentMethod,
            user: req.user._id,
        });

        const createdOrder = await order.save();
        res.status(201).send({
            message: 'New Order Created',
            order: createdOrder
        });
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order)
    } else {
        res.status(404).send({
            message: 'Order Not Found'
        });
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save();
        res.status(201).send({
            message: 'Order Paid',
            order: updatedOrder
        });
    } else {
        res.status(404).send({
            message: 'Order not found'
        });
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        const deleteOrder = await order.remove();

        res.status(200).send({
            message: 'Order Successfully Deleted',
            order: deleteOrder
        });
    } else {
        res.status(404).send({
            message: 'Order Not found'
        });
    }
}));

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save()
        res.status(200).send({
            message: 'Order Delivered',
            order: updatedOrder
        })
    } else {
        res.status(404).send({
            message: 'Order not found'
        })
    }
}));