import {Schema, model, models} from 'mongoose'


const productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number
    },
    quantityInStock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    sku:{
        type: String,
        unique: true
    },
    active:{
        type: Boolean,
        default: 1
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    avatar:{
        type: String
    },
    image: [{
        type: String
    }]
}, {
    timestamps: true
})

const Product = models.Product || model("Product", productSchema);

export default Product;