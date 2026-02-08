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
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },
    imageUrl: {
        type: String,
        default: 'belum ada'
    },
    imagePublicId: {
        type: String,
        default: 'Belum ada'
    }
},{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

export default User;