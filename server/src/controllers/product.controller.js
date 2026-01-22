const supabase = require('../config/supabase');

const getAllProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true);

        if (error) throw error;

        // Map database fields to frontend expected format
        const products = data.map(product => ({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image_url,
            category: product.category
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = {
            id: data.id,
            name: data.name,
            price: parseFloat(data.price),
            image: data.image_url,
            category: data.category
        };

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById
};
