import mongoose from 'mongoose'
import {
    reviewSchema
} from './reviewSchema.js'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)