import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import { globalErrorHandler } from './src/utils/globalErrorHandler.js';
import userRouter from './src/modules/user/userRoute.js';
import productRouter from './src/modules/product/productRoute.js';


dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.use(globalErrorHandler);

app.listen(PORT, ()=> {
    console.log('Server berjalan pada port: ', PORT);
})
