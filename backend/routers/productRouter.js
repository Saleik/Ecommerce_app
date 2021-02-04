import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
    data
} from '../data.js'
import {
    Product
} from '../models/productModel.js'
import {
    User
} from '../models/userModel.js'
import {
    isAuth,
    isSellerOrAdmin
} from '../utils.js'

export const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = parseInt(req.query.pageNumber) || 1;
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

    const sortOrder = () => {
        switch (order) {
            case 'lowest':
                return {
                    price: 1
                };
            case 'highest':
                return {
                    price: -1
                };
            case 'toprated':
                return {
                    rating: -1
                };
            default:
                return {
                    _id: -1
                };
        }
    };

    const count = await Product.countDocuments({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    });

    const products = await Product.find({
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        }).populate('seller', 'seller.name seller.logo')
        .sort(sortOrder())
        .skip(pageSize * (page - 1))
        .limit(pageSize)
    res.status(200).send({
        products,
        page,
        pages: Math.ceil(count / pageSize)
    });
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {

    const seller = await User.findOne({
        isSeller: true
    })

    if (seller) {
        const products = data.products.map((product) => ({
            ...product,
            seller: seller._id,
        }));
        const createdProducts = await Product.insertMany(products);
        res.send({
            createdProducts
        });
    } else {
        res.status(500).send({
            message: 'No seller found. first run /api/users/seed'
        });
    }
}));

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.status(200).send(categories);
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'seller.name seller.logo seller.rating seller.numReviews');
    if (product) {
        res.status(200).send(product)
    } else {
        res.send({
            message: "Product not Found"
        });
    }

}));

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user.seller.name && user.seller.logo && user.seller.description) {
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
        });

        const createdProduct = await product.save();

        res.status(201).send({
            message: 'Product Created',
            product: createdProduct
        });
    } else {
        res.status(405).send({
            message: "Please register store info in User Profile before."
        })
    }

}));

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

        res.status(200).send({
            message: "Product Updated Successfully",
            product: updatedProduct
        })
    } else {
        res.send({
            message: 'Product Not found'
        });
    }
}))

productRouter.delete('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const deletedProduct = await product.remove();
        res.status(200).send({
            message: 'product Deleted',
            product: deletedProduct
        });
    } else {
        res.send({
            message: 'Product Not Found'
        })
    }
}));

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
        if (product.reviews.find(x => x._userId.toString() === req.user._id)) {
            return res.status(400).send({
                message: 'You already submitted a review'
            });
        }
        const review = {
            _userId: req.user._id,
            name: req.user.name,
            comment: req.body.comment,
            rating: parseInt(req.body.rating),
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;

        const updateProduct = await product.save();
        res.status(201).send({
            message: 'Product Review Created',
            review: updateProduct.reviews[updateProduct.reviews.length - 1]
        });

    } else {
        res.send({
            message: 'Product Not Found'
        });
    }
}));