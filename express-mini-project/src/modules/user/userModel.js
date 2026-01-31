import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama wajib diisi'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email wajib diisi'],
            unique: [true, 'Email sudah digunakan'],
            lowercase: true
        },
        age: {
            type: Number,
            required: [true, 'Umur wajib diisi'],
            min: 0,
        }
    },{
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;