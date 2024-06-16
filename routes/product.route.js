import express from 'express';
import productController from '../controllers/product.controller.js';
import upload from '../middleware/storage.js';

const router = express.Router();

router.post('/create', upload.single('image'), productController.createProduct);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/update/:id', upload.single('image'), productController.updateProductById);
router.delete('/delete/:id', productController.deleteProductById);
router.get('/category/:category', productController.findProductsByCategory);

export default router;