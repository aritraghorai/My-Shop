import mongoose, {
    Document,
    HydratedDocument,
    Schema
} from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserType } from './user.type'

interface UserDocumentType extends UserType, Document {
    matchPassword: (
        enterPassword: string
    ) => Promise<boolean>
}

const userSchema: Schema<UserDocumentType> =
    new mongoose.Schema(
        {
            name: {
                type: 'string',
                required: true
            },
            email: {
                type: 'string',
                required: true,
                unique: true
            },
            password: {
                type: 'string',
                required: true
            },
            isAdmin: {
                type: 'boolean',
                required: true,
                default: false
            }
        },
        {
            timestamps: true
        }
    )
userSchema.methods.matchPassword = async function (
    enterPassword: string
) {
    return await bcrypt.compare(
        enterPassword,
        this.password
    )
}
userSchema.pre<HydratedDocument<UserDocumentType>>(
    'save',
    async function (next) {
        //*Only run is password is modified
        if (!this.isModified('password')) {
            return next()
        }
        //*encript the password
        this.password = await bcrypt.hash(this.password, 12)
        next()
    }
)

const User = mongoose.model<UserDocumentType>(
    'User',
    userSchema
)

export default User
