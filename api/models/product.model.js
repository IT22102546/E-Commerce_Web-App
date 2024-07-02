import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
     
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [
        'https://i0.wp.com/woodwoon.com/wp-content/uploads/2023/01/SOS0002-sofa-set-sofa-design-furniture-store-in-pakistan.webp?fit=1024%2C787&ssl=1'
      ],
    },
    mainImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    promotions: {
      type: String,
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: String,
    },
    isfeature:{
        type: Boolean,
        default:false
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
