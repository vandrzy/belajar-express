import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Harus ada username!'],
    }, email:{
        type: String,
        required: [true, 'Email harus diisi!'],
        unique: [true, 'Email sudah digunakan'],
    }, password:{
        type: String,
        required: [true, 'Password wajib diisi']
    }, role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    }, imageUrl: {
        type: String,
        default: null
    }, imagePublicId: {
        type: String,
        default: null
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;