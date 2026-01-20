import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Minus, Plus, Package, Truck, Shield } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    name: "Organic Avocados",
    category: "Fresh Produce",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    unit: "per pack (4 pieces)",
    description: "Premium quality organic avocados, hand-picked at peak ripeness. Rich in healthy fats and nutrients, perfect for salads, toast, or guacamole.",
    benefits: [
      "100% Organic & Non-GMO",
      "Rich in healthy monounsaturated fats",
      "High in fiber and potassium",
      "Locally sourced from certified farms"
    ],
    images: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80"
    ],
    nutritionInfo: {
      calories: "160 per serving",
      protein: "2g",
      carbs: "9g",
      fat: "15g"
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} pack(s) of ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Navigation Bar */}
      <nav className="bg-[#059669] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8" />
              <span className="text-xl font-bold">FreshMart</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="hover:text-gray-200 transition">Home</button>
              <button className="hover:text-gray-200 transition">Products</button>
              <button className="hover:text-gray-200 transition">About</button>
              <button className="relative hover:text-gray-200 transition">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
            <span className="hover:text-[#059669] cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-[#059669] cursor-pointer">Fresh Produce</span>
            <span>/</span>
            <span className="text-[#1F2937] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-[#EF4444] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  <Heart
                    className={`w-6 h-6 ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#6B7280]'}`}
                  />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-[#059669]' : 'border-gray-200 hover:border-[#059669]'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-[#059669] text-sm font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-[#1F2937] mb-3">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#F97316] text-[#F97316]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#6B7280] text-sm">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-[#059669]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-[#6B7280] line-through">${product.originalPrice}</span>
                  )}
                </div>
                <p className="text-[#6B7280] text-sm mb-4">{product.unit}</p>

                {/* Stock Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-[#1F2937] mb-2">About this product</h2>
                <p className="text-[#6B7280] leading-relaxed">{product.description}</p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-[#6B7280]">
                      <span className="text-[#059669] mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-5 h-5 text-[#6B7280]" />
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold text-[#1F2937]">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-5 h-5 text-[#6B7280]" />
                    </button>
                  </div>
                  <span className="text-[#6B7280]">
                    Total: <span className="font-semibold text-[#059669]">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-4 rounded-lg transition flex items-center justify-center space-x-2 shadow-md"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="w-full bg-white border-2 border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white font-semibold py-4 rounded-lg transition">
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                  <p className="text-xs text-[#6B7280] font-medium">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                  <p className="text-xs text-[#6B7280] font-medium">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Package className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                  <p className="text-xs text-[#6B7280] font-medium">Fresh Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Information */}
        <div className="bg-white rounded-lg shadow-sm mt-6 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(product.nutritionInfo).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-[#F3F4F6] rounded-lg">
                <p className="text-sm text-[#6B7280] capitalize mb-1">{key}</p>
                <p className="text-xl font-bold text-[#1F2937]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
