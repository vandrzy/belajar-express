import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log("Server berjalan pada port: ", PORT);
})
