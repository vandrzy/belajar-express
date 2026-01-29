import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import userRouter from './src/modules/user/userRoutes.js';
import globalErrorHandler from './src/utils/globalErrorHandler.js';
import postRouter from './src/modules/post/postRoute.js';
import roleRouter from './src/modules/role/roleRoute.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use('/api/post', postRouter);
app.use('/api/role', roleRouter);


app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log("Server berjalan pada port: ", PORT);
})
