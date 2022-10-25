import express, {
    Request,
    Response,
    Application
} from 'express'
import cors from 'cors'
import connectDb from './utils/db'
import productRouter from './Routes/product.routes'
import orderRouter from './Routes/order.routes'
import path from 'path'
import globalErrorHandler from './middleware/globalErrorHandlerMiddleare'
import userRouter from './Routes/user.routes'
import bodyParser from 'body-parser'
import morgan from 'morgan'

connectDb()

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
morgan.token('body', (req: Request) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else ''
})
//*Morgan Middleware
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)
app.use(
    express.static(path.join(__dirname, '../', 'public'))
)
app.use(
    '/images',
    express.static(path.join(__dirname, '../public/Images'))
)

app.use('/api/products', productRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)

app.get('/', (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, '../public', 'index.html')
    )
})

//*Error Handler
app.use(globalErrorHandler)

export default app
