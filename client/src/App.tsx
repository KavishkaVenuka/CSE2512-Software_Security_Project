import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import useUserSync from './hooks/useUserSync';
import ShoppingCartPage from './pages/shoppingCart/shopingCart';
import UserProfilePage from './pages/userProfile/userProfile';
import ProductListingPage from './pages/productListing/productListing';
import Header from './components/Header';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ component }: { component: React.ComponentType }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div className="flex justify-center items-center h-screen">Loading...</div>,
  });
  return <Component />;
};

function App() {
  const { isLoading } = useAuth0();
  useUserSync();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-emerald-600">Loading Choce Moments...</div>;
  }

  return (
    <div className="app-container min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header handles its own navigation via Links now (to be updated) */}
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/cart" element={<ProtectedRoute component={ShoppingCartPage} />} />
          <Route path="/profile" element={<ProtectedRoute component={UserProfilePage} />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
