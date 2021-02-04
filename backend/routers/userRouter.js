import bcrypt from 'bcryptjs';
import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
    data
} from '../data.js'
import {
    User
} from '../models/userModel.js';
import {
    generateToken,
    isAdmin,
    isAuth
} from '../utils.js';

export const userRouter = express.Router();

userRouter.get('/top-sellers', expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({
        isSeller: true
    }).sort({
        'seller.rating': -1
    }).limit(3);

    res.status(200).send(topSellers);
}));

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (re, res) => {
    const users = await User.find({});
    res.status(200).send(users);
}));

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.status(200).send({
        createdUsers
    });
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            })
            return;
        }
    };

    res.status(401).send({
        message: 'invalid email or password'
    });

}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const createdUser = await user.save();

    res.status(201).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        token: generateToken(createdUser)
    });
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(200).send(user)
    } else {
        res.send({
            message: 'User Not Found'
        });
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();

        res.status(200).send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateToken(updatedUser)
        });
    }
}));

userRouter.delete('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            return res.status(403).send({
                message: 'Can Not Delete Admin User'
            });
        }
        const userDeleted = await user.remove();
        res.status(200).send({
            message: 'User Deleted Successfully.',
            user: userDeleted
        });
    } else {
        res.send({
            message: 'User Not Found.'
        });
    }
}));

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.isSeller = Boolean(req.body.isSeller);

        const userUpdated = await user.save();

        res.status(200).send({
            message: 'User Updated Successfully',
            user: userUpdated
        });
    } else {
        res.send({
            message: 'User Not Found.'
        });
    }
}))