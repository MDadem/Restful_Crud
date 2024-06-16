import Product from '../models/product.model.js';

const createProduct = async (req, res) => {
    try {
        const product = new Product({ 
            ...req.body,
            image: req.file ? req.file.filename : undefined
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: 'Error creating product', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching product by ID', error });
    }
};

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = {
            ...req.body,
            image: req.file ? req.file.filename : req.body.image
        };

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ message: 'Error updating product', error });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting product', error });
    }
};

const findProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });

        if (!products.length) {
            return res.status(404).send({ message: 'No products found in this category' });
        }

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products by category', error });
    }
};

export default { 
    createProduct, 
    getProductById,
    getAllProducts, 
    updateProductById, 
    deleteProductById, 
    findProductsByCategory,
};
