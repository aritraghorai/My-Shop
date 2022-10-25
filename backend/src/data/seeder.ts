import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './user'
import products from './products'
import User from '../Models/User/user.model'
import Product from '../Models/Product/producd.model'
import connectDb from '../utils/db'

dotenv.config({ path: '../../config.env' })

const url = process.env.MONGOOSE_URL || ''
mongoose
    .connect(url)
    .then(() => {
        console.log('Connected Successfullt')
    })
    .catch((err) => {
        console.log(err)
    })

console.log(process.env)

const importData = async () => {
    try {
        try {
            await Product.deleteMany()
        } catch (error) {
            console.log(error)
        }
        try {
            await User.deleteMany()
        } catch (error) {
            console.log(error)
        }

        const createdUsers = await User.insertMany(user)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Inserted Successfully')
        process.exit()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
// importData();
