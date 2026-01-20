import React, { useState } from 'react';
import { Package, CreditCard, MapPin, Truck, Tag, ShoppingCart, ArrowLeft, Lock, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Organic Avocados",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&q=80",
      price: 4.99,
      quantity: 2,
      unit: "pack"
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80",
      price: 5.99,
      quantity: 1,
      unit: "box"
    },
    {
      id: 3,
      name: "Organic Spinach",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&q=80",
      price: 3.49,
      quantity: 3,
      unit: "bunch"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("standard");

  const deliveryFees = {
    standard: 0,
    express: 9.99
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryFees[deliveryOption as keyof typeof deliveryFees];
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "FRESH10") {
      setDiscount(subtotal * 0.1);
      alert("Promo code applied! 10% discount");
    } else if (promoCode) {
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    alert("Order placed successfully! Thank you for shopping with FreshMart.");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Navigation Bar */}
      <nav className="bg-[#059669] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8" />
              <span className="text-xl font-bold">FreshMart</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-200 transition">Home</button>
              <button className="hover:text-gray-200 transition">Products</button>
              <button className="relative hover:text-gray-200 transition">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center space-x-2 text-[#059669] hover:text-[#047857] font-medium mb-4 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-[#1F2937]">Checkout</h1>
          <p className="text-[#6B7280] mt-2">Complete your order in just a few steps</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#059669] text-white rounded-full p-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#1F2937]">Delivery Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#059669] text-white rounded-full p-2">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#1F2937]">Delivery Method</h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                  deliveryOption === "standard" ? "border-[#059669] bg-green-50" : "border-gray-200 hover:border-[#059669]"
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === "standard"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="w-5 h-5 text-[#059669]"
                    />
                    <div>
                      <p className="font-semibold text-[#1F2937]">Standard Delivery</p>
                      <p className="text-sm text-[#6B7280]">3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#059669]">FREE</span>
                </label>

                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                  deliveryOption === "express" ? "border-[#059669] bg-green-50" : "border-gray-200 hover:border-[#059669]"
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === "express"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="w-5 h-5 text-[#059669]"
                    />
                    <div>
                      <p className="font-semibold text-[#1F2937]">Express Delivery</p>
                      <p className="text-sm text-[#6B7280]">Next day delivery</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#1F2937]">$9.99</span>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#059669] text-white rounded-full p-2">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#1F2937]">Payment Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-[#6B7280] bg-[#F3F4F6] p-3 rounded-lg">
                  <Lock className="w-4 h-4 text-[#059669]" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#1F2937] mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start space-x-3 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1F2937] text-sm">{item.name}</h3>
                      <p className="text-xs text-[#6B7280]">{item.unit}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-[#6B7280] hover:border-[#059669] hover:text-[#059669] transition"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-[#1F2937]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-[#6B7280] hover:border-[#059669] hover:text-[#059669] transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#059669] text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#EF4444] hover:text-[#DC2626] transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#059669] focus:outline-none transition text-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-1"
                  >
                    <Tag className="w-4 h-4" />
                    <span>Apply</span>
                  </button>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">Try code: FRESH10 for 10% off</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[#1F2937] pt-3 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-4 rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Place Order - ${total.toFixed(2)}</span>
              </button>

              <p className="text-xs text-center text-[#6B7280] mt-4">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
