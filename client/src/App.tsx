import { useState } from 'react';
import Login from './pages/Login';
import ShoppingCartPage from './pages/shoppingCart/shopingCart';
import UserProfilePage from './pages/userProfile/userProfile';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'cart' | 'profile'>('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login': return <Login />;
      case 'cart': return <ShoppingCartPage />;
      case 'profile': return <UserProfilePage />;
      default: return <Login />;
    }
  };

  return (
    <div className="app-container">
      {/* Temporary Navigation for Demo */}
      <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex gap-6 justify-center">
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-4 py-2 rounded-md transition-colors ${currentPage === 'login' ? 'bg-emerald-600 font-bold' : 'hover:bg-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('cart')}
            className={`px-4 py-2 rounded-md transition-colors ${currentPage === 'cart' ? 'bg-emerald-600 font-bold' : 'hover:bg-gray-700'}`}
          >
            Shopping Cart
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className={`px-4 py-2 rounded-md transition-colors ${currentPage === 'profile' ? 'bg-emerald-600 font-bold' : 'hover:bg-gray-700'}`}
          >
            User Profile
          </button>
        </div>
      </nav>

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
