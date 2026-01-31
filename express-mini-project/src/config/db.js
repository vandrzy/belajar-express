import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Berhasil terhubung dengan database");
    } catch (error) {
        console.log("Koneksi ke database gagal: ", error.name);
        process.exit(1);
    }
}

export default connectDB;