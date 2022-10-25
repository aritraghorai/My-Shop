import mongoose from 'mongoose'
import { MONGOOSE_URL } from './config'

const connectDb = async () => {
    try {
        mongoose.connect(MONGOOSE_URL || '')
        console.log(`Connected to Mongodb succesfullt`)
    } catch (err) {
        console.log(err)
    }
}

export default connectDb
