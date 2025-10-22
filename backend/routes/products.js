// routes/products.js
const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (memerlukan auth)
router.post('/', requireAuth, createProduct);
router.put('/:id', requireAuth, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

module.exports = router;