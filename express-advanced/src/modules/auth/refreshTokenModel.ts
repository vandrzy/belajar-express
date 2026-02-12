import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    tokenHash: {
        type: String,
        required: true
    }, 
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    revokedAt: Date,
    replacedByToken: String
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;