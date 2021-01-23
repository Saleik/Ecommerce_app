import multer from 'multer';
import express from 'express'
import {
    isAdmin,
    isAuth,
    isSeller
} from '../utils.js';

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename(req, file, cb) {
        cb(null, `${file.originalname.replace('.jpg', '-').toLocaleLowerCase()+ Date.now()}.jpg`);
    }
});

const uploadMiddleware = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    }
});

uploadRouter.post('/', uploadMiddleware.single('imageFile'), isAuth, isAdmin, (req, res) => {
    res.send(`/${req.file.path}`);
});

uploadRouter.post('/logo', uploadMiddleware.single('logoFile'), isAuth, isSeller, (req, res) => {
    res.send(`/${req.file.path}`);
});