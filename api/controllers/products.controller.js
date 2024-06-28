import Product from "../models/product.model.js";

export const create = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newProduct = new Product({
      ...req.body,
      slug,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const queryOptions = {};
    
    if (req.query.slug) {
      queryOptions.slug = req.query.slug;
    }

    const products = await Product.find(queryOptions);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalProducts = await Product.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthProducts = await Product.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
      products,
      totalProducts,
      lastMonthProducts,
    });
  } catch (error) {
    next(error);
  }
};