import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connetDB from './config/db';
import globalErrorHandler from './utils/globalErrorHandler';
import authRoute from './modules/auth/authRoute';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser())

app.use('/api/auth', authRoute);

app.use(globalErrorHandler)

connetDB().then(() =>{
    app.listen(PORT, ()=> {
        console.log('Server berjalan pada port: ', PORT);
    })
}).catch((error: any) => {
    console.error('Server gagal berjalan: ', error.name);
    console.error(error.message);
})