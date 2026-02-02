import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Nama wajib diisi']
    },
    email: {
        type: String,
        required: [true, 'Email wajib diisi'],
        unique: [true, 'Email wajib unik']
    },
    password: {
        type: String,
        required: [true, 'Password wajib diisi']
    }
},{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

export default User;