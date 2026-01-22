import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface CartItem {
    id: string; // Changed from number to string (UUID)
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Mock Data NOT USED - Fetching from API
const INITIAL_CART_ITEMS: CartItem[] = [];

const ShoppingCartPage: React.FC = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
    const [subtotal, setSubtotal] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!isAuthenticated) {
                    setLoading(false);
                    return;
                }

                const token = await getAccessTokenSilently();
                const response = await fetch('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else {
                    console.error('Failed to fetch cart');
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [getAccessTokenSilently, isAuthenticated]);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(total);
    }, [cartItems]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>;
    }

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8" />
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12 bg-surface rounded-lg shadow-sm">
                                <p className="text-gray-500 text-lg">Your cart is empty.</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-surface p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-shadow hover:shadow-md"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full sm:w-24 h-24 object-cover rounded-md"
                                    />

                                    <div className="flex-1 w-full text-center sm:text-left">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500">${item.price.toFixed(2)} / unit</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="text-right min-w-[80px]">
                                        <p className="font-bold text-lg text-primary">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-accent hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary Column */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface p-6 rounded-lg shadow-sm sticky top-4">
                            <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax Estimate</span>
                                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Order Total</span>
                                    <span>${(subtotal + 5 + subtotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Discount Code */}
                            <div className="mb-6">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Discount Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="discount"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    />
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <button className="w-full bg-secondary text-white py-3 rounded-lg font-bold shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all active:scale-[0.98]">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;
