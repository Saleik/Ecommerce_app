import {
    config
} from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import {
    productRouter
} from './routers/productRouter.js';
import {
    userRouter
} from './routers/userRouter.js'
import {
    orderRouter
} from './routers/orderRouter.js'
import {
    uploadRouter
} from './routers/uploadRouter.js';

const dotenv = config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommercelab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID||'');
});

app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY ||'');
});

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message
    });
});

const port = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Serve at http://localhost:${port}`)
});