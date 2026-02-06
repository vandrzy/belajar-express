import express from 'express';
import cors from 'cors';
import morgam from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import globalErrorHandler from './src/utils/globalErrorHandler.js';
import authRoute from './src/modules/auth/authRoute.js';
import userRoute from './src/modules/user/userRoute.js';

dotenv.config();


const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgam('dev'));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


app.use(globalErrorHandler);

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log('Server berjalan pada port: ', PORT);
    });
}).catch((error) => {
    console.error('Server gagal berjalan: ', error.name);
    console.error(error.message);
})
