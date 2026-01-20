import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Truck, Shield } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Organic Avocados', price: 4.99, quantity: 2 },
    { id: 2, name: 'Fresh Strawberries', price: 6.5, quantity: 1 },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleCheckout = () => {
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Navigation Bar */}
      <nav className="bg-[#059669] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8" />
              <span className="text-xl font-bold">FreshMart</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-6">Checkout</h1>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Your Cart</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div>
                    <p className="text-[#1F2937] font-semibold">{item.name}</p>
                    <p className="text-[#6B7280] text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-[#1F2937]">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[#059669] font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio text-[#059669]" defaultChecked />
                <span className="text-[#1F2937]">Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio text-[#059669]" />
                <span className="text-[#1F2937]">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1F2937] text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-4 rounded-lg transition shadow-md flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t mt-6">
              <div className="text-center">
                <Truck className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                <p className="text-xs text-[#6B7280] font-medium">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                <p className="text-xs text-[#6B7280] font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <ShoppingCart className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                <p className="text-xs text-[#6B7280] font-medium">Fresh Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
