import mongoose, { Schema, Model, model } from 'mongoose';
import { IAdmin } from '../interfaces';


const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String }
});

const Admin:Model<IAdmin> = mongoose.models.Admin || model('Admin', adminSchema );

export default Admin;