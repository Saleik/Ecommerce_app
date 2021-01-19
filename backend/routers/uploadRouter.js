import multer from 'multer';
import express from 'express'
import {
    isAdmin,
    isAuth
} from '../utils.js';

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },

    filename(req, file, callback) {
        callback(null, `${Date.now()}.jpg`);
    }
});

const uploadMiddleware = multer({
    storage
});

uploadRouter.post('/', uploadMiddleware.single('imageFile'), isAuth, isAdmin, (req, res) => {
    res.send(`/${req.file.path}`);
})