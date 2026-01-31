import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    description : {
        type: String,
        required: true,
        default: 'Ini produk baru',
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;