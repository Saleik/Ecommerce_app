import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
    data
} from '../data.js'
import {
    Product
} from '../models/productModel.js';
import {
    isAuth,
    isSellerOrAdmin
} from '../utils.js'

export const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const category = req.query.category || '';
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
    const priceFilter = min && max ? {
        price: {
            $gte: min,
            $lte: max
        }
    } : {};
    const ratingFilter = rating ? {
        rating: {
            $gte: rating,
        }
    } : {};
    const categoryFilter = category ? {
        category
    } : {};
    const nameFilter = name ? {
        name: {
            $regex: name,
            $options: 'i'
        }
    } : {};
    const sellerFilter = seller ? {
        seller
    } : {};

    const sortOrder = ()=>{
        switch (order) {
            case 'lowest':
                return {price:1};
            case 'highest':
                return {price:-1};
            case 'toprated':
                return {rating:-1};
            default:
                return { _id:-1};
        }
    }
    const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    }).populate('seller', 'seller.name seller.logo')
    .sort(sortOrder());
    res.send(
        products
    )
}))

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'seller.name seller.logo seller.rating seller.numReviews');
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({
            message: "Product not Found"
        })
    }

}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    /*     await Product.remove({})*/
    const createdProducts = await Product.insertMany(data.products)
    res.send({
        createdProducts
    });
}))

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name' + Date.now(),
        seller: req.user._id,
        image: '/img/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    })

    const createdProduct = await product.save()

    res.send({
        message: 'Product Created',
        product: createdProduct
    })
}))

productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();

        res.send({
            message: "Product Updated Successfully",
            product: updatedProduct
        })
    } else {
        res.status(404).send({
            message: 'Product Not found'
        });
    }
}))

productRouter.delete('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const deletedProduct = await product.remove();
        res.send({
            message: 'product Deleted',
            product: deletedProduct
        });
    } else {
        res.status(404).send({
            message: 'Product Not Found'
        })
    }
}))