import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nama wajib diisi"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email wajib diisi"],
            unique: true,
            lowercase: true
        },
        age: {
            type: Number,
            min: 0,
            required: [true, "Umur wajib diisi"]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;


