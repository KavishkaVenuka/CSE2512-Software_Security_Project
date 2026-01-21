import React, { useState } from 'react';
import { User, Package, MapPin, Phone, Mail, Camera, Save } from 'lucide-react';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
}

interface Order {
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';
    total: number;
}

// Mock Data
const MOCK_USER: UserProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Market Street, San Francisco, CA 94103',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
};

const RECENT_ORDERS: Order[] = [
    { id: '#ORD-7782', date: 'Oct 24, 2023', status: 'Delivered', total: 45.90 },
    { id: '#ORD-7781', date: 'Oct 15, 2023', status: 'Shipped', total: 128.50 },
    { id: '#ORD-7780', date: 'Sep 28, 2023', status: 'Processing', total: 32.00 },
];

const UserProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>(MOCK_USER);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // Logic to save to backend would go here
        console.log('Saved profile:', profile);
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Shipped': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Profile Card & Menu */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface p-6 rounded-lg shadow-sm text-center">
                        <div className="relative inline-block mb-4">
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-emerald-700 transition-colors shadow-sm">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-gray-500">Member since 2021</p>
                    </div>

                    <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
                        <nav className="flex flex-col">
                            <a href="#" className="flex items-center gap-3 px-6 py-4 bg-emerald-50 text-primary font-medium border-l-4 border-primary transition-colors">
                                <User className="w-5 h-5" />
                                My Profile
                            </a>
                            <a href="#" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                                <Package className="w-5 h-5" />
                                Orders
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Right Column: Edit Form & Recent Orders */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Profile Form */}
                    <div className="bg-surface p-6 md:p-8 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Personal Information</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm text-secondary font-semibold hover:text-orange-700 transition-colors"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-400" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" /> Delivery Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                />
                            </div>

                            {isEditing && (
                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium border border-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-secondary text-white shadow-md hover:bg-orange-600 hover:shadow-lg transition-all font-bold flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-surface p-6 md:p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-primary mb-6">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-4 font-semibold text-gray-600">Order ID</th>
                                        <th className="pb-4 font-semibold text-gray-600">Date</th>
                                        <th className="pb-4 font-semibold text-gray-600">Total</th>
                                        <th className="pb-4 font-semibold text-gray-600">Status</th>
                                        <th className="pb-4 font-semibold text-gray-600 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {RECENT_ORDERS.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 font-medium text-gray-900">{order.id}</td>
                                            <td className="py-4 text-gray-500">{order.date}</td>
                                            <td className="py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="text-primary hover:text-emerald-700 font-medium text-sm transition-colors">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
