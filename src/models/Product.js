import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VariantSchema = new Schema({
  sku: String,
  color: String,
  price: Number,
  stock: Number
});

const ReviewSchema = new Schema({
  userId: Schema.Types.ObjectId,
  rating: Number,
  comment: String
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  description: String,

  variants: [VariantSchema],

  reviews: [ReviewSchema]
});

export default model("Product", ProductSchema);