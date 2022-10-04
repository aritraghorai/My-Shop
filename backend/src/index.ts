import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import connectDb from './config/db';
import productRouter from './Routes/productRoute';
import orderRouter from './Routes/orderRoutes';
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandlerMiddleare';
import userRouter from './Routes/userRouter';
import bodyParser from 'body-parser';
import Razorpay from 'razorpay';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });
connectDb();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});
const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../public'));
app.use('/images', express.static(path.join(__dirname, '../public/Images')));

app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//*Error Handler
app.use(globalErrorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
export default app;
