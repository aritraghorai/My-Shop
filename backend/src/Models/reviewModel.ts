import mongoose, { Document, Schema } from 'mongoose';

export interface typeReview {
  name: string;
  rating: number;
  comment: string;
}
export interface typeReviewDocument extends typeReview, Document {}

const reviewSchema: Schema<typeReviewDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default reviewSchema;
