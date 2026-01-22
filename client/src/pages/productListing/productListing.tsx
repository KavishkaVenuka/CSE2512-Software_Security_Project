import { Heart, Plus } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// --- Types ---
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

// --- Dummy Data ---
// --- Dummy Data ---
// const products: Product[] = []; // Replaced by API fetch

// --- Components ---



const ProductCard = ({ product }: { product: Product }) => {
    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleProductClick = () => {
        const targetUrl = `/product/${product.id}`;
        if (isAuthenticated) {
            navigate(targetUrl);
        } else {
            loginWithRedirect({
                appState: { returnTo: targetUrl }
            });
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('http://localhost:5000/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ productId: product.id })
                });

                if (response.ok) {
                    alert(`Added ${product.name} to cart!`);
                } else {
                    console.error('Failed to add to cart');
                    alert('Failed to add to cart. Please try again.');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('Error adding to cart. Please try again.');
            }
        } else {
            loginWithRedirect({
                appState: { returnTo: window.location.pathname }
            });
        }
    };
    return (
        <div
            onClick={handleProductClick}
            className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-100 cursor-pointer">
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                />
                {/* Quick Action Overlay */}
                <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white p-2.5 rounded-full shadow-lg text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                    </button>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 truncate pr-2">
                        {product.name}
                    </h3>
                </div>

                <p className="text-xl font-bold text-gray-900 mb-4">
                    ${product.price.toFixed(2)}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg shadow-emerald-200">
                    <Plus className="h-5 w-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="w-full mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {/* Social icons could go here */}
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Choce Moments. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
    }

    return (
        <div className="flex flex-col font-sans">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Our Collection</h2>
                    <p className="text-gray-500">Discover hand-crafted delights made with passion.</p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductListingPage;