import mongoose from 'mongoose';

const connetDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI
        if (!mongoUri) throw new Error('Database tidak ada');
        await mongoose.connect(mongoUri);
        console.log('Berhasil terhubung ke database');
    } catch (error: any) {
        console.error('Gagal terhubung ke database');
        process.exit(1);
    }
}

export default connetDB;