import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, 
        required: true
    },
    users: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
},{
    timestamps: true
}
);

export const Role = mongoose.model('Role', roleSchema);

