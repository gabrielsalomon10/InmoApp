import { IProduct } from '../interfaces/products';
import mongoose, { Schema, model, Model } from 'mongoose';

const productSchema = new Schema({
    description: { type: String, required: true, default: '' },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: { 
        type: String,
             },
}, {
    timestamps: true
});

// Crear indice de Mongo
productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );

export default Product;