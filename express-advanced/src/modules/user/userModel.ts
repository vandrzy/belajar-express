import mongoose from "mongoose"

export interface UserInterface {
    username: string,
    email: string,
    password: string,
    role: string
}

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username wajib diisi'],
        unique: [true, 'Username harus unik']
    },
    email: {
        type: String,
        required: [true, 'Username wajib diisi'],
        unique: [true, 'Email telah digunakan']
    },
    password: {
        type: String,
        required: [true, 'Password wajib diisi'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    }
},{
    timestamps: true
}
)

const User = mongoose.model<UserInterface>('User', userShema);

export default User;