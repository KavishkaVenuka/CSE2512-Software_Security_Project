import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const location = useLocation();

    // Helper to check active state
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 gap-4">

                    {/* Brand */}
                    <Link
                        to="/"
                        className="flex-shrink-0 flex items-center cursor-pointer"
                    >
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Japura<span className="text-orange-600">MART</span>
                        </h1>
                    </Link>

                    {/* Navigation - Center/Right */}
                    <nav className="hidden md:flex gap-6 items-center">
                        <Link
                            to="/products"
                            className={`text-sm font-medium transition-colors ${isActive('/products') || isActive('/') ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'}`}
                        >
                            Products
                        </Link>
                        {/* Search Bar - Integrated in layout */}
                        <div className="relative group max-w-xs md:w-64 lg:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm"
                                placeholder="Search..."
                            />
                        </div>
                    </nav>


                    {/* Action Icons & Mobile Menu */}
                    <div className="flex items-center space-x-4">

                        {!isAuthenticated ? (
                            <button
                                onClick={() => loginWithRedirect()}
                                className="hidden sm:block px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Login
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 hidden lg:block">Hello, {user?.given_name || user?.name}</span>
                                <button
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                                    title="Log Out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        )}

                        <Link
                            to="/profile"
                            className={`text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 ${isActive('/profile') ? 'text-emerald-600 bg-emerald-50' : ''}`}
                        >
                            <span className="sr-only">User Account</span>
                            {isAuthenticated && user?.picture ? (
                                <img src={user.picture} alt={user.name} className="h-6 w-6 rounded-full" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className={`relative text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 group ${isActive('/cart') ? 'text-emerald-600 bg-emerald-50' : ''}`}
                        >
                            <span className="sr-only">Shopping Bag</span>
                            <ShoppingBag className="h-5 w-5" />
                            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white transform scale-0 group-hover:scale-100 transition-transform duration-200"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
