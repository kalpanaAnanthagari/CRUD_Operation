import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

