import express from 'express';
import cors from 'cors';
import morgam from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import globalErrorHandler from './src/utils/globalErrorHandler.js';
import authRoute from './src/modules/auth/authRoute.js';
import userRoute from './src/modules/user/userRoute.js';
import { globalLimiter } from './src/middlewares/globalLimiter.js';

dotenv.config();


const app = express();

const PORT = process.env.PORT;
// helmet menambahkan HTTP security headers otomatis buat proteksi dari:
// XSS
// Clickjacking
// MIME sniffing
app.use(helmet({
    contentSecurityPolicy: false // sebaiknya diaktifkan manual jika frontend kompleks
}))

//cors Cross-Origin Resource Sharing, aturan keamanan browser yg mengatur: boleh tidaknya suatu web mengakses resource api lain
app.use(cors(
    // {
    //  origin: ['http://frontend.com'],
    //  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    //  credentials: true   
    // }
));



app.use(express.json());
app.use(cookieParser()); // memungkinkan mengambil data dari cookie
app.use(morgam('dev'));

app.use('/api/auth', authRoute);
app.use('/api/user', globalLimiter, userRoute);


app.use(globalErrorHandler);

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log('Server berjalan pada port: ', PORT);
    });
}).catch((error) => {
    console.error('Server gagal berjalan: ', error.name);
    console.error(error.message);
})
