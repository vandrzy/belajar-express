import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Berhasil terhubung ke database');
    } catch (error) {
        console.log('Gagal terhubung ke database: ', error.name);
        process.exit(1);
    }
}

export default connectDB