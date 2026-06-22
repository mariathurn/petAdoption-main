import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from "./components/footer";
import { useCart } from "./context/CartContext";

export default function Layout() {
  const { toastMessage } = useCart(); 

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
