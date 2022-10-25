import mongoose, { Document, Schema } from 'mongoose'
import { ReviewType } from './review.type'

export interface typeReviewDocument
    extends ReviewType,
        Document {
    createdAt: Date
    updatedAt: Date
}

export const reviewSchema: Schema<typeReviewDocument> =
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        },
        {
            timestamps: true
        }
    )
