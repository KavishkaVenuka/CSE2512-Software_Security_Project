import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Minus, Plus, Package, Truck, Shield, Check, Leaf, Award, Clock } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    name: "Organic Avocados",
    category: "Fresh Produce",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 47,
    unit: "per pack (4 pieces)",
    description: "Premium quality organic avocados, hand-picked at peak ripeness. Rich in healthy fats and nutrients, perfect for salads, toast, or guacamole. Our avocados are sourced from certified organic farms that use sustainable farming practices.",
    benefits: [
      "100% Organic & Non-GMO Certified",
      "Rich in healthy monounsaturated fats",
      "High in fiber, potassium, and vitamins",
      "Locally sourced from certified farms",
      "Perfect ripeness guaranteed",
      "Sustainably farmed with eco-friendly practices"
    ],
    images: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=800&q=80"
    ],
    nutritionInfo: [
      { label: "Calories", value: "160", unit: "per serving" },
      { label: "Protein", value: "2g", unit: "per serving" },
      { label: "Carbs", value: "9g", unit: "per serving" },
      { label: "Healthy Fats", value: "15g", unit: "per serving" }
    ],
    features: [
      { icon: Leaf, title: "100% Organic", description: "Certified organic produce" },
      { icon: Award, title: "Premium Quality", description: "Hand-picked selection" },
      { icon: Clock, title: "Fresh Daily", description: "Delivered within 24 hours" }
    ]
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} pack(s) of ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-white">
      {/* Modern Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#059669] to-[#047857] p-2 rounded-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#059669] to-[#047857] bg-clip-text text-transparent">FreshMart</span>
            </div>
            <div className="flex items-center space-x-8">
              <button className="text-[#1F2937] hover:text-[#059669] transition font-medium">Home</button>
              <button className="text-[#1F2937] hover:text-[#059669] transition font-medium">Products</button>
              <button className="text-[#1F2937] hover:text-[#059669] transition font-medium">About</button>
              <button className="relative group">
                <div className="bg-[#F3F4F6] group-hover:bg-[#059669] p-2 rounded-lg transition">
                  <ShoppingCart className="w-6 h-6 text-[#1F2937] group-hover:text-white transition" />
                </div>
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb with modern styling */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-[#6B7280] hover:text-[#059669] cursor-pointer transition">Home</span>
            <span className="text-[#6B7280]">/</span>
            <span className="text-[#6B7280] hover:text-[#059669] cursor-pointer transition">Fresh Produce</span>
            <span className="text-[#6B7280]">/</span>
            <span className="text-[#059669] font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              {product.originalPrice && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 bg-white backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition duration-300"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#6B7280]'}`}
                />
              </button>
              
              {/* Quick Feature Badges */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <div className="bg-[#059669] bg-opacity-90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  Organic
                </div>
                <div className="bg-white bg-opacity-90 backdrop-blur-sm text-[#059669] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Fresh Daily
                </div>
              </div>
            </div>

            {/* Modern Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden transition duration-300 ${
                    selectedImage === idx 
                      ? 'ring-4 ring-[#059669] shadow-lg scale-105' 
                      : 'ring-2 ring-gray-200 hover:ring-[#059669] hover:shadow-md'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Product Info */}
          <div className="space-y-6">
            {/* Header Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#059669] bg-opacity-10 text-[#059669] text-sm font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  {product.inStock ? `${product.stockCount} In Stock` : 'Out of Stock'}
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-[#1F2937] mb-4">{product.name}</h1>
              
              {/* Enhanced Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
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
                <span className="text-[#1F2937] font-semibold">{product.rating}</span>
                <span className="text-[#6B7280]">({product.reviewCount} reviews)</span>
              </div>

              {/* Modern Price Display */}
              <div className="bg-gradient-to-br from-[#059669] to-[#047857] rounded-2xl p-6 mb-6">
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-white text-opacity-90 text-sm mb-1">Special Price</p>
                    <span className="text-5xl font-bold text-white">${product.price}</span>
                  </div>
                  {product.originalPrice && (
                    <div className="mb-2">
                      <span className="text-2xl text-white text-opacity-70 line-through">${product.originalPrice}</span>
                    </div>
                  )}
                </div>
                <p className="text-white text-opacity-80 text-sm mt-2">{product.unit}</p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-3">
              {product.features.map((feature, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center hover:border-[#059669] hover:shadow-md transition">
                  <feature.icon className="w-8 h-8 text-[#059669] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#1F2937] mb-1">{feature.title}</p>
                  <p className="text-xs text-[#6B7280]">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Quantity Selector - Enhanced */}
            <div className="bg-[#F3F4F6] rounded-xl p-6">
              <label className="block text-sm font-bold text-[#1F2937] mb-3">Select Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 hover:bg-[#F3F4F6] transition rounded-l-xl"
                  >
                    <Minus className="w-5 h-5 text-[#6B7280]" />
                  </button>
                  <span className="px-8 py-4 text-xl font-bold text-[#1F2937] min-w-[80px] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 hover:bg-[#F3F4F6] transition rounded-r-xl"
                  >
                    <Plus className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>
                <div className="flex-1 bg-white rounded-xl px-4 py-4 border-2 border-gray-200">
                  <p className="text-sm text-[#6B7280]">Total Price</p>
                  <p className="text-2xl font-bold text-[#059669]">${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Modern Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="col-span-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#F97316] text-white font-bold py-5 rounded-xl transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-lg">Add to Cart</span>
              </button>
              <button className="bg-white border-2 border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white font-bold py-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg">
                Buy Now
              </button>
              <button className="bg-[#F3F4F6] border-2 border-gray-200 text-[#1F2937] hover:border-[#059669] font-bold py-4 rounded-xl transition duration-300">
                Add to Wishlist
              </button>
            </div>

            {/* Trust Badges - Enhanced */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
              <div className="text-center group cursor-pointer">
                <div className="bg-[#059669] bg-opacity-10 group-hover:bg-opacity-20 p-4 rounded-xl mb-2 transition">
                  <Truck className="w-8 h-8 text-[#059669] mx-auto" />
                </div>
                <p className="text-xs font-bold text-[#1F2937]">Free Delivery</p>
                <p className="text-xs text-[#6B7280]">On orders over $50</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-[#059669] bg-opacity-10 group-hover:bg-opacity-20 p-4 rounded-xl mb-2 transition">
                  <Shield className="w-8 h-8 text-[#059669] mx-auto" />
                </div>
                <p className="text-xs font-bold text-[#1F2937]">Secure Payment</p>
                <p className="text-xs text-[#6B7280]">100% protected</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-[#059669] bg-opacity-10 group-hover:bg-opacity-20 p-4 rounded-xl mb-2 transition">
                  <Package className="w-8 h-8 text-[#059669] mx-auto" />
                </div>
                <p className="text-xs font-bold text-[#1F2937]">Fresh Guarantee</p>
                <p className="text-xs text-[#6B7280]">Quality assured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'description'
                    ? 'text-[#059669] border-b-4 border-[#059669] bg-[#059669] bg-opacity-5'
                    : 'text-[#6B7280] hover:text-[#059669]'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'benefits'
                    ? 'text-[#059669] border-b-4 border-[#059669] bg-[#059669] bg-opacity-5'
                    : 'text-[#6B7280] hover:text-[#059669]'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex-1 py-4 px-6 font-bold transition ${
                  activeTab === 'nutrition'
                    ? 'text-[#059669] border-b-4 border-[#059669] bg-[#059669] bg-opacity-5'
                    : 'text-[#6B7280] hover:text-[#059669]'
                }`}
              >
                Nutrition Facts
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-4">About this product</h3>
                  <p className="text-[#6B7280] leading-relaxed text-lg">{product.description}</p>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#F3F4F6] p-4 rounded-xl hover:bg-[#059669] hover:bg-opacity-10 transition group">
                        <div className="bg-[#059669] text-white rounded-full p-1 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-[#1F2937] font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Nutrition Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {product.nutritionInfo.map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-[#F3F4F6] to-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-[#059669] hover:shadow-lg transition">
                        <p className="text-sm text-[#6B7280] mb-2">{item.label}</p>
                        <p className="text-3xl font-bold text-[#059669] mb-1">{item.value}</p>
                        <p className="text-xs text-[#6B7280]">{item.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
